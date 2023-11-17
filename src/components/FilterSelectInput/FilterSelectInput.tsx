import React from 'react'
import { useDispatch } from 'react-redux'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/Select/Select'
import { removeFilter, setFilter } from 'store/list'

interface FilterSelectInputProps {
  choices: { value: string; label: string }[]
  placeholder: string
  name: string
  className?: string
  label?: string
}

const FilterSelectInput = ({
  choices,
  placeholder,
  name,
  className,
  label,
  resource,
}: FilterSelectInputProps & { resource: string }) => {
  const dispatch = useDispatch()

  return (
    <div className={className}>
      {label && <div className="text-sm">{label}</div>}
      <Select
        onValueChange={(value) => {
          if (value == 'none') {
            dispatch(removeFilter({ name, resource }))
          } else {
            dispatch(setFilter({ filter: { [name]: value }, resource }))
          }
        }}
        defaultValue="none"
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No Selected</SelectItem>
          {choices.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default FilterSelectInput
