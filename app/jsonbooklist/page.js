import React from 'react';
import axios from 'axios';
import Book from '../class/[slug]/jsonbook'; // Correct import statement

export default async function Page({ params }) {
    const { slug } = params;

    const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/classes?populate=jsonbooks.Cover_picture&sort=id:asc`);

    if (!axiosData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {axiosData.map((Class) => (

                <div key={Class.id} className='m-xl'>
                    <h1>{Class.attributes.Class_name}</h1>
                    <div className='border'>

                        {Class.attributes.jsonbooks?.data && <Book books={Class.attributes.jsonbooks.data} />}
                    </div>
                </div>
            ))}
        </div>
    );
}
