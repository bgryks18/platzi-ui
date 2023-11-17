import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import clsx from 'clsx'
import * as Menubar from '@radix-ui/react-menubar'
import SearchBox from '../SearchBox/SearchBox'

const Header = () => {
  return (
    <Menubar.Root className="container sticky top-0 flex min-h-[50px] flex-wrap justify-between gap-2 rounded-md bg-white p-[8px] px-[24px] shadow-[0_2px_10px] shadow-blackA4">
      <div className="flex gap-2">
        <MenuLinkItem label="Home" to="/" />
        <MenuLinkItem label="Products" to="/products" />
        <MenuLinkItem label="Categories" to="/categories" />
        <MenuLinkItem label="Users" to="/users" />
      </div>
      <div className="w-[300px] md:w-[100%]">
        <RightElement />
      </div>
    </Menubar.Root>
  )
}

export default Header

interface MenuBarLinkItemProps {
  to: string
  label: string
}
const MenuLinkItem = ({ to, label }: MenuBarLinkItemProps) => {
  const isActive = Boolean(useMatch(to))

  return (
    <Menubar.Menu>
      <Menubar.Trigger
        className={clsx(
          'flex select-none items-center justify-between gap-[2px] rounded px-3 py-2 text-[13px] font-medium leading-none text-violet11 outline-none hover:bg-violet4 [&.active]:bg-violet11 [&.active]:text-white',
          { active: isActive }
        )}
        asChild
      >
        <Link to={to}>{label}</Link>
      </Menubar.Trigger>
    </Menubar.Menu>
  )
}

const RightElement = () => {
  return <SearchBox />
}
