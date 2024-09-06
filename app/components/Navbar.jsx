"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useSession, signOut } from 'next-auth/react';
import { PiSignInBold } from "react-icons/pi";
import { FaSignOutAlt } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



const Navbar = () => {
  const { data: session, status } = useSession();
  const [navOpen, setNavOpen] = useState(false);
  const navLists = [
    {
      id: 1,
      href: "/",
      title: "Home"
    },
    {
      id: 2,
      href: "/about",
      title: "About"
    },
    {
      id: 3,
      href: "/contact",
      title: "Contact"
    },

  ]
  if (status === 'authenticated') {
    navLists.push({
      id: 4,
      href: "/todo",
      title: "Your To-Dos"
    });
  }

  // let x = 3
  // const [navOpen, setNavOpen] = useState(false)

  // const {data: session, status} = useSession()

  // console.log(session.user.name, status);



  return (
    <nav className='flex items-center justify-between p-3 shadow-md'>
      <Link href={'/'} className='text-2xl text-blue-600 font-bold flex gap-1 items-center z-50'>
        <Image src={'/logo.png'} width={200} height={200} className='rounded-full w-14 h-14' />
        <span>to-do</span>
      </Link>

      <ul className={`flex gap-14 max-lg:flex-col  max-lg:justify-center max-lg:items-center 
        max-lg:fixed max-lg:w-full max-lg:h-dvh max-lg:top-0 max-lg:right-0 max-lg:bg-slate-200/90 transition-all ml-auto
         ${!navOpen ? "max-lg:translate-x-full" : ""} `}>
        {navLists.map((list) => (

          <li key={list.id} className='font-semibold hover:text-blue-600 hover:border-b hover:border-b-blue-600  '>
            <Link href={list.href}>
              {list.title}
            </Link>
          </li>
        ))}
        
      </ul>

      {
        status == 'loading' ? (<BiLoaderCircle className='animate-spin text-5xl m-2 text-blue-600' />) :
          status == 'unauthenticated' ? (
            <Link href={'/signin'}
            className=' bg-blue-800 py-2 px-4 items-center gap-2 flex text-white font-bold 
             hover:bg-black rounded-lg mx-5'>
              <PiSignInBold className='text-xl' />Sign In
              </Link>
            
          ) : (
            <div className='flex flex-col items-center font-bold text-blue-600 '>
              {/* <p className='uppercase flex gap-1 mb-'><ImUserCheck className='text-2xl' />
                {session.user.name}
              </p> */}
              <DropdownMenu>
                <DropdownMenuTrigger className='mx-5 outline-none'>
                  <Avatar>
                    <AvatarImage src={session.user.image} />
                    <AvatarFallback>{session.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/todo"}>
                      To-Do
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className='bg-black hover:bg-blue-900 text-blue-800 font-bold p-2 text-white font-bold rounded-lg 
                        shadow-lg flex items-center gap-1'>
                      <FaSignOutAlt className='' />Sign Out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
      }

      <button
        onClick={() => setNavOpen(!navOpen)}
        className='lg:hidden z-50'
      >
        {navOpen ? <IoMdClose className='text-2xl text-blue-600' /> : <MdOutlineMenu className='text-2xl text-blue-600' />}
      </button>
    </nav>
  )
}

export default Navbar