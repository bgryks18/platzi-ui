import { useState } from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Button } from '../Button/Button'

interface AlertProps {
  label: string
  title: string
  description?: string
  onApprove?: () => Promise<any>
  approveBtnText?: string
  isApproveLoading?: boolean
}
const Alert = ({
  label,
  title,
  description,
  onApprove,
  approveBtnText = 'Yes',
  isApproveLoading,
}: AlertProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={(val) => {
        if (val) setIsOpen(true)
      }}
    >
      <AlertDialog.Trigger asChild>
        <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black">
          {label}
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-blackA6" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="m-0 text-[17px] font-medium text-mauve12">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-5 mt-4 text-[15px] leading-normal text-mauve11">
            {description}
          </AlertDialog.Description>
          <div className="flex justify-end gap-3">
            {onApprove ? (
              <>
                <AlertDialog.Cancel
                  asChild
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  <Button className="w-[80px] bg-white px-[15px] font-medium leading-none !text-violet11  outline-none hover:bg-mauve3 ">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action
                  asChild
                  onClick={() => {
                    if (onApprove) {
                      onApprove().then(() => {
                        setIsOpen((prev) => !prev)
                      })
                    }
                  }}
                >
                  <Button loading={isApproveLoading} className="w-[80px] px-4">
                    {approveBtnText}
                  </Button>
                </AlertDialog.Action>
              </>
            ) : (
              <AlertDialog.Cancel
                asChild
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                <Button className="w-[80px] bg-white px-[15px] font-medium leading-none !text-violet11  outline-none hover:bg-mauve3 ">
                  Ok
                </Button>
              </AlertDialog.Cancel>
            )}
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default Alert
