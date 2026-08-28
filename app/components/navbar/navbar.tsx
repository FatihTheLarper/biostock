'use client'

import Link from "next/link"
import Image from "next/image"
import logo from "../../../public/images/logo.png"
import { useState } from "react"
import { UserButton } from "@clerk/nextjs"

interface NavItem {
  name: string;
  href: string;
}

interface NavbarProps {
  items: NavItem[];
}

const NavBar = ({ items }: NavbarProps) => {

  const [menuOpened, setMenuOpened] = useState(false)

  return (
    <nav className={`sticky top-2 z-50 flex w-full py-4 px-6 items-center justify-between rounded-xl font-sans ${menuOpened ? 'bg-green-700 dark:bg-green-800' : 'bg-green-600 dark:bg-green-700'} text-white text-xl xl:text-2xl transition-colors`}>

      <div className="nav_title flex items-center space-x-3">
        <Image src={logo} alt="logo-image" width={80} style={{ height: 'auto' }} className="rounded-xl hover:animate-spin" loading="eager"></Image>
        <h1>BioStock</h1>
      </div>

      {/* desktop links */}
      <div className="hidden md:flex items-center space-x-12">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-gray-300 transition-all">{item.name}</Link>
        ))}
        <UserButton />
      </div>

      {/* mobile hamburger menu */}
      <button className="md:hidden focus:outline-none" onClick={() => setMenuOpened(!menuOpened)}>
        {menuOpened ?
          <svg className="w-6 h-6" width={50} height={50} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          :
          <svg className="w-6 h-6" width={50} height={50} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>}
      </button>

      {/* mobile menu */}
      {menuOpened && (
        <div className="absolute top-18 right-0 w-40 bg-gray-700 py-2 z-20 shadow-lg rounded-xl md:hidden flex flex-col hover:bg-gray-500 transition-all">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="px-4 py-2 hover:bg-gray-600 text-right transition-all" onClick={() => setMenuOpened(false)}>
              {item.name}
            </Link>
          ))}
          <div className="px-4 py-2 flex justify-end">
            <UserButton />
          </div>
        </div>
      )}

    </nav>
  )
}

export default NavBar
