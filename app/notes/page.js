import React from "react";
import axios from "axios";
import Book from "../class/[slug]/note"; // Correct import statement

export default async function Page({ params }) {
  const { slug } = params;

  const {
    data: { data: axiosData },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/classes?populate=jsonbooks.Cover_picture&sort=id:asc`
  );

  if (!axiosData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-2">
      {axiosData.map((Class) => (
        <div key={Class.id} className="m-xl">
          {Class.attributes.jsonbooks?.data.length > 1 && (
            <>
              <h1 className="text-lg font-bold text-[#6c6a06]">
                {Class.attributes.Class_name}
              </h1>
              <div className="">
                <Book books={Class.attributes.jsonbooks.data} />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
