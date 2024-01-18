// import React from 'react';
// import ReactMarkdown from 'react-markdown';
// import rehypeRaw from 'rehype-raw'
// import rehypeKatex from 'rehype-katex'
// import remarkMath from 'remark-math'
// import remarkGfm from 'remark-gfm'
// import axios from 'axios';

// export async function generateStaticParams() {
//     const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/teachers/?populate=*`);

//     return axiosData.map((data) => ({
//         slug: data.id.toString(),
//     }));
// }


// export default async function page ({ params }) {
//     const { slug } = params;

//     const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/teachers/${slug}?populate=classes.books,books`);

//     if (!axiosData) {
//         return <div>Loading...</div>;
//     }

//     const {
//         id,
//         attributes: {
//             Teacher_name,
//             Telephone,
//             Description,
//             Email_Address,
//             Profile_picture,
//             classes,
//             books,
//         },
//     } = axiosData;

//     return (
//         <div>
//             {Profile_picture && (
//                 <img
//                     src={Profile_picture.data.attributes.url}
//                     alt={Profile_picture.data.attributes.name}
//                     width={300}
//                 />
//             )}
//             <h1>{Teacher_name}</h1>

//             <p>Telephone: {Telephone || 'Not provided'}</p>
//             <p>Email Address: {Email_Address || 'Not provided'}</p>
//             <h2>Classes Taught:</h2>
//             <ul>
//                 {classes.data.map((cls) => (
//                     const classBooks = cls.data.attributes.books.data;
//                     {classBooks.map((classBook)=>(
//                         {books.data.map((book) =>(
//                             <ul>
//                                 ((book.id === classBook.id) &&   <li key={book.id}>{book.attributes.Book_Name}</li>)
//                             </ul>
//                         ))}
//                     ))}
//                     <>
//                     <li key={cls.id}>{cls.attributes.Class_name}</li>
//                     </>
//                 ))}
//             </ul>

//             <ul>
//                 {books.data.map((cls) => (
//                     <li key={cls.id}>{cls.attributes.Book_Name}</li>
//                 ))}
//             </ul>

//             <h2>Description:            </h2>
//             <ReactMarkdown remarkPlugins={[remarkMath, [remarkGfm, { singleTilde: false }]]} rehypePlugins={[rehypeRaw, rehypeKatex]} >

//                 {Description || 'Not provided'}
//             </ReactMarkdown>



//             {/* Display Profile Picture */}

//             {/* Display Classes */}
//         </div>
//     );
// };




import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import axios from 'axios';

// export async function generateStaticParams() {
//     const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/teachers/?populate=classes.books,books,Profile_picture`);

//     return axiosData.map((data) => ({
//         slug: data.id.toString(),
//     }));
// }

export default async function  Page({ params }) {
    const { slug } = params;

    const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/teachers/${slug}?populate=classes.books,books,Profile_picture`);

    if (!axiosData) {
        return <div>Loading...</div>;
    }

    const {
        id,
        attributes: {
            Teacher_name,
            Telephone,
            Description,
            Email_Address,
            Profile_picture,
            classes,
            books,
        },
    } = axiosData;

    return (
        <div>
            {Profile_picture && (
                <img
                    src={Profile_picture.data.attributes.url}
                    alt={Profile_picture.data.attributes.name}
                    width={300}
                />
            )}
            <h1>{Teacher_name}</h1>

            <p>Telephone: {Telephone || 'Not provided'}</p>
            <p>Email Address: {Email_Address || 'Not provided'}</p>
            <h2>Classes Taught:</h2>
            <ul>
                {classes.data.map((cls) => (
                    <div key={cls.id}>
                        <li>{cls.attributes.Class_name}</li>
                        <ul>
                            {cls.attributes.books.data.map((classBook) => (
                                books.data.map((book) => (
                                    (book.id === classBook.id) && <li key={book.id}>{book.attributes.Book_name_id}</li>
                                ))
                            ))}
                        </ul>
                    </div>
                ))}
            </ul>

            <h2>Books:</h2>
            <ul>
                {books.data.map((cls) => (
                    <li key={cls.id}>{cls.attributes.Book_Name}</li>
                ))}
            </ul>

            <h2>Description:</h2>
            <ReactMarkdown remarkPlugins={[remarkMath, [remarkGfm, { singleTilde: false }]]} rehypePlugins={[rehypeRaw, rehypeKatex]}>
                {Description || 'Not provided'}
            </ReactMarkdown>
        </div>
    );
}
