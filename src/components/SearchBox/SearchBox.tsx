import React from 'react'
import FilterInput from '../FilterInput/FilterInput'

const SearchBox = () => {
  return (
    <FilterInput
      name="title"
      className="text-slate-blackA6 box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] border-gray-400 px-[10px] text-[14px] leading-none shadow-blackA6 outline-none"
      placeholder="Search Products"
    />
  )
}

export default SearchBox
