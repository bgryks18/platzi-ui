import { useDispatch } from 'react-redux'
import { createItem } from '../../api/service'
import FormDialog from '../FormDialog/FormDialog'
import { addItem } from '@/store/list'
import { setToast } from '@/store/ui'

const CreateButton = ({
  resource,
  fields,
  transform,
}: {
  resource: string
  fields: {
    id: string | number
    label: string
    type?: 'text' | 'textarea' | 'select' | 'fieldarray'
    choices?: { value: string; label: string }[]
  }[]
  transform?: (data: Record<string, any>) => Record<string, any>
}) => {
  const dispatch = useDispatch()
  const { mutateAsync: mutateCreateItem, isLoading: isCreateLoading } =
    createItem(resource)
  return (
    <div>
      <FormDialog
        label="Create"
        title="Create"
        isLoading={isCreateLoading}
        fields={fields}
        onSave={async (data: Record<string, any>, handleCloseDialog) => {
          const dataToSent = transform ? transform(data) : data
          try {
            const newData: any = await mutateCreateItem({
              ...dataToSent,
            })
            dispatch(addItem({ data: newData }))
            handleCloseDialog()
            dispatch(
              setToast({
                toast: {
                  label: 'Success',
                  description: 'Data was created',
                },
              })
            )
          } catch (e: any) {
            const error = e?.response?.data?.message
            const title = e?.message
            const errMessage = Array.isArray(error) ? error.join(', ') : error
            dispatch(
              setToast({
                toast: {
                  label: title,
                  description: errMessage,
                },
              })
            )
            console.log('e', e)
          }
        }}
      />
    </div>
  )
}

export default CreateButton
