import React from 'react'
import { useDispatch } from 'react-redux'
import { createItem } from '../../api/service'
import FormDialog from '../FormDialog/FormDialog'
import { addItem } from '@/store/list'

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
          } catch (e) {
            console.log('e', e)
          }
        }}
      />
    </div>
  )
}

export default CreateButton
