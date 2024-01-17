import Link from 'next/link';

export default async function page ({ books }) {

    return (
        <div className='border border-black border-solid flex flex-wrap rounded-md my-1'>
            <h1>Practicals</h1>
            {books.map((book, index) => (
                <Link key={book.id} href={`/practical/${book.id}`} className='border border-black border-dashed m-1 rounded-md'>
                    <div key={book.id}  >
                        <h2>{book.attributes.Name}</h2>
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

