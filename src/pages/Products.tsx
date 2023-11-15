import React, { useEffect, useState } from 'react'
import DataTable from '../components/Table/Table'
import { ColumnDef } from '@tanstack/react-table'
import { getProducts } from '../api/product'

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <button
          // variant={column.getIsSorted() ? 'default' : 'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </button>
      )
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },

  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <button
          // variant={column.getIsSorted() ? 'default' : 'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </button>
      )
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'category',
    header: 'Category',
    accessorFn(row, i) {
      return row.category.name
    },
  },
]

const Products = () => {
  const [list, setList] = useState<any>([])

  const fetchProducts = async ({
    limit,
    offset,
  }: {
    limit: number
    offset: number
  }) => {
    console.log('hey')
    const { data } = await getProducts({ limit, offset })
    setList((prev: any[]) => [...prev, ...data])
  }
  useEffect(() => {
    fetchProducts({ limit: 10, offset: 0 })
  }, [])
  return (
    <div>
      <DataTable columns={columns} data={list} refetch={fetchProducts} />
    </div>
  )
}

export default Products
