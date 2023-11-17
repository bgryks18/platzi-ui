import * as Toast from '@radix-ui/react-toast'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setToast } from '@/store/ui'

const ToastComp = () => {
  const toast = useSelector((state: RootState) => state.ui.toast)
  const dispatch = useDispatch()
  const isOpen = Boolean(toast)

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(setToast({ toast: undefined }))
    }
  }
  return (
    <div>
      <Toast.Provider swipeDirection="down" duration={15 * 1000}>
        <Toast.Root
          className="data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md border bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
          open={isOpen}
          onOpenChange={handleOnOpenChange}
        >
          <Toast.Title className="text-slate12 mb-[5px] text-[15px] font-medium [grid-area:_title]">
            {toast?.label}
          </Toast.Title>
          <Toast.Description asChild>
            <span className="text-slate11 m-0 text-[13px] leading-[1.3] [grid-area:_description]">
              {toast?.description}
            </span>
          </Toast.Description>
          <Toast.Action
            className="[grid-area:_action]"
            asChild
            altText="Goto schedule to undo"
          >
            <button className="bg-green2 text-green11 shadow-green7 hover:shadow-green8 focus:shadow-green8 inline-flex h-[25px] items-center justify-center rounded px-[10px] text-xs font-medium leading-[25px] shadow-[inset_0_0_0_1px] hover:shadow-[inset_0_0_0_1px] focus:shadow-[0_0_0_2px]">
              Close
            </button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
      </Toast.Provider>
    </div>
  )
}

export default ToastComp
