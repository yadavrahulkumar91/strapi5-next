import React from 'react';
import GetData from '../../components/GetData';
import Book from './book';
import Teacher from './teacher';
import Practical from './practical'


export default async function Page({ params }) {

   const url = '/api/classes/' +  params.slug  + '?populate=*'
   const Class = await GetData(url);

    return <div>
    
        <h1>Class : {Class.attributes.Class_name} </h1>
     

        {Class.attributes.teachers?.data && <Teacher books={Class.attributes.teachers.data} />}
        {Class.attributes.books?.data && <Book books={Class.attributes.books.data} />}
        {Class.attributes.practicals?.data && <Practical books={Class.attributes.practicals.data} />}


    </div>
}
