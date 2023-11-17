import DataTable from '../components/Table/Table'
import { ColumnDef } from '@tanstack/react-table'
import useList from '../hooks/useList'

const columns: ColumnDef<any>[] = [
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
    accessorKey: 'email',
    header: 'Email',
    cell(props) {
      return (
        <div className="max-w-[300px] break-words ">
          {props.cell.row.original.email}
        </div>
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
    accessorKey: 'avatar',
    header: 'Avatar',
    cell(props) {
      return (
        <div className="mr-auto max-w-[100px] break-words ">
          <img
            src={props.cell.row.original.avatar}
            className="aspect-video h-[75px] object-contain"
          />
        </div>
      )
    },
  },
]

const Users = () => {
  const { data, isLoading } = useList({
    moduleName: 'users',
  })

  return (
    <div className="container mt-3">
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  )
}

export default Users
