import React from 'react'
import { useDispatch } from 'react-redux'
import { updateItem } from '../../api/service'
import FormDialog from '../FormDialog/FormDialog'
import { setItem } from '../../store/list'

const EditButton = ({
  row,
  resource,
  fields,
  transform,
}: {
  row: Record<string, any>
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
  const { mutateAsync: mutateUpdateItem, isLoading: isUpdateLoading } =
    updateItem(resource)

  return (
    <div>
      <FormDialog
        label="Edit"
        title="Edit"
        isLoading={isUpdateLoading}
        fields={fields}
        record={row}
        onSave={async (data: Record<string, any>, handleCloseDialog) => {
          const dataToSent = transform ? transform(data) : data
          try {
            const updatedData: any = await mutateUpdateItem({
              id: row.id,
              ...dataToSent,
            })
            dispatch(setItem({ data: updatedData }))
            handleCloseDialog()
          } catch (e) {
            console.log('e', e)
          }
        }}
      />
    </div>
  )
}

export default EditButton
