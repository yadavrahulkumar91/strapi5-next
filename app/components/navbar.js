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
    <nav className='flex justify-center bg-[##ffd5ec]'>
      {links.map((link, i) => {
        return <Link key={i} className='px-5 font-bold text-[#785700] hover:underline ' href={link.url}>{link.name}</Link>
      })}

    </nav>
  )
}
