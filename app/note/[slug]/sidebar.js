'use client'

import React, { useState, useEffect } from 'react'
import ContentPage from './ContentPage'
// import SidebarUnit froom './sidebarUnit'
export default function SideBar ({ units, setActiveLesson }) {
  const [open, setOpen] = useState(false)

  let lessonCounter = 1

  return (
    <div>
      <div
        id='booksidebar'
        className='max-h-screen overflow-y-scroll w-[200px]'
      >
        <ol className='p-0'>
          {units.map((unit, index) => (
            // <SidebarUnit unit={unit}/>>
            <div key={unit.id} className='pl-2'>
              <h2 className='text-lg font-semibold'>
                {unit.Unit_name}{' '}
                <button onClick={() => setOpen(!open)}>
                  {open ? '-' : '+'}
                </button>
              </h2>
              {unit.Lesson.map((lesson, lessonIndex) =>
                open ? (
                  <li
                    key={lessonIndex}
                    className='cursor-pointer whitespace-nowrap list-item list-decimal hover:underline left-6 mx-10'
                    id={lessonCounter++}
                    onClick={e => setActiveLesson(parseInt(e.target.id, 10))}
                  >
                    {lesson.Lesson_name}
                  </li>
                ) : null
              )}
            </div>
          ))}
        </ol>
      </div>
    </div>
  )
}
