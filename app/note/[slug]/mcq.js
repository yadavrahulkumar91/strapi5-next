'use client'
import { useState } from 'react'

const YourMCQPage = ({ MCQ }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(false)
  const [showExplanation, setShowExplanation] = useState(null)

  const handleOptionSelect = (questionId, option) => {
    setSelectedAnswer({ ...selectedAnswer, [questionId]: option })
  }

  const handleCheckAnswer = questionId => {
    setShowExplanation(questionId)
  }

  return (
    <div className='border-4 border-black py-5'>
      {MCQ.map(mcq => (
        <div
          key={mcq.id}
          className='border-2 border-solid rounded-lg my-2 border-black p-2'
        >
          <span dangerouslySetInnerHTML={{ __html: mcq.Question }} />
          <form>
            {['Option_a', 'Option_b', 'Option_c', 'Option_d'].map(optionKey => (
              <label style={{ display: 'flex' }} key={optionKey}>
                <input
                  type='radio'
                  name={`answerOptions_${mcq.id}`}
                  value={optionKey}
                  onChange={() => handleOptionSelect(mcq.id, optionKey)}
                  checked={selectedAnswer[mcq.id] === optionKey}
                />
                <span dangerouslySetInnerHTML={{ __html: mcq[optionKey] }} />
              </label>
            ))}
            {selectedAnswer[mcq.id] && (
              <p>
                {selectedAnswer[mcq.id] === 'Option_' + mcq.Correct_answer
                  ? 'Correct!'
                  : `Incorrect. Correct Answer: ${mcq.Correct_answer}`}
              </p>
            )}
          </form>
          <button onClick={() => handleCheckAnswer(mcq.id)}>Solution</button>

          {showExplanation === mcq.id && (
            <div>
              <p className='bg-fuchsia-100'>
                {' '}
                <span
                  dangerouslySetInnerHTML={{ __html: mcq.Correct_answer }}
                />
                <span dangerouslySetInnerHTML={{ __html: mcq.Explanation }} />
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default YourMCQPage
