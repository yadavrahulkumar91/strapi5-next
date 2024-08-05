import React from 'react';

import Book from './book';
import Syllabus from './syllabus';
import Teacher from './teacher';
import Practical from './practical'
import Jsonbook from './jsonbook'
import axios from 'axios';



export async function generateStaticParams() {
    const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/classes?populate=*&pagination[pageSize]=200`);
    // const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/classes?populate=classes.books,books,Profile_picture&sort=id:asc`);

    return axiosData.map((data) => ({
        slug: data.id.toString(),
    }));
}


export default async function Page({ params }) {

    const { slug } = params;

    const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/classes/${slug}?populate=teachers.Profile_picture,books.Cover_picture,practicals.Cover_picture,syllabi,jsonbooks.cover_picture`);

    if (!axiosData) {
        return <div>Loading...</div>;
    }


    return (
        <div>

            <h1>Class : {axiosData.attributes.Class_name} </h1>


            {axiosData.attributes.teachers?.data && <Teacher books={axiosData.attributes.teachers.data} />}

            {axiosData.attributes.books?.data && <Book books={axiosData.attributes.books.data} />}
            {axiosData.attributes.books?.data && <Jsonbook books={axiosData.attributes.jsonbooks.data} />}
            {axiosData.attributes.syllabi?.data && <Syllabus books={axiosData.attributes.syllabi.data} />}
            {axiosData.attributes.practicals?.data && <Practical books={axiosData.attributes.practicals.data} />}

            {/* <h1>Other Study Resorces</h1>
        <Link href={axiosData.attributes.onedrive_url} target="_blank" rel="noopener noreferrer" className="folderIcon">
            <div className="folder">
                <div className="front"></div>
                <div className="back"></div>
            </div>
            <span className="folderText">OneDrive</span>
        </Link> */}
        </div>
        )
}
