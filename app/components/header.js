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
      <div id='header' className='sticky top-0 backdrop-blur-sm'>
        {/* <button
          className='fixed left-0 top-5'
          onClick={() => {
            setToggled(!toggled)
          }}
        >
          {toggled ? <GoSidebarExpand /> : <GoSidebarCollapse />}
        </button> */}
        <div className='justify-center  flex pt-2'>
          <Link className='flex' href='/'>
            <Image
              src='/logo.svg'
              width={30}
              height={30}
              alt='Picture of the author'
              className='conten'
            />
            <span className='text-3xl font-bold font-serif text-[#efc75e] webkit stroke opacity-100'>
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
