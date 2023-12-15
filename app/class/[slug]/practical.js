

"use client"

import Link from 'next/link';
import GetData from '../../components/GetData';
import React, { useState, useEffect } from 'react';

async function coverPictureUrl(id) {
    const a = 'https://gamechanger-f5da7.web.app';

    try {
        const Book = await GetData('/api/practicals/' + id + '/?populate=*');
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
                <Link href={`/practical/${book.id}`}>
                    <div key={book.id}>
                        <h2>{book.attributes.Name}</h2>
                        <img
                            src={coverUrls[index]}
                            alt={`Cover for ${book.attributes.Book_Name}`}
                            style={{ width: '50px', height: 'auto' }}
                        />
                        {/* <p>Created At: {book.attributes.createdAt}</p>
                        <p>Updated At: {book.attributes.updatedAt}</p>
                        <p>Published At: {book.attributes.publishedAt}</p> */}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default BookList;
