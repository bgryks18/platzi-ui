import DataTable from '../components/Table/Table'
import { ColumnDef } from '@tanstack/react-table'
import useList from '../hooks/useList'
import FilterInput from '../components/FilterInput/FilterInput'
import FilterSelectInput from '../components/FilterSelectInput/FilterSelectInput'
import { Input } from '../components/Input/Input'

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
    cell(props) {
      return (
        <div className="max-w-[300px] break-words ">
          {props.cell.row.original.title}
        </div>
      )
    },
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
    cell(props) {
      return (
        <div className="max-w-[500px] break-words ">
          {props.cell.row.original.description}
        </div>
      )
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell(props) {
      return (
        <div className="mr-auto max-w-[100px] break-words ">
          {props.cell.row.original.category?.name}
        </div>
      )
    },
  },
]

const Products = () => {
  const { data, isLoading } = useList({
    moduleName: 'products',
  })

  return (
    <div className="container mt-3">
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        // columnFilters={[{ id: 'title', value: 'Only' }]}
        renderFilterInputs={() => {
          return (
            <>
              <FilterInput
                name="price_min"
                placeholder="Min. Price"
                className="w-[250px]"
              />
              <FilterInput
                name="price_max"
                placeholder="Max. Price"
                className="w-[250px]"
              />
              <FilterSelectInput
                name="categoryId"
                placeholder="Filter By Category"
                choices={[
                  {
                    value: '2',
                    label: 'Electronics',
                  },
                  {
                    value: '3',
                    label: 'Furniture',
                  },
                ]}
                className="w-[250px]"
                label="Filter By Category"
              />
            </>
          )
        }}
      />
    </div>
  )
}

export default Products
