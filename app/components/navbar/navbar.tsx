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
    <nav className={`sticky top-2 z-50 flex w-full py-3 px-4 md:px-6 items-center justify-between rounded-xl font-sans ${menuOpened ? 'bg-green-700 dark:bg-green-800' : 'bg-green-600 dark:bg-green-700'} text-white text-xl xl:text-2xl shadow-sm border-b-2 border-black/5 transition-colors`}>

      <div className="nav_title flex items-center gap-3">
        <Link href="/home" className="flex items-center gap-3 group">
          <Image src={logo} alt="logo-image" width={80} style={{ height: 'auto' }} className="rounded-lg group-hover:animate-spin" loading="eager"></Image>
          <h1 className="font-semibold tracking-tight">BioStock</h1>
        </Link>
      </div>

      {/* desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="relative text-green-50 hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-green-200 after:transition-all after:duration-300 hover:after:w-full">{item.name}</Link>
        ))}
        <UserButton />
      </div>

      {/* mobile hamburger menu */}
      <button className="md:hidden focus:outline-none" aria-label="Toggle navigation menu" aria-expanded={menuOpened} onClick={() => setMenuOpened(!menuOpened)}>
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
        <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-800 py-2 z-20 shadow-lg rounded-xl md:hidden flex flex-col">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-gray-700 text-right transition-colors" onClick={() => setMenuOpened(false)}>
              {item.name}
            </Link>
          ))}
          <div className="px-4 py-2 flex justify-end border-t border-gray-100 dark:border-gray-700">
            <UserButton />
          </div>
        </div>
      )}

    </nav>
  )
}

export default NavBar
