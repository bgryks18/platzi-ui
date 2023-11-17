import DataTable from 'components/Table/Table'
import { ColumnDef } from '@tanstack/react-table'
import useList from 'hooks/useList'
import FilterInput from 'components/FilterInput/FilterInput'
import FilterSelectInput from 'components/FilterSelectInput/FilterSelectInput'
import DeleteButton from 'components/DeleteButton/DeleteButton'
import EditButton from 'components/EditButton/EditButton'
import CreateButton from 'components/CreateButton/CreateButton'
import ToastComponent from '@/components/Toast/Toast'
import Toast from '@/components/Toast/Toast'

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
  {
    accessorKey: '',
    header: 'Actions',
    cell(props) {
      return (
        <div className="mr-auto flex max-w-[100px] gap-2 break-words">
          <DeleteButton row={props.row.original} resource="products" />
          <EditButton
            row={props.row.original}
            resource="products"
            fields={[
              { id: 'title', label: 'Title' },
              { id: 'description', label: 'Description', type: 'textarea' },
            ]}
          />
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
        renderFilterInputs={() => {
          return (
            <>
              <div className="mr-auto">
                <CreateButton
                  resource="products"
                  fields={[
                    { id: 'title', label: 'Title' },
                    {
                      id: 'description',
                      label: 'Description',
                      type: 'textarea',
                    },
                    { id: 'price', label: 'Price' },
                    {
                      id: 'categoryId',
                      label: 'Category',
                      type: 'select',
                      choices: [
                        {
                          value: '2',
                          label: 'Electronics',
                        },
                        {
                          value: '3',
                          label: 'Furniture',
                        },
                      ],
                    },
                    {
                      id: 'images',
                      label: 'Images',
                      type: 'fieldarray',
                    },
                  ]}
                  transform={(data) => {
                    const { images } = data
                    return {
                      ...data,
                      images: images?.map((item: any) => item.value),
                    }
                  }}
                />
              </div>
              <FilterInput
                name="price_min"
                placeholder="Min. Price"
                className="!w-[250px]"
                resource="products"
              />
              <FilterInput
                name="price_max"
                placeholder="Max. Price"
                className="!w-[250px]"
                resource="products"
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
                resource={'products'}
              />
            </>
          )
        }}
      />
    </div>
  )
}

export default Products
