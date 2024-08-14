'use client'
import React, { useState, useEffect } from 'react'
import LessonPage from './LessonPage'
import Sidebar from './Sidebar'

export default function Unit ({ units }) {
  const [lesson_id, setLessonId] = useState(1)

  let lessonCounter = 1

  useEffect(() => {
    const element = document.getElementById('lesson-' + lesson_id)
    if (element) {
      element.style.display = 'block'
    }
    const element1 = document.getElementById(lesson_id)
    if (element1) {
      element1.style.color = 'red'
    }
    return () => {
      if (element) {
        element.style.display = 'none' // Cleanup or reset if needed
      }
      const element1 = document.getElementById(lesson_id)
      if (element1) {
        element1.style.color = 'black'
      }
    }
  }, [lesson_id])

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar units={units} setLessonId={setLessonId} />

      <div style={{ display: 'flex', width: '90%' }}>
        <button
          onClick={() => setLessonId(lesson_id - 1)}
          style={{ width: '2%' }}
        >
          Previous
        </button>
        {units.map(unit => (
          <>
            <LessonPage
              key={unit.id}
              lessons={unit.Lesson}
              lessonCounter={lessonCounter}
            />
            <span style={{ display: 'none' }}>
              {' '}
              {(lessonCounter = lessonCounter + unit.Lesson.length)}{' '}
            </span>
          </>
        ))}
        <button
          onClick={() => setLessonId(lesson_id + 1)}
          // onClick={() => activelesson(lesson_id + 1)}
          style={{ width: '2%' }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
