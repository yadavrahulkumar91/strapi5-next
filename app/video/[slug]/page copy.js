// "use client"

import React from 'react';
import CoverPage from './CoverPage';
import ContentPage from './ContentPage'
import Sidebar from './Sidebar';
import LessonPage from './LessonPage';
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
            

        </div>
    );
};
