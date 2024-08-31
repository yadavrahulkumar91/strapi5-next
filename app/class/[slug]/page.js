import React from "react";

import Book from "./book";
import Syllabus from "./syllabus";
import Teacher from "./teacher";
import Practical from "./practical";
import Jsonbook from "./note";
import axios from "axios";

export async function generateStaticParams() {
  const {
    data: { data: axiosData },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/classes?populate=*&pagination[pageSize]=200`
  );
  // const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/classes?populate=classes.books,books,Profile_picture&sort=id:asc`);

  return axiosData.map((data) => ({
    slug: data.id.toString(),
  }));
}

export default async function Page({ params }) {
  const { slug } = params;

  const {
    data: { data: axiosData },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/classes/${slug}?populate=teachers.Profile_picture,books.Cover_picture,practicals.Cover_picture,syllabi,jsonbooks.Cover_picture`
  );

  if (!axiosData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-3">
      <h1 className="text-center text-2xl font-bold text-[#b0893c]">
        {axiosData.attributes.Class_name}{" "}
      </h1>

      {/* {axiosData.attributes.books?.data && <Book books={axiosData.attributes.books.data} />} */}
      {axiosData.attributes.jsonbooks.data.length > 1 && (
        <>
          <div className="my-1">
            <h1 className="text-2xl block text-[#a68d65]">Courses</h1>
            <Jsonbook books={axiosData.attributes.jsonbooks.data} />
          </div>
        </>
      )}
      {axiosData.attributes.syllabi.data.length > 1 && (
        <>
          <Syllabus books={axiosData.attributes.syllabi.data} />
        </>
      )}
      {axiosData.attributes.practicals.data.length > 1 && (
        <>
          <Practical books={axiosData.attributes.practicals.data} />
        </>
      )}
      {axiosData.attributes.teachers.data.length > 1 && (
        <>
          <div className="my-1">
            <h1 className="text-2xl block text-[#a68d65]">Tutors</h1>
            <Teacher books={axiosData.attributes.teachers.data} />
          </div>
        </>
      )}

      {/* <h1>Other Study Resorces</h1>
        <Link href={axiosData.attributes.onedrive_url} target="_blank" rel="noopener noreferrer" className="folderIcon">
            <div className="folder">
                <div className="front"></div>
                <div className="back"></div>
            </div>
            <span className="folderText">OneDrive</span>
        </Link> */}
    </div>
  );
}
