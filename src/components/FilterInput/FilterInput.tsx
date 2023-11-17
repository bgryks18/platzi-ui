import { Input, InputProps } from '../Input/Input'
import { debounce } from 'lodash'
import { removeFilter, setFilter } from '../../store/list'
import { useDispatch } from 'react-redux'

const FilterInput = (props: InputProps & { resource: string }) => {
  const dispatch = useDispatch()
  const handleFilterInputChange = debounce((params) => {
    dispatch(setFilter({ filter: params, resource: props.resource }))
  }, 200)

  const handleFilterInputReset = debounce(() => {
    dispatch(removeFilter({ name: props.name || '', resource: props.resource }))
  }, 200)

  return (
    <Input
      onChange={(e) => {
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
