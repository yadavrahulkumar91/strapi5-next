"use client"

import React, { useState } from 'react';
import MCQ from './mcq'
import PericardiumInfo from './LessonContent';

const YourComponent = ({ lesson }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        if (currentIndex < lesson.Question_answer.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div style={{ width: '100%', height: '95vh', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'auto' }}>
                <PericardiumInfo pericardiumData={lesson.lesson_content} />

                <h4>MCQs</h4>
                <MCQ lesson={lesson} />

                <h4>Question Answers</h4>
                {lesson.Question_answer.map((qa, index) => (
                    <div key={qa.id} style={{ display: index === currentIndex ? 'block' : 'none' }}>
                        <p>{qa.Question}</p>
                        <p>Answer: </p>
                        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]}>{qa.Answer}</ReactMarkdown>
                    </div>
                ))}
            </div>

            <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
                <button onClick={goToPrevious} disabled={currentIndex === 0}>Previous</button>
                <button onClick={goToNext} disabled={currentIndex === lesson.Question_answer.length - 1}>Next</button>
            </div>
        </div>
    );
};

export default YourComponent;
