// "use client"

import React from 'react';
import CoverPage from './CoverPage';
import ContentPage from './ContentPage'
import Sidebar from './Sidebar';
import LessonPage from './LessonPage';
import GetData from '../../components/GetData';
import axios from 'axios';


// export async function generateStaticParams() {
//     const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jsonbooks?populate=classes.jsonbooks,jsonbooks,Profile_picture`);

//     return axiosData.map((data) => ({
//         slug: data.id.toString(),
//     }));
// }

export default async function Page({ params }) {
    const { slug } = params;

    const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jsonbooks/${slug}?populate=unit.Lesson.MCQ,unit.Lesson.Question_answer`);

    if (!axiosData) {
        return <div>Loading...</div>;
    }
    const { attributes } = axiosData;

    return (
        <div className='page'>
            <Sidebar units={attributes.unit} />
            <div className='main-content max-h-screen overflow-scroll '>
                {/* <CoverPage params={params} /> */}
                {/* <ContentPage units={attributes.Unit} /> */}
                {attributes.unit.map(unit => (

                    <LessonPage key={unit.id} unit={unit} />
                ))}
            </div>
            {/* <script type="text/javascript" id="MathJax-script" async
                src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
            </script> */}
            {/* <script src="
https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js
"></script> */}

        </div>
    );
};

// export default Page;
