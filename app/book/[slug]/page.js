// "use client"

import React from 'react';
import CoverPage from './CoverPage';
import Sidebar from './Sidebar';
import LessonPage from './LessonPage';
import GetData from '../../components/GetData';

const Page = async ({ params }) => {
    const url = '/api/books/' + params.slug + '?populate=Unit.Lesson.MCQ,Unit.Lesson.Question_answer';
    const Book = await GetData(url);
    const { attributes } = Book;

    return (
        <div className='page'>
                <Sidebar units={attributes.Unit} />
                <div className='main-content'>
                    <CoverPage params={params} />
                    {attributes.Unit.map(unit => (
                    
                        <LessonPage key={unit.id} unit={unit} />
                    ))}
                </div>
       
        </div>
    );
};

export default Page;
