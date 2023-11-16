// components/BookList.js

"use client"

import React from 'react';

const BookList = ({ books, onBookClick }) => {
    return (
        <div className="sidebar">
            <h2>Book List</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.id} onClick={() => onBookClick(book)}>
                        {book.attributes.Title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
