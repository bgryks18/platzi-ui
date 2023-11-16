import React from 'react'
import { Input, InputProps } from '../Input/Input'
import { debounce } from 'lodash'
import { removeFilter, setFilter } from '../../store/list'
import { useDispatch } from 'react-redux'

const FilterInput = (props: InputProps) => {
  const dispatch = useDispatch()
  const handleFilterInputChange = debounce((params) => {
    console.log('----', params)
    dispatch(setFilter({ filter: params }))
  }, 200)

  const handleFilterInputReset = debounce(() => {
    dispatch(removeFilter(props.name || ''))
  }, 200)

  return (
    <Input
      onChange={(e) => {
        console.log('hey')
        if (!e.target.value.trim()) {
          handleFilterInputReset()
        } else {
          handleFilterInputChange({ [String(props.name)]: e.target.value })
        }
      }}
      {...props}
    />
  )
}

export default FilterInput
