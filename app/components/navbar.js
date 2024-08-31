import React from 'react'
import Link from 'next/link'

export default function Page () {
  let links = [
    {
      name: 'Tutors',
      url: '/homeTuitionTutor'
    },
    {
      name: 'Courses',
      url: '/notes'
    },
    {
      name: 'CEE',
      url: 'https://tunepal-my.sharepoint.com/:o:/g/personal/rahul_772422_puc_tu_edu_np/EksxlU-5qWdFt2CWbTPt2zQBDZ26btHP3tUjtaqCXk535A'
    },
    {
      name: 'About',
      url: '/aboutUs'
    }
  ]

  return (
    <nav className='flex gap-2'>
      {links.map((link, i) => {
        return <Link key={i} className='text-lg font-bold text-[#785700] hover:underline rounded-full' href={link.url}>{link.name}</Link>
      })}



    </nav>
  )
}
