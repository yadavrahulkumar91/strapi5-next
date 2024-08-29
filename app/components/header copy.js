'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import NavBar from './navbar'
import Link from 'next/link'
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go'

const Header = () => {
  const [toggled, setToggled] = useState(false)

  useEffect(() => {
    const element = document.getElementById('section')
    if (element) {
      if (toggled) {
        element.style.display = 'block'
      } else {
        element.style.display = 'none'
      }
    }

    return () => {
      // if (element) {
      element.style.display = 'none' // Cleanup or reset if needed
      // }
    }
  }, [toggled])

  // useEffect(() => {
  //   const element = document.getElementById('section')
  //   if (element) {
  //       element.style.display = 'none' // Cleanup or reset if needed
  //     // }
  //   }
  // })

  return (
    <>
      <div id='header' className='fullscreen'>
        <button
          className='fixed left-5 top-5 text-[#785700] z-50 font-bold '
          onClick={() => {
            setToggled(!toggled)
          }}
        >
          {toggled ? <GoSidebarExpand /> : <GoSidebarCollapse />}
        </button>
        <div className='justify-center  flex pt-2'>
          <Link className='flex fixed left-1/2 -translate-x-1/2 ' href='/'>
            <Image
              src='/logo.svg'
              width={25}
              height={25}
              alt='Picture of the author'
              className='content backdrop-blur-sm rounded-tl-md rounded-tr-2xl rounded-bl-3xl rounded-br-md'
            />
            <span className='text-[24px] leading-[24px] align-bottom font-bold font-serif text-[#efc75e] webkit stroke opacity-100 backdrop-blur-sm rounded-full'>
              GameChanger Academy
            </span>
          </Link>
        </div>

        <div className='user-section'>
          {/* {user ? (
                    <div className="user-info">
                        Welcome, {user.username}!
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <button onClick={handleLogin}>Login</button>
                )} */}
        </div>
        <div className='search-bar'>
          {/* Include your search bar component */}
        </div>

        <NavBar />
      </div>
    </>
  )
}

export default Header
