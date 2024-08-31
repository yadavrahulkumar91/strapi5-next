import react from 'react';
import Link from 'next/link';

export default async function page ({ books })  {

    return (
      <div className="flex flex-wrap ml-2 ">
        {books.map((book, index) => (
          <Link key={book.id} href={`/teacher/${book.id}`}>
            <div key={book.id} className="m-1 w-[200px]">
              {book.attributes.Profile_picture?.data?.attributes?.url && (
                <img
                  key={book.id}
                  src={book.attributes.Profile_picture.data.attributes.url}
                  alt={`Cover for ${book.attributes.Book_Name}`}
                  style={{ width: "150px", height: "150px" }}
                  className="m-auto rounded-full"
                />
              )}
              <h2 className="text-center text-lg text-[#587c1f]">
                {book.attributes.Teacher_name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    );
};

