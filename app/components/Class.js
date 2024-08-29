// pages/Class.js

import React from 'react'
import Link from 'next/link'

export default function Class ({ classes }) {
  return (
    <>
      {classes.data.map(classItem => (
        <Link key={classItem.id} href={`/class/${classItem.id}`}>
          <div className='pl-2 whitespace-nowrap font-bold text-[#785700] hover:underline'>
            {classItem.attributes.Class_name}
          </div>
        </Link>
      ))}
    </>
  )
}
