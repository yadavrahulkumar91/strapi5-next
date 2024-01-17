// "use client"

import React from 'react';
// import CoverPage from './CoverPage';
// import ContentPage from './ContentPage'
// import Sidebar from './Sidebar';
// import LessonPage from './LessonPage';
// import GetData from '../../components/GetData';
import axios from 'axios';

export async function generateStaticParams() {
    const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/syllabi?populate=*`);

    return axiosData.map((data) => ({
        slug: data.id.toString(),
    }));
}

export default async function Page({ params }) {
    const { slug } = params;

    const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/syllabi/${slug}?populate=*`);

    if (!axiosData) {
        return <div>Loading...</div>;
    }
    const { attributes } = axiosData;

    return (
        <div className='page'>
            <h1 className='text-center underline'>{attributes.Subject}</h1>
            <h2>{attributes.Subject_code}</h2>
            <div dangerouslySetInnerHTML={{ __html: attributes.Course_objectives }}/>
            <div dangerouslySetInnerHTML={{ __html: attributes.Evaluation_scheme }}/>
            <div dangerouslySetInnerHTML={{ __html: attributes.Tutorials }}/>
            <div dangerouslySetInnerHTML={{ __html: attributes.Reference }}/>
            {/* <div dangerouslySetInnerHTML={{ __html: attributes.Evaluation_scheme }}/> */}

            {/* <Sidebar units={attributes.Unit} />
            <div className='main-content max-h-screen overflow-scroll '>
                <CoverPage params={params} />
                <ContentPage units={attributes.Unit} />
                {attributes.Unit.map(unit => (

                    <LessonPage key={unit.id} unit={unit} />
                ))}

            </div> */}
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
