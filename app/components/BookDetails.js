// components/BookDetails.js

"use client"

import React from 'react';

const BookDetails = ({ selectedBook }) => {
    return (
        <div className="content">
            {selectedBook ? (
                <div>
                    <h1>{selectedBook.attributes.Title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: selectedBook.attributes.Description }} />
                </div>
            ) : (
                <div>Select a book from the list</div>
            )}
        </div>
    );
};

export default BookDetails;
