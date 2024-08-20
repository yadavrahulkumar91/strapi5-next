'use client'

import React, { useState, useEffect } from 'react'
import ContentPage from './ContentPage'

export default function SideBar ({ units, setActiveLesson }) {

  const [collapsed, setCollapsed] = useState(false)
  const [toggled, setToggled] = useState(false)
  const [open, setOpen] = useState(false)

  let lessonCounter=1;
 
  return (
    <div className=''>
        <button className='sb-button ' onClick={() => setCollapsed(!collapsed)}>{collapsed ? 'Collapse' : 'Expand'}</button>
       <ol className='p-0'>
          {units.map((unit, index) => (
            <div key={unit.id}>
                <h2>{unit.Unit_name}  <button onClick={()=>setToggled(!toggled)}>{toggled ? '-' : '+'}</button></h2>
                {unit.Lesson.map((lesson, lessonIndex) => (
                    <li key={lessonIndex} className='cursor-pointer left-6 mx-10' id={lessonCounter++}  onClick={(e) => setActiveLesson(parseInt(e.target.id, 10))}>
                      {lesson.Lesson_name}
                    </li>        
                ))}
            </div>
          ))}
          </ol>
    </div>
  )
}
