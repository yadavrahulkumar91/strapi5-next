import React from 'react';

const LessonPage = ({ unit }) => {
    return (
        <div>
            {unit.Lesson.map(lesson => (
                <div key={lesson.id} className='container' id={`lesson-${lesson.id}`}>
                    <div className='line'></div>
                    <div className='lesson-title'>{lesson.Lesson_name}</div>
                    <div dangerouslySetInnerHTML={{ __html: lesson.Lesson_content }} />

                    <h4>MCQs</h4>
                    {lesson.MCQ.map(mcq => (
                        <div key={mcq.id}>
                            <p>{mcq.Question}</p>
                            <ul>
                                <li>{mcq.Option_a}</li>
                                <li>{mcq.Option_b}</li>
                                <li>{mcq.Option_c}</li>
                                <li>{mcq.Option_d}</li>
                            </ul>
                            <p>Correct Answer: {mcq.Correct_answer}</p>
                            <p>Explanation: {mcq.Explanation}</p>
                        </div>
                    ))}

                    <h4>Question Answers</h4>
                    {lesson.Question_answer.map(qa => (
                        <div key={qa.id}>
                            <p>{qa.Question}</p>
                            <p>Answer: {qa.Answer}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default LessonPage;
