import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import clsx from 'clsx'
import * as Menubar from '@radix-ui/react-menubar'
import * as Form from '@radix-ui/react-form'

const Header = () => {
  return (
    <Menubar.Root className="container sticky top-0 z-10 flex flex-wrap justify-between gap-2 rounded-md bg-white p-[8px] px-[24px] shadow-[0_2px_10px] shadow-blackA4">
      <div className="flex gap-2">
        <MenuLinkItem label="Home" to="/" />
        <MenuLinkItem label="Products" to="/products" />
        <MenuLinkItem label="Categories" to="/categories" />
      </div>
      <div className="w-[300px] md:w-[100%]">
        <SearchBox />
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

const SearchBox = () => {
  return (
    <Form.Root>
      <Form.Field className="grid" name="q">
        <Form.Control asChild>
          <input
            className="text-slate-blackA6 box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] border-neutral-500  px-[10px] text-[14px] leading-none shadow-[0_0_0_1px] shadow-blackA6 outline-none"
            type="text"
            required
            placeholder="Search Products"
          />
        </Form.Control>
      </Form.Field>
    </Form.Root>
  )
}
