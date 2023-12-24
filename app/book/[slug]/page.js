// "use client"

import React from 'react';
import CoverPage from './CoverPage';
import ContentPage from './ContentPage'
import Sidebar from './Sidebar';
import LessonPage from './LessonPage';
import GetData from '../../components/GetData';
// import axios from '../../components/axios'

export async function generateStaticParams() {
    const posts = await fetch('http://127.0.0.1:1337/api/books?populate=*').then((res) => res.json())
    const posts1 = await posts.data;

    return posts1.map((post) => ({
        slug: post.id.toString(), // Ensure that the slug is a string
    }));
}


const Page = async ({ params }) => {
    const { slug } = params;

    const url = '/api/books/' + slug + '?populate=Unit.Lesson.MCQ,Unit.Lesson.Question_answer';
    const Book = await GetData(url);
    // const Book = await fetcher(url);
// const Book = await axios.get("url");
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
