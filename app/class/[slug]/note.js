import Link from "next/link";

export default function page({ books }) {
  return (
    <>
      <div className="flex flex-wrap ml-2 ">
        {books.map((book, index) => (
          <Link
            className="block hover:-translate-y-2"
            key={book.id}
            href={`/note/${book.id}/1`}
          >
            <div
              key={book.id}
              className="border border-black m-1 h-[200px] w-[150px] rounded-md  bg-yellow-200 overflow-hidden"
            >
              {book.attributes.Cover_picture?.data && (
                <img
                  key={book.id}
                  src={book.attributes.Cover_picture.data[0].attributes.url}
                  alt={`Cover for ${book.attributes.book_Name}`}
                  style={{ width: "150px", height: "200px" }}
                />
              )}
            </div>
            <h2 className="font-bold text-center text-[#587c1f] w-[125px]">
              {book.attributes.book_name}
            </h2>
          </Link>
        ))}
      </div>
    </>
  );
}
