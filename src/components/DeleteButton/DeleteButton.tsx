import React from 'react'
import AlertButton from '../AlertDialog/AlertDialog'
import { useDispatch } from 'react-redux'
import { removeItem } from '../../store/list'
import { deleteItem } from '../../api/service'

const DeleteButton = ({
  row,
  resource,
}: {
  row: Record<string, any>
  resource: string
}) => {
  const dispatch = useDispatch()
  const { mutateAsync: mutateDeleteItem, isLoading: isDeleteLoading } =
    deleteItem(resource)
  return (
    <div>
      <AlertButton
        label="Delete"
        title="Are you sure"
        description="are you sure you want to delete"
        isApproveLoading={isDeleteLoading}
        onApprove={async () => {
          try {
            await mutateDeleteItem(row.id)
            dispatch(removeItem({ id: row.id }))
          } catch (e) {
            console.log('e', e)
          }
        }}
      />
    </div>
  )
}

export default DeleteButton
