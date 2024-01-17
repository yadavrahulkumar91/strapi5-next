import React from 'react';
import axios from 'axios';
import Book from '../class/[slug]/syllabus'; // Correct import statement

export default async function Page({ params }) {
    const { slug } = params;

    const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/classes?populate=syllabi&sort=id:asc`);

    if (!axiosData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {axiosData.map((Class) => (

                <div key={Class.id} className='m-xl'>
                    <h1>{Class.attributes.Subject}</h1>
                    <h1>{Class.attributes.Class_name}</h1>
                    <div className='border'>

                        {Class.attributes.syllabi?.data && <Book books={Class.attributes.syllabi.data} />}
                    </div>
                </div>
            ))}
        </div>
    );
}
