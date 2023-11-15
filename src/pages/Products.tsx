import React from 'react'
import DataTable from '../components/Table/Table'
import { ColumnDef } from '@tanstack/react-table'

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
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
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
]

async function getData(): Promise<any[]> {
  return Array(40)
    .fill(null)
    .map((_, index) => ({
      id: index,
      amount: Math.round(Math.random() * 100),
      status:
        Math.ceil(Math.random() * 10) % 2 === 0 ? 'pending' : 'processing',
      email: 'm@example.com',
    }))
}

const data = await getData()

const Products = () => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        renderFilterInputs={(table) => {
          return <>SAD</>
        }}
      />
    </div>
  )
}

export default Products
