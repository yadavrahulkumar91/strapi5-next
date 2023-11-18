// components/Book3List.js

import React from 'react';

const Book3List = ({ lessons, onLessonClick }) => {
    return (
        <div className="sidebar">
            <h2>Lesson List</h2>
            <ul>
                {lessons.map((lesson) => (
                    <li key={lesson.id} onClick={() => onLessonClick(lesson)}>
                        {lesson.attributes.Lesson_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Book3List;
