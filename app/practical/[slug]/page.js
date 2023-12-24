
// import React from 'react';
// import CoverPage from './CoverPage';
// import ContentPage from './ContentPage'
// import Sidebar from './Sidebar';
// import LessonPage from './LessonPage';
// import GetData from '../../components/GetData';

// const Page = async ({ params }) => {
//     const url = '/api/practicals/' + params.slug + '?populate=Unit.Topic';
//     const Book = await GetData(url);
//     const { attributes } = Book;

//     return (
//         <div className='page'>
//             <Sidebar units={attributes.Unit} />
//             <div className='main-content'>
//                 <CoverPage params={params} />
//                 <ContentPage units={attributes.Unit} />
//                 {attributes.Unit.map(unit => (

//                     <LessonPage key={unit.id} unit={unit} />
//                 ))}
//             </div>


//         </div>
//     );
// };

// export default Page;


// pages/index.js

import React from 'react';
import Image from 'next/image';
import GetData from '../../components/GetData';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';


// const a = 'http://localhost:1337';
const a = 'https://gamechanger-f5da7.web.app';

export async function generateStaticParams() {
    const posts = await fetch('http://127.0.0.1:1337/api/practicals?populate=*').then((res) => res.json())
    const posts1 = await posts.data;

    return posts1.map((post) => ({
        slug: post.id.toString(), // Ensure that the slug is a string
    }));
}


const TopicPage = ({ topic }) => {
    return (
        <div className='pt-5'>
            <h1 className='text-lg'>{topic.Name}</h1>

            {/* <h2>Labelled Picture</h2> */}
            <div className='flex'>
                {topic.Picture.data && topic.Picture.data.length > 0 ? (
                    topic.Picture.data.map((picture, index) => (
                        <div key={index} className=''>
                            {/* <div className="" tabIndex="0"> */}
                                <img
                                    src={a + picture.attributes.url}
                                    alt={picture.attributes.name}
                                    // fill={true}
                                    height={200}
                                    width='auto'
                                    className=''
                                />
                            {/* </div> */}
                            <div>Fig. {picture.attributes.caption}</div>
                        </div>
                    ))
                ) : null}

            </div>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>

                {topic.Description}
            </ReactMarkdown>
        </div>
    );
};

const UnitPage = ({ unit }) => {
    return (
        <div>
            <h1 className='pb-5 pt-5 text-3xl'>{unit.Name}</h1>
            <ul>
                {unit.Topic.map((topic) => (
                    <li key={topic.id}>
                        <TopicPage topic={topic} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

const DataPage = ({ data }) => {
    return (
        <div>
            <h1>{data.attributes.Name}</h1>

            <ul>
                {data.attributes.Unit.map((unit) => (
                    <li key={unit.id}>
                        <UnitPage unit={unit} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

const HomePage = async ({ params }) => {
    const { slug } = params;

    const url = '/api/practicals/' + slug + '?populate=Unit.Topic.Picture';
    const Book = await GetData(url);
    const { attributes } = Book;

    return (
        <div>
            <DataPage data={Book} />
        </div>
    );
};


export default HomePage;
