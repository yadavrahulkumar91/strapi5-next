// 'use client'
import React, { useEffect } from 'react'
import MCQ from './mcq'
import LessonContent from './lessonContent/lessonContent'
import QA from './qa'

const LessonPage = ({ lessons, lessonCounter, unitName }) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.id = 'MathJax-script'
    script.async = true
    script.src =
      'https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js'
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  })

  return (
    <>
      {lessons.map((lesson, i) => (
        <div
          key={lesson.id}
          className='lesson p-0 m-0 w-screen overflow-scroll'
          style={{ borderRadius: '1%', border: '2px solid black'}}
          id={`lesson-${lessonCounter + i}`}
        >
          {/* <span className='float-left text-lg'>{unitName}</span> */}
          <h1
            className='text-center sticky top-0 text-blue-600'
            style={{ position: 'sticky' }}
          >
            {lessonCounter + i}. {lesson.Lesson_name}
          </h1>
          {lesson.video_url && (
            <iframe
              // width='100%'
              // height='100vh'
              src={lesson.video_url}
              frameBorder='0'
              allowFullScreen
              // style={{ width: '100%', height: '60vh' }}
            ></iframe>
          )}

          {/* <div className='h-full' style={{ width: '100%', overflow: 'scroll' }}> */}
          <LessonContent lessonContent={lesson.lesson_content} />

          <h2 style={{ backgroundColor: 'grey', border: '2px solid black' }}>
            Multiple Choice Questions
          </h2>
          <MCQ MCQ={lesson.MCQ} />

          <h2 style={{ backgroundColor: 'grey', border: '2px solid black' }}>
            Question Answers
          </h2>
          <QA Question_answer={lesson.Question_answer} />
          {/* </div> */}
        </div>
      ))}
    </>
  )
}

export default LessonPage
