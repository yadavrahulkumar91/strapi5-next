import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import axios from 'axios';

// import { PhotoProvider, PhotoView } from 'react-photo-view';
// import 'react-photo-view/dist/react-photo-view.css';

export async function generateStaticParams() {
    const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/practicals?populate=Unit.Topic.Picture`);

    return axiosData.map((data) => ({
        slug: data.id.toString(),
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
                            {/* <PhotoProvider>
                                <PhotoView src={picture.attributes.url}> */}
                                <img
                                    src={picture.attributes.url}
                                    alt={picture.attributes.name}
                                    // fill={true}
                                    height={200}
                                    width='auto'
                                    className=''
                                />
                                {/* </PhotoView>
                            </PhotoProvider> */}
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

export default async function page({ params }) {
    const { slug } = params;

    const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/practicals/${slug}?populate=Unit.Topic.Picture`);

    if (!axiosData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <DataPage data={axiosData} />
        </div>
    );

}