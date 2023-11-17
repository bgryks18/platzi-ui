import React from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { Input } from 'components/Input/Input'
import { Button } from '../Button/Button'
import { Plus, X } from 'lucide-react'

const FieldArray = ({
  name,
  placeholder,
}: {
  name: string
  placeholder?: string
}) => {
  const { control, register } = useFormContext()
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name, // unique name for your Field Array
    }
  )

  return (
    <div className="flex flex-col flex-wrap gap-2 ">
      <Button
        onClick={() => {
          append({})
        }}
        type="button"
      >
        <Plus />
        Add
      </Button>

      {fields.map((item, index) => {
        console.log('item', item)
        return (
          <div key={item.id} className="flex items-center">
            <Input
              placeholder={placeholder ? `${placeholder} ${index + 1}` : ''}
              {...register(`${name}[${index}].value`)}
            />
            <span
              onClick={() => remove(index)}
              className="hover:text-red10 cursor-pointer"
            >
              <X />
            </span>
          </div>
        )
      })}
    </div>
  )
}
export default FieldArray
