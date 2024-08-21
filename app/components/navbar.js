import React from 'react'
import Link from 'next/link'

export default function Page () {
  let links = [
    {
      name: 'Home Tuition Tutors',
      url: '/homeTuitionTutor'
    },
    {
      name: 'Notes',
      url: '/notes'
    },
    {
      name: 'CEE Full Resorces',
      url: '/https://tunepal-my.sharepoint.com/:o:/g/personal/rahul_772422_puc_tu_edu_np/EksxlU-5qWdFt2CWbTPt2zQBDZ26btHP3tUjtaqCXk535A'
    },
    {
      name: 'About us',
      url: '/aboutUs'
    }
  ]

  return (
    <nav className='flex fixed left-1/2 -translate-x-1/2 top-9 gap-2'>
      {links.map((link, i) => {
        return <Link key={i} className='text-[16px] leading-[16px] backdrop-blur-sm font-bold text-[#785700] hover:underline rounded-full' href={link.url}>{link.name}</Link>
      })}

    </nav>
  )
}
