import DataTable from 'components/Table/Table'
import { ColumnDef } from '@tanstack/react-table'
import useList from 'hooks/useList'
import EditButton from 'components/EditButton/EditButton'
import { CategoryEntity } from '@/types/entity'

const columns: ColumnDef<CategoryEntity>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
        </button>
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell(props) {
      return (
        <div className="max-w-[300px] break-words ">
          {props.cell.row.original.name}
        </div>
      )
    },
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell(props) {
      return (
        <div className="mr-auto max-w-[100px] break-words ">
          <img
            src={props.cell.row.original.image}
            className="aspect-video h-[75px] object-contain"
          />
        </div>
      )
    },
  },
  {
    accessorKey: '',
    header: 'Actions',
    cell(props) {
      return (
        <div className="mr-auto flex max-w-[100px] gap-2 break-words">
          <EditButton
            row={props.row.original}
            resource="categories"
            fields={[
              {
                id: 'name',
                label: 'Name',
              },
            ]}
          />
        </div>
      )
    },
  },
]

const Products = () => {
  const { data, isLoading } = useList({
    moduleName: 'categories',
  })

  return (
    <div className="container mt-3">
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  )
}

export default Products
