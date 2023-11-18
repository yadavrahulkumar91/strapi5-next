

// import GetData from '../../components/GetData';

// import React from 'react';

// //  async function coverPictureUrl(id) {
// //   const Book = await  GetData('/api/books/' + id +'/?populate=*');

    
// //   const BookUrl = await Book.attributes.Cover_picture.data.attributes.url;
// // return await BookUrl;
// //     console.log(BookUrl);
// // }

// async function coverPictureUrl(id) {
//     const a = 'http://localhost:1337';

//     try {
//         const Book = await GetData('/api/books/' + id + '/?populate=*');
//         const BookUrl = a + Book.attributes.Cover_picture.data.attributes.url;
//         console.log(BookUrl); // This will log the BookUrl value
//         return BookUrl;
//     } catch (error) {
//         console.error('Error:', error);
//         // Handle the error or rethrow if needed
//         throw error;
//     }
// }


// const BookList = async ({ books }) => {

// //    coverPictureUrl(1);
//     // const b = a+ await coverPictureUrl(1);

//     return (
//         <div>

//             { books.map(book => (

//                 <div key={book.id}>
//                     <h2>{book.attributes.Book_Name}</h2>
                    
//                     <img
//                         src={ coverPictureUrl(1)} 
//                         alt={`Cover for ${book.attributes.Book_Name}`}
//                         style={{ maxWidth: '100%', height: 'auto' }}
//                     />
//                     <p>Created At: {book.attributes.createdAt}</p>
//                     <p>Updated At: {book.attributes.updatedAt}</p>
//                     <p>Published At: {book.attributes.publishedAt}</p>
//                     {/* Add more details or styling as needed */}


//                 </div>
//             ))}
//         </div>
//     );
// };

// export default BookList;



"use client"

import Link from 'next/link';
import GetData from '../../components/GetData';
import React, { useState, useEffect } from 'react';

async function coverPictureUrl(id) {
    const a = 'http://localhost:1337';

    try {
        const Book = await GetData('/api/books/' + id + '/?populate=*');
        const BookUrl = a + await Book.attributes.Cover_picture.data.attributes.url;
        console.log(BookUrl);
        return BookUrl;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const BookList = ({ books }) => {
    const [coverUrls, setCoverUrls] = useState([]);

    useEffect(() => {
        const fetchCoverUrls = async () => {
            const urls = await Promise.all(books.map((book) => coverPictureUrl(book.id)));
            setCoverUrls(urls);
        };

        fetchCoverUrls();
    }, [books]);

    return (
        <div>
            {books.map((book, index) => (
                <Link href={`/book/${book.id}`}>
                <div key={book.id}>
                    <h2>{book.attributes.Book_Name}</h2>
                    <img
                        src={coverUrls[index]}
                        alt={`Cover for ${book.attributes.Book_Name}`}
                        style={{ width: '50px', height: 'auto' }}
                    />
                    <p>Created At: {book.attributes.createdAt}</p>
                    <p>Updated At: {book.attributes.updatedAt}</p>
                    <p>Published At: {book.attributes.publishedAt}</p>
                </div>
                </Link>
            ))}
        </div>
    );
};

export default BookList;
