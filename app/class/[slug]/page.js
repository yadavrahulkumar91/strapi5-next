import React from 'react';
import GetData from '../../components/GetData';
import Book from './book';
import Teacher from './teacher';


export default async function Page({ params }) {

   const url = '/api/classes/' +  params.slug  + '?populate=*'
   const Class = await GetData(url);
   const books = Class.attributes.books.data;
   const teachers = Class.attributes.teachers.data;
   
    return <div>
    
        <strong>Class Name:</strong> {Class.attributes.Class_name}
        <br />
        <strong>Created At:</strong> {Class.attributes.createdAt}
        <br />
        <strong>Updated At:</strong> {Class.attributes.updatedAt}
        <br />
        <strong>Published At:</strong> {Class.attributes.publishedAt}
        <br />
    <Book books = {books}/>
    <Teacher books = {teachers}/>
    
    
    </div>
}
