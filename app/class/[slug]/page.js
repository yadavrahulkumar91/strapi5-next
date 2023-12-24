import React from 'react';
import GetData from '../../components/GetData';
import Book from './book';
import Teacher from './teacher';
import Practical from './practical'


export async function generateStaticParams() {
    const posts = await fetch('http://127.0.0.1:1337/api/classes?populate=*').then((res) => res.json())
    const posts1 = await posts.data;

    return posts1.map((post) => ({
        slug: post.id.toString(), // Ensure that the slug is a string
    }));
}


export default async function Page({ params }) {

    const {slug}  = params;

   const url = '/api/classes/' + slug  + '?populate=*'
   const Class = await GetData(url);

    return <div>
    
        <h1>Class : {Class.attributes.Class_name} </h1>
     

        {Class.attributes.teachers?.data && <Teacher books={Class.attributes.teachers.data} />}
        {Class.attributes.books?.data && <Book books={Class.attributes.books.data} />}
        {Class.attributes.practicals?.data && <Practical books={Class.attributes.practicals.data} />}


    </div>
}
