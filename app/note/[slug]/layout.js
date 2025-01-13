import React from "react";
import Page from "./page";
import Sidebar from "./sidebar";
import axios from "axios";

// export async function generateStaticParams() {
//   const {
//     data: { data: axiosData },
//   } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jsonbooks`);

//   const params = [];

//   // Iterate through the fetched data to get all slugs and lessons
//   axiosData.forEach((book) => {
//     const bookSlug = book.id.toString();
//     params.push({
//       slug: bookSlug, // book id
//     });
//   });

//   return params;
// }

async function Layout({ children, params }) {
  const { slug } = params;
  // const {
  //   data: { data: axiosData },
  // } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jsonbooks/${slug}?populate=unit.Lesson`
  // );
  const {
    data: { data: axiosData },
  } = await axios.get(`${process.env.FRONTEND_URL}/api/json/${slug}`);

  if (!axiosData) {
    return <div>Loading...</div>;
  }

  const { attributes } = axiosData;
  const { unit } = attributes;

  return (
    <div className="box-border flex w-screen h-full">
      <div id="booksidebar" className="w-[15%]">
        <Sidebar unit={unit} slug={slug} />
      </div>
      <div className="w-auto min-w-[85%]">{children}</div>
    </div>
  );
}

export default Layout;
