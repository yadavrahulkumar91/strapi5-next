// // pages/index.js
// "use client"
// // pages/index.js

// import React, { useState, useEffect } from 'react';

// const Home = () => {
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://localhost:1337/api/book1s', {
//                     // headers: {
//                     //     Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual access token
//                     // },
//                 });

//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }

//                 const data = await response.json();
//                 setBooks(data.data);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     if (books.length === 0) {
//         return <div>No data available</div>;
//     }

//     return (
//         <div>
//             {books.map((book) => (
//                 <div key={book.id}>
//                     <h1>{book.attributes.Title}</h1>
//                     <div dangerouslySetInnerHTML={{ __html: book.attributes.Description }} />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Home;



// pages/index.js
"use client"

import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import BookDetails from '../components/BookDetails';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/book1s', {
                    // headers: {
                    //     Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual access token
                    // },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBooks(data.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleBookClick = (book) => {
        setSelectedBook(book);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (books.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div className="container">
            <BookList books={books} onBookClick={handleBookClick} />
            <BookDetails selectedBook={selectedBook} />
        </div>
    );
};

export default Home;
