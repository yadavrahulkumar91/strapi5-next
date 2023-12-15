

// // "use client"

// import React from 'react';
// import Link from 'next/link';
// import GetData from '../../components/GetData';
// import Image from 'next/image';



// async function BookList ({ books })  {
//     // const a = 'http://localhost:1337';
//     const a = 'https://gamechanger-f5da7.web.app';
    
    
    
//     return (
//         <div>
//             {books.map((book, index) => (

//                   {  const Book = await GetData('/api/books/' + book.id + '/?populate=*');
//                     const BookUrl = Book.attributes.Cover_picture?.data?.attributes?.url
//                     ? a + Book.attributes.Cover_picture.data.attributes.url
//                     : null;
//             }

//                 <Link href={`/book/${book.id}`}>
//                 <div key={book.id}>
//                     <h2>{book.attributes.Book_Name}</h2>
//                     {/* <Image
//                         src={a+BookUrl}
//                         alt={`Cover for ${book.attributes.Book_Name}`}
//                         width= '50' height=  '50'
//                     /> */}
//                     <p>Created At: {book.attributes.createdAt}</p>
//                     <p>Updated At: {book.attributes.updatedAt}</p>
//                     <p>Published At: {book.attributes.publishedAt}</p>
//                 </div>
//                 </Link>
//             ))}
//         </div>
//     );
// };

// export default BookList;



// "use client"

import React from 'react';
import Link from 'next/link';
import GetData from '../../components/GetData';
import Image from 'next/image';

async function fetchBookData(bookId) {
    const book = await GetData(`/api/books/${bookId}/?populate=*`);
    return book;
}

async function BookList({ books }) {
    // const a = 'http://localhost:1337';
    const a = 'https://gamechanger-f5da7.web.app';

    const getBookImageUrl = async (bookId) => {
        const book = await fetchBookData(bookId);
        const bookUrl = book.attributes.Cover_picture?.data?.attributes?.url
            ? a + book.attributes.Cover_picture.data.attributes.url
            : null;
        return bookUrl;
    };

    return (
        <div>
            {books.map(async (book) => {
                const bookUrl = await getBookImageUrl(book.id);

                return (
                    <Link href={`/book/${book.id}`} key={book.id}>
                        <div>
                            <h2>{book.attributes.Book_Name}</h2>
                            {/* <Image
                                src={bookUrl}
                                alt={`Cover for ${book.attributes.Book_Name}`}
                                width="50"
                                height="50"
                            /> */}
                            <p>Created At: {book.attributes.createdAt}</p>
                            <p>Updated At: {book.attributes.updatedAt}</p>
                            <p>Published At: {book.attributes.publishedAt}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default BookList;
