import { ReactElement, useEffect, useState } from 'react'

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
import { useDispatch, useSelector } from 'react-redux'
import { setPagination } from '../../store/list'
import { Skeleton } from '../Skeleton/Skeleton'
import { RootState } from '../../store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select/Select'

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
  isLoading?: boolean
  type?: 'server' | 'client'
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
  noResultMessage = 'No result found.',
  columnFilters,
  type = 'server',
}: DataTableProps<TData, TValue>) {
  const dispatch = useDispatch()
  const paginationState = useSelector((state: RootState) => ({
    pageIndex: state.list.pageIndex,
    pageSize: state.list.limit,
    count: state.list.count,
  }))

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
        if (type === 'server') {
          const newState = updater(paginationState)

          dispatch(
            setPagination({
              limit: newState.pageSize,
              pageIndex: newState.pageIndex,
            })
          )
        } else {
          const newState = updater(page)
          setPage(newState)
        }
      }
    },
    autoResetPageIndex: false,
    manualPagination: true,
    pageCount:
      type === 'server'
        ? Math.ceil(paginationState.count / paginationState.pageSize)
        : Math.ceil(data.length / page.pageSize),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setFilters,
    state: {
      sorting,
      pagination: type === 'server' ? paginationState : page,
      columnFilters: filters,
    },
  })
  const limit = type === 'server' ? paginationState.pageSize : page.pageSize

  return (
    <div className="rounded-md border">
      {renderFilterInputs && (
        <div className="flex items-end justify-end gap-2 p-4">
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
          {isLoading ? (
            <SkeletonList columns={table.getAllColumns()} limit={limit} />
          ) : table.getRowModel().rows ? (
            table.getRowModel().rows.length > 0 ? (
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
            )
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
        <div className="w-[100px]">
          <Select
            onValueChange={(value) => {
              if (type === 'server') {
                table.setPagination({ pageIndex: 0, pageSize: Number(value) })
              } else {
                table.setPagination({
                  pageIndex: page.pageIndex,
                  pageSize: Number(value),
                })
              }
            }}
            defaultValue={`${limit}`}
          >
            <SelectTrigger>
              <SelectValue placeholder={`${limit}}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'10'}>10</SelectItem>
              <SelectItem value={'5'}>5</SelectItem>
            </SelectContent>
          </Select>
        </div>
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

const SkeletonList = ({
  columns,
  limit,
}: {
  columns: ColumnDef<any>[]
  limit: number
}) => {
  const modifiedColumns = columns.map((column) => column.header)

  return Array(limit)
    .fill(null)
    .map((item, index) => {
      return (
        <TableRow key={index}>
          {modifiedColumns.map((item, index) => {
            return (
              <TableCell key={index}>
                <Skeleton className="h-3 w-[250px] bg-gray-300" />
              </TableCell>
            )
          })}
        </TableRow>
      )
    })
}
