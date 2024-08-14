// 'use client'
import React from 'react'
import MCQ from './mcq'
import LessonContent from './LessonContent'
import QA from './QA'

const LessonPage = ({ lessons, lessonCounter }) => {
  // useEffect(() => {
  //   const script = document.createElement('script')
  //   script.id = 'MathJax-script'
  //   script.async = true
  //   script.src =
  //     'https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js'
  //   document.head.appendChild(script)

  //   return () => {
  //     document.head.removeChild(script)
  //   }
  // }, [0]);

  // var customId=getNextLessonId()

// lessonCounter++


  return (
    <>
      {lessons.map((lesson, i) => (
        <div
          key={lesson.id}
          className='lesson'
          style={{ borderRadius: '1%', border: '2px solid black' }}
          id={`lesson-${lessonCounter+i}`}
          style={{width:'96%'}}
          >     
          <div
            className='lesson-title sticky top-0 text-blue'
            style={{ position: 'sticky' }}
            >
              {lesson.Lesson_name}
          </div>
          {lesson.video_url && (
            <iframe
              width='100%'
              height='100vh'
              src={lesson.video_url}
              frameBorder='0'
              allowFullScreen
              style={{ width: '100%', height: '60vh' }}
            ></iframe>
          )}

          <div style={{ width: '100%', height: '95vh', overflow: 'scroll' }}>
            <LessonContent pericardiumData={lesson.lesson_content} />

            <h2 style={{backgroundColor:'grey', border:'2px solid black'}}>Multiple Choice Questions</h2>
            <MCQ MCQ={lesson.MCQ} />

            <h2 style={{backgroundColor:'grey', border:'2px solid black'}}>Question Answers</h2>
            <QA Question_answer={lesson.Question_answer} />
          </div>
        </div>
      ))}
     </>
  )
}

export default LessonPage
