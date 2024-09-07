import React from "react";
import axios from "axios";
import Teacher from "../class/[slug]/teacher"; // Correct import statement

export default async function Page({ params }) {
  const { slug } = params;

  const {
    data: { data: axiosData },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/classes?populate=teachers.Profile_picture&sort=id:asc`
  );

  if (!axiosData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-2">
      {axiosData.map(
        (Class) =>
          Class.attributes.teachers.data.length > 0 && (
            <div key={Class.id} className="m-xl">
              <h1 className="text-2xl block text-[#a68d65]">
                {Class.attributes.Class_name}
              </h1>
              <div className="">
                <Teacher books={Class.attributes.teachers.data} />
              </div>
            </div>
          )
      )}
    </div>
  );
}
