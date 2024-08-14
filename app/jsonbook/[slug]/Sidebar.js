'use client'

import React, { useState, useEffect } from 'react'
import ContentPage from './ContentPage'

export default function SideBar ({ units, setLessonId }) {

  const [collapsed, setCollapsed] = useState(false)
  const [toggled, setToggled] = useState(false)
  const [open, setOpen] = useState(false)

  let lessonCounter=1;
 
  return (
    <div style={{ height: '95vh', overflow: 'scroll', width:'10%' }}>
        <button className='sb-button' onClick={() => setCollapsed(!collapsed)}>Collapse</button>
       <ol>
          {units.map((unit, index) => (
            <div key={unit.id}>
                <h2>{unit.Unit_name}  <button onClick={()=>setToggled(!toggled)}>{toggled ? '-' : '+'}</button></h2>
                {unit.Lesson.map((lesson, lessonIndex) => (
                    <li style={{margin:"2px"}} id={lessonCounter++}  onClick={(e) => setLessonId(parseInt(e.target.id, 10))}>
                      {lesson.Lesson_name}
                    </li>        
                ))}
            </div>
          ))}
          </ol>
    </div>
  )
}
