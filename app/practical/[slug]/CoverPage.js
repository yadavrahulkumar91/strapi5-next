import React from 'react';
import GetData from '../../components/GetData';

// import './bookstyle.css';

const CoverPage = async ({ params }) => {
    const url = '/api/books/' + params.slug + '?populate=Unit.Topic';
    const Book = await GetData(url);
    const { id, attributes } = Book;

    return (
        <div>
            <h1>{attributes.Name}</h1>
            <p>Book ID: {id}</p>
            {/* Other book information can be displayed here */}
            {/* You can also include the book content if needed */}
        </div>
    );
};

export default CoverPage;
