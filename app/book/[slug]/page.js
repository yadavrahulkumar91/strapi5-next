import React from 'react';
import GetData from '../../components/GetData';
// import Book from './book';
import Head from 'next/head';


export default async function Page({ params }) {

    const url = '/api/books/' + params.slug + '?populate=Unit.Lesson.MCQ,Unit.Lesson.Question_answer'
    const Book = await GetData(url);
    // const books = Book.attributes.books.data;

    // const { Book_Name, Lesson } = Book.attributes;
    const { id, attributes } = Book;

    // return (
    //     <div>
    //         <h1>{Book_Name}</h1>

    //         {Lesson.map((lesson) => (
    //             <div key={lesson.id}>
    //                 <h2>{lesson.Lesson_Name}</h2>
    //                 <div dangerouslySetInnerHTML={{ __html: lesson.Content }} />
    //             </div>
    //         ))}
    //     </div>
    // );

    return (
        <div>
            <Head>
                <link rel="stylesheet" type="text/css" href="/style/bookstyle.css" />
            </Head>
            <h1>{attributes.Book_Name}</h1>
            <p>Book ID: {id}</p>

            {attributes.Unit.map(unit => (
                <div key={unit.id}>
                    <h2>{unit.Unit_name}</h2>

                    {unit.Lesson.map(lesson => (
                        <div key={lesson.id}>
                            <h3>{lesson.Lesson_name}</h3>
                            <div dangerouslySetInnerHTML={{ __html: lesson.Lesson_content }} />

                            <h4>MCQs</h4>
                            {lesson.MCQ.map(mcq => (
                                <div key={mcq.id}>
                                    <p>{mcq.Question}</p>
                                    <ul>
                                        <li>{mcq.Option_a}</li>
                                        <li>{mcq.Option_b}</li>
                                        <li>{mcq.Option_c}</li>
                                        <li>{mcq.Option_d}</li>
                                    </ul>
                                    <p>Correct Answer: {mcq.Correct_answer}</p>
                                    <p>Explanation: {mcq.Explanation}</p>
                                </div>
                            ))}

                            <h4>Question Answers</h4>
                            {lesson.Question_answer.map(qa => (
                                <div key={qa.id}>
                                    <p>{qa.Question}</p>
                                    <p>Answer: {qa.Answer}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

