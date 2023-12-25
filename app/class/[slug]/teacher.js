import react from 'react';
import Link from 'next/link';

export default async function page ({ books })  {

    return (
        <div className='border border-black border-solid flex flex-wrap rounded-md'>
            {books.map((book, index) => (
                <Link key={book.id} href={`/teacher/${book.id}`}>
                    <div key={book.id} className='border border-black border-dashed m-1 rounded-md'>
                        <h2>{book.attributes.Teacher_name}</h2>
                        {book.attributes.Profile_picture?.data?.attributes?.url && (
                            <img
                                key={book.id}
                                src={book.attributes.Profile_picture.data.attributes.url}
                                alt={`Cover for ${book.attributes.Book_Name}`}
                                style={{ width: '50px', height: 'auto' }}
                                className='rounded-md'
                            />
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
};

