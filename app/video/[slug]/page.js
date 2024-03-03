"use client"

import React, {useState, useEffect} from 'react';
import CoverPage from './CoverPage';
import ContentPage from './ContentPage'
import Sidebar from './Sidebar';
import LessonPage from './LessonPage';
import axios from 'axios';



// export default async function Page({ params }) {
//     const { slug } = params;

//     const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jsonbooks/${slug}?populate=unit.Lesson.MCQ,unit.Lesson.Question_answer`);

//     if (!axiosData) {
//         return <div>Loading...</div>;
//     }
//     const { attributes } = axiosData;

//     const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

//     const goToPreviousLesson = () => {
//         if (currentLessonIndex > 0) {
//             setCurrentLessonIndex(currentLessonIndex - 1);
//         }
//     };

//     const goToNextLesson = () => {
//         if (currentLessonIndex < attributes.unit.length - 1) {
//             setCurrentLessonIndex(currentLessonIndex + 1);
//         }
//     };

//     return (
//         <div className='page'>
//             <Sidebar units={attributes.unit} />
//             <div className='main-content max-h-screen overflow-scroll '>
//                 {/* <CoverPage params={params} /> */}
//                 {/* <ContentPage units={attributes.Unit} /> */}
//                 {attributes.unit.map((unit, index) => {
//                     // if (index === currentLessonIndex) {
//                         return <LessonPage key={unit.id} unit={unit} />;
//                     // }
//                     // return null;
//                 })}
//                 <div className="lesson-navigation">
//                     <button onClick={goToPreviousLesson} disabled={currentLessonIndex === 0}>Previous</button>
//                     <button onClick={goToNextLesson} disabled={currentLessonIndex === attributes.unit.length - 1}>Next</button>
//                 </div>
//             </div>
//         </div>
//     );
// };


export default function Page({ params }) {
    const { slug } = params;
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [lessonData, setLessonData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jsonbooks/${slug}?populate=unit.Lesson.MCQ,unit.Lesson.Question_answer`);

            if (!axiosData) {
                return;
            }

            const { attributes } = axiosData;
            setLessonData(attributes.unit);
        };

        fetchData();
    }, [slug]);

    const goToPreviousLesson = () => {
        if (currentLessonIndex > 0) {
            setCurrentLessonIndex(currentLessonIndex - 1);
        }
    };

    const goToNextLesson = () => {
        if (currentLessonIndex < lessonData.length - 1) {
            setCurrentLessonIndex(currentLessonIndex + 1);
        }
    };

    if (!lessonData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='page'>
            <Sidebar units={lessonData} />
            <div className='main-content max-h-screen overflow-scroll '>
                {lessonData.map((unit, index) => {
                    if (index === currentLessonIndex) {
                        return <LessonPage key={unit.id} unit={unit} />;
                    }
                    return null;
                })}
                <div className="lesson-navigation">
                    <button onClick={goToPreviousLesson} disabled={currentLessonIndex === 0}>Previous</button>
                    <button onClick={goToNextLesson} disabled={currentLessonIndex === lessonData.length - 1}>Next</button>
                </div>
            </div>
        </div>
    );
};