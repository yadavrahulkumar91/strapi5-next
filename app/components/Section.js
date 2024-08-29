// "use client"
import React from 'react'
import Class from './Class'
const a = 'https://gamechanger-f5da7.web.app'
import Image from 'next/image'
import axios from 'axios'
import GetData from './GetData'

export default async function Page () {
  const url = '/api/sections?populate=*&sort=id:asc'
  const sections = await GetData(url)

  const {
    data: { data: axiosData }
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/sections?populate=*&sort=id:asc`
  )

  if (!axiosData) {
    return <div>Loading...</div>
  }

  return (
    // <div className='w-60 h-full overflow-scroll backdrop-blur-sm' id='section'>
    //   {axiosData.map(section => (
    //     <div className='pl-2' key={section.id}>
    //       <h1 className='text-xl w-1/12 whitespace-nowrap'>{section.attributes.section_name}</h1>

    //         {section.attributes.section_pic?.data &&
    //           section.attributes.section_pic.data[0]?.attributes?.url && (
    //             <img
    //               key={section.id}
    //               src={section.attributes.section_pic.data[0].attributes.url}
    //               alt={`Cover for ${section.attributes.section_pic.data[0].attributes.name}`}
    //               style={{ width: '150px', height: '150px' }}
    //             />
    //           )}
    //         <Class classes={section.attributes.classes} />
    //       <p className='w-1/12'>{section.attributes.short_description}</p>
    //     </div>
    //   ))}
    // </div>
    // <div className="">

      <nav className="bg-gray-800 px-4 hiddenScrollbar flex space-x-6 overflow-x-scroll w-screen overflow-y-visible">
        {axiosData.map((section) => (
          <div className="relative group inline-block" key={section.id}>
            {/* Container for both the section name and the dropdown */}
            <div className="text-white text-lg cursor-pointer whitespace-nowrap">
              {section.attributes.section_name}
            </div>
            <div className=" hidden group-hover:block bg-white shadow-lg rounded-md min-w-max">
              <Class classes={section.attributes.classes} />
            </div>
          </div>
        ))}
      </nav>

  );
}
