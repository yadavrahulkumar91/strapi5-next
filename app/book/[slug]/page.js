import React from 'react';
import GetData from '../../components/GetData';
// import Book from './book';


export default async function Page({ params }) {

    const url = '/api/books/' + params.slug + '?populate=*'
    const Book = await GetData(url);
    // const books = Book.attributes.books.data;

    const { Book_Name, Lesson } = Book.attributes;

    return (
        <div>
            <h1>{Book_Name}</h1>

            {Lesson.map((lesson) => (
                <div key={lesson.id}>
                    <h2>{lesson.Lesson_Name}</h2>
                    <div dangerouslySetInnerHTML={{ __html: lesson.Content }} />
                </div>
            ))}
        </div>
    );
}

