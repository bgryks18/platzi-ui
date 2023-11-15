import { ReactElement, useMemo, useState } from 'react'

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationOptions,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Table as TableType } from '@tanstack/table-core'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './TableBase'
import { Button } from '../Button/Button'
import API from '../../api/api'
import { getProducts } from '../../api/product'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  paginationOptions?: Omit<
    PaginationOptions & { initialSync?: boolean },
    'onPaginationChange'
  >
  pagination?: PaginationState
  columnFilters?: ColumnFiltersState
  renderFilterInputs?: (table: TableType<TData>) => ReactElement
  noResultMessage?: string | ReactElement
  loadingMessage?: string | ReactElement
  isLoading?: boolean
  refetch: ({
    limit,
    offset,
  }: {
    limit: number
    offset: number
  }) => Promise<TData>
}

function DataTable<TData, TValue>({
  columns,
  data = [],
  pagination = {
    pageIndex: 0,
    pageSize: 10,
  },
  renderFilterInputs,
  isLoading,
  loadingMessage = 'Loading...',
  noResultMessage = isLoading ? loadingMessage : 'No result found.',
  columnFilters,
  refetch,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<PaginationState>({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  })

  const [filters, setFilters] = useState<ColumnFiltersState>(
    columnFilters || []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: async (updater) => {
      if (typeof updater === 'function') {
        const newState = updater(page)
        await refetch({ limit: newState.pageSize, offset: newState.pageIndex })
        setPage(newState)
      }
    },
    autoResetPageIndex: false,
    pageCount: Math.ceil(66 / page.pageSize),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setFilters,
    state: {
      sorting,
      pagination: page,
      columnFilters: filters,
    },
  })

  return (
    <div className="rounded-md border">
      {renderFilterInputs && (
        <div className="flex items-center justify-between p-4">
          {renderFilterInputs(table)}
          {sorting.length !== 0 && (
            <Button
              onClick={(e) => {
                e.preventDefault()
                setSorting([])
              }}
            >
              Sıralamayı İptal Et
            </Button>
          )}
        </div>
      )}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="h-24 text-center"
              >
                {noResultMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 p-4">
        <div className="flex items-center justify-start space-x-2 p-4">
          {table.getPageCount() ? table.getState().pagination.pageIndex + 1 : 0}{' '}
          / {table.getPageCount()}
        </div>
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default DataTable
