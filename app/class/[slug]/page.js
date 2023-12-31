import React from 'react';
import GetData from '../../components/GetData';
import Book from './book';
import Teacher from './teacher';
import Practical from './practical'
import axios from 'axios';
import Link from 'next/link';

export async function generateStaticParams() {
    const posts = await fetch('http://127.0.0.1:1337/api/classes?populate=*').then((res) => res.json())
    const posts1 = await posts.data;

    return posts1.map((post) => ({
        slug: post.id.toString(), // Ensure that the slug is a string
    }));
}


export default async function Page({ params }) {

    const {slug}  = params;

    const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/classes/${slug}?populate=teachers.Profile_picture,books.Cover_picture,practicals.Cover_picture`);

    if (!axiosData) {
        return <div>Loading...</div>;
    }

    
    return <div>
    
        <h1>Class : {axiosData.attributes.Class_name} </h1>
     

        {axiosData.attributes.teachers?.data && <Teacher books={axiosData.attributes.teachers.data} />}

        {axiosData.attributes.books?.data && <Book books={axiosData.attributes.books.data} />}
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
}
