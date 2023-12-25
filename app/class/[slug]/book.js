
import Link from 'next/link';

export default function page ({ books }) {
  
    return (
        <div className='border border-black border-solid flex flex-wrap rounded-md my-1'>
            {books.map((book, index) => (
                <Link key={book.id} href={`/book/${book.id}`}>
                    <div key={book.id} className='border border-black border-dashed m-1 rounded-md'>
                    <h2>{book.attributes.Book_Name}</h2>
                        {book.attributes.Cover_picture?.data?.attributes?.url && (
                            <img
                                key={book.id}
                                src={book.attributes.Cover_picture.data.attributes.url}
                                alt={`Cover for ${book.attributes.Book_Name}`}
                                style={{ width: '50px', height: 'auto' }}
                            />
                        )}
                </div>
                </Link>
            ))}
        </div>
    );
};
