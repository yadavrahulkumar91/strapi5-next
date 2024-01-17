"use client"

// import { useState } from 'react';

// const YourMCQPage = ({ lesson }) => {
//     const [selectedAnswer, setSelectedAnswer] = useState(null);
//     const [showExplanation, setShowExplanation] = useState(false);

//     const handleOptionSelect = (option) => {
//         setSelectedAnswer(option);
//     };

//     const handleCheckAnswer = () => {
//         setShowExplanation(true);
//     };

//     return (
//         <div>
//             {lesson.MCQ.map((mcq) => (
//                 <div key={mcq.id}>
//                     <p>{mcq.Question}</p>
//                     <ul>
//                         <li
//                             onClick={() => handleOptionSelect(mcq.Option_a)}
//                             className={selectedAnswer === mcq.Option_a ? 'selected' : ''}
//                         >
//                             {mcq.Option_a}
//                         </li>
//                         <li
//                             onClick={() => handleOptionSelect(mcq.Option_b)}
//                             className={selectedAnswer === mcq.Option_b ? 'selected' : ''}
//                         >
//                             {mcq.Option_b}
//                         </li>
//                         <li
//                             onClick={() => handleOptionSelect(mcq.Option_c)}
//                             className={selectedAnswer === mcq.Option_c ? 'selected' : ''}
//                         >
//                             {mcq.Option_c}
//                         </li>
//                         <li
//                             onClick={() => handleOptionSelect(mcq.Option_d)}
//                             className={selectedAnswer === mcq.Option_d ? 'selected' : ''}
//                         >
//                             {mcq.Option_d}
//                         </li>
//                     </ul>
//                     <button onClick={handleCheckAnswer}>Check Answer</button>
//                     {showExplanation && (
//                         <div>
//                             <p>Correct Answer: {mcq.Correct_answer}</p>
//                             <p>Explanation: {mcq.Explanation}</p>
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default YourMCQPage;


// import { useState } from 'react';

// const YourMCQPage = ({ lesson }) => {
//     const [selectedAnswer, setSelectedAnswer] = useState(null);
//     const [showExplanation, setShowExplanation] = useState(false);

//     const handleOptionSelect = (option) => {
//         setSelectedAnswer(option);
//     };

//     const handleCheckAnswer = () => {
//         setShowExplanation(true);
//     };

//     return (
//         <div className='border-4 border-black py-5'>
//             {lesson.MCQ.map((mcq) => (
//                 <div key={mcq.id} className='border-2 border-solid rounded-lg my-2 border-black p-2'>
//                     <p>{mcq.Question}</p>
//                     <form>
//                         {['Option_a', 'Option_b', 'Option_c', 'Option_d'].map((optionKey) => (
//                             <label key={optionKey}>
//                                 <input
//                                     type="radio"
//                                     name="answerOptions"
//                                     value={mcq[optionKey]}
//                                     onChange={() => handleOptionSelect(mcq[optionKey])}
//                                     checked={selectedAnswer === mcq[optionKey]}
//                                 />
//                                 {mcq[optionKey]}
//                                 <br/>
//                             </label>
//                         ))}
//                     </form>
//                     <button onClick={handleCheckAnswer}>Check Answer</button>
//                     {showExplanation && (
//                         <div>
//                             <p>Correct Answer: {mcq.Correct_answer}</p>
//                             <p>Explanation: {mcq.Explanation}</p>
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default YourMCQPage;


import { useState } from 'react';

const YourMCQPage = ({ lesson }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(false);
    const [showExplanation, setShowExplanation] = useState(null);

    const handleOptionSelect = (questionId, option) => {
        setSelectedAnswer({ ...selectedAnswer, [questionId]: option });
        
    };

    const handleCheckAnswer = (questionId) => {
        setShowExplanation(questionId);
    };

    return (
        <div className='border-4 border-black py-5'>
            {lesson.MCQ.map((mcq) => (
                <div key={mcq.id} className='border-2 border-solid rounded-lg my-2 border-black p-2'>
                    <p>{mcq.Question}</p>
                    <form>
                        {['Option_a', 'Option_b', 'Option_c', 'Option_d'].map((optionKey) => (
                            <label key={optionKey}>
                                <input
                                    type="radio"
                                    name={`answerOptions_${mcq.id}`}
                                    value={optionKey}
                                    onChange={() => handleOptionSelect(mcq.id, optionKey)}
                                    checked={selectedAnswer[mcq.id] === optionKey}
                                />
                                {mcq[optionKey]} <br></br>
                            </label>
                        ))}
                        {selectedAnswer[mcq.id] && (
                        <p>
                            {selectedAnswer[mcq.id] === ('Option_' + mcq.Correct_answer)
                                ? 'Correct!'
                                : `Incorrect. Correct Answer: ${mcq.Correct_answer}`}
                        </p>
                            )}
                    </form>
                    <button onClick={() => handleCheckAnswer(mcq.id)}>Solution</button>

                    {showExplanation === mcq.id && (
                        <div>
                           
                            <p className='bg-fuchsia-100'> ({mcq.Correct_answer}) {mcq.Explanation}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default YourMCQPage;




// import { useState } from 'react';

// const YourMCQPage = ({ lesson }) => {
//     const [selectedAnswer, setSelectedAnswer] = useState({});
//     const [showExplanation, setShowExplanation] = useState(null);

//     const handleOptionSelect = (questionId, option) => {
//         setSelectedAnswer({ ...selectedAnswer, [questionId]: option });
//     };

//     const handleCheckAnswer = (questionId) => {
//         setShowExplanation(questionId);
//     };

//     const isCorrect = (questionId) => {
//         const selected = selectedAnswer[questionId];
//         const correct = lesson.MCQ.find((mcq) => mcq.id === questionId)?.Correct_answer;
//         return selected === correct;
//     };

//     return (
//         <div>
//             {lesson.MCQ.map((mcq) => (
//                 <div key={mcq.id}>
//                     <p>{mcq.Question}</p>
//                     <form>
//                         {['Option_a', 'Option_b', 'Option_c', 'Option_d'].map((optionKey) => (
//                             <label key={optionKey}>
//                                 <input
//                                     type="radio"
//                                     name={`answerOptions_${mcq.id}`}
//                                     value={optionKey}
//                                     onChange={() => handleOptionSelect(mcq.id, mcq[optionKey])}
//                                     checked={selectedAnswer[mcq.id] === optionKey}
//                                 />
//                                 {mcq[optionKey]}
//                             </label>
//                         ))}
//                     </form>
//                     <button onClick={() => handleCheckAnswer(mcq.id)}>Check Answer</button>
//                     {showExplanation === mcq.id && (
//                         <div>
//                             <p>
//                                 {isCorrect(mcq.id)
//                                     ? 'Corr'
//                                     : `Incorrect. Correct Answer: ${lesson.MCQ.find((mcq) => mcq.id === mcq.id)?.Correct_answer}`}
//                             </p>
//                             <p>Explanation: {mcq.Explanation}</p>
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default YourMCQPage;
