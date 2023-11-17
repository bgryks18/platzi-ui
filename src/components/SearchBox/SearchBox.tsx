import FilterInput from '../FilterInput/FilterInput'
import { useMatch } from 'react-router-dom'

const SearchBox = () => {
  const isMatchWithProducts = useMatch('/products')
  return isMatchWithProducts ? (
    <FilterInput
      name="title"
      className="text-slate-blackA6 box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] border-gray-400 px-[10px] text-[14px] leading-none shadow-blackA6 outline-none"
      placeholder="Search Products"
      resource="products"
    />
  ) : (
    <></>
  )
}

export default SearchBox
