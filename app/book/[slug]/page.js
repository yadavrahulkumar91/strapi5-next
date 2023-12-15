"use client"

import React from 'react';
import CoverPage from './CoverPage';
import ContentPage from './ContentPage'
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
                <ContentPage units={attributes.Unit} />
                    {attributes.Unit.map(unit => (
                    
                        <LessonPage key={unit.id} unit={unit} />
                    ))}
                </div>
            <script type="text/javascript" id="MathJax-script" async
                src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
            </script>
       
        </div>
    );
};

export default Page;
