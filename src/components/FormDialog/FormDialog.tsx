import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Button } from '../Button/Button'
import * as Form from '@radix-ui/react-form'
import { Input, Textarea } from '../Input/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select/Select'
import FieldArray from '../FieldArray/FieldArray'

interface AlertProps {
  label: string
  title: string
  description?: string
  onSave: (
    data: Record<string, any>,
    handleCloseModal: () => void
  ) => Promise<any>
  isLoading: boolean
  fields: {
    id: string | number
    label: string
    type?: string
    choices?: { value: string; label: string }[]
  }[]
  record?: Record<string, any>
}
const FormDialog = ({
  label,
  title,
  description,
  onSave,
  isLoading,
  fields,
  record,
}: AlertProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const form = useForm({
    values: record,
  })
  const { handleSubmit, register } = form

  const handleCloseDialog = () => {
    setIsOpen(false)
  }

  const onFormSave = (data: Record<string, any>) => {
    onSave(data, handleCloseDialog)
  }
  return (
    <FormProvider {...form}>
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
            <Form.Root
              className="w-100 flex flex-wrap items-center"
              onSubmit={handleSubmit(onFormSave)}
            >
              {fields.map((item) => {
                return (
                  <Form.Field
                    className="w-full"
                    name={`${item.id}`}
                    key={item.id}
                  >
                    <div className="flex items-baseline justify-between">
                      <Form.Label className="text-[15px] font-medium leading-[35px]">
                        {item.label}
                      </Form.Label>
                    </div>
                    <Form.Control asChild>
                      {item.type === 'textarea' ? (
                        <Textarea
                          className="h-[100px]"
                          {...register(`${item.id}`)}
                        />
                      ) : item.type === 'select' ? (
                        <Select
                          onValueChange={(value) => {
                            if (value === 'none') {
                              form.setValue(String(item.id), undefined)
                            } else {
                              form.setValue(String(item.id), value)
                            }
                          }}
                          defaultValue="none"
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={item.label} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Selected</SelectItem>
                            {item?.choices &&
                              item.choices.map((choiceItem) => (
                                <SelectItem
                                  key={choiceItem.value}
                                  value={choiceItem.value}
                                >
                                  {choiceItem.label}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      ) : item.type === 'fieldarray' ? (
                        <FieldArray name={String(item.id)} placeholder="Url" />
                      ) : (
                        <Input {...register(`${item.id}`)} />
                      )}
                    </Form.Control>
                  </Form.Field>
                )
              })}

              <div className="mt-3 flex w-full items-center justify-end gap-3">
                <Button
                  className="h-[40px] !w-[80px] bg-white px-[15px] font-medium leading-none  !text-violet11 outline-none hover:!bg-mauve3"
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  Cancel
                </Button>
                <Form.Submit className="flex w-full justify-end" asChild>
                  <Button className="h-[40px] !w-[80px]" loading={isLoading}>
                    Save
                  </Button>
                </Form.Submit>
              </div>
            </Form.Root>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </FormProvider>
  )
}

export default FormDialog
