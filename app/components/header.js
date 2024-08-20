'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import NavBar from './navbar'
import Link from 'next/link'
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
      <div className='sticky top-0 backdrop-blur-sm'>
        <button
          className='fixed left-0 top-5'
          onClick={() => {
            setToggled(!toggled)
          }}
        >
          {toggled ? <div>Hide </div> : <div>Show</div>}
        </button>
        <Link className=' justify-center  flex pt-2' href='/'>
          <Image
            src='/logo.svg'
            width={40}
            height={40}
            alt='Picture of the author'
            className='conten'
          />
          <span className='text-4xl font-bold font-serif text-[#efc75e] webkit stroke opacity-100'>
            {' '}
            GameChanger Academy
          </span>
        </Link>

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
