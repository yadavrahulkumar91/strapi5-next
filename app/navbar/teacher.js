

"use client"

import Link from 'next/link';
import GetData from '../components/GetData';
import React, { useState, useEffect } from 'react';

async function coverPictureUrl(id) {
    // const a = 'http://localhost:1337';
    const a = 'https://gamechanger-f5da7.web.app';

    try {
        const Book = await GetData('/api/teachers/' + id + '/?populate=*');
        // const BookUrl = a + await Book.attributes.Cover_picture.data.attributes.url;
        const BookUrl = Book.attributes.Profile_picture?.data?.attributes?.url
            ? a + Book.attributes.Profile_picture.data.attributes.url
            : null;

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
            <ul>
                {books.map((book, index) => (
                    <Link href={`/teacher/${book.id}`}>
                        <li className='p-0 m-0'>
                            <div className='flex border-1 ' key={book.id}>
                                <img
                                    src={coverUrls[index]}
                                    style={{ width: '10px', height: 'auto' }}
                                />
                                <div>{book.attributes.Teacher_name}</div>

                            </div>
                        </li>
                    </Link>

                ))}
            </ul>
        </div>
    );
};

export default BookList;
