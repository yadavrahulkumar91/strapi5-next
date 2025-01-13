import React from "react";
import Unit from "./page";
// import CoverPage from "./CoverPage";
// import ContentPage from "./ContentPage";
// import Sidebar from "./sidebar";

import axios from "axios";

// export async function generateStaticParams() {
//   const {
//     data: { data: axiosData },
//   } = await axios.get(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jsonbooks?populate=unit.Lesson`
//   );

//   const params = [];

//   // Iterate through the fetched data to get all slugs and lessons
//   axiosData.forEach((book) => {
//     const bookSlug = book.id.toString();
//     var lessonCounter1 = 1;
//     // Iterate through units and lessons for each book
//     book.attributes.unit.forEach((unit, u) => {
//       unit.Lesson.forEach((lesson, i) => {
//         const lessonSlug = (lessonCounter1++).toString(); // Create slug1 based on the lesson's index
//         params.push({
//           slug: bookSlug, // book id
//           slug1: lessonSlug, // lesson number
//         });
//       });
//     });
//   });

//   return params;
// }

export default async function Page({ params }) {
  const { slug, slug1 } = params;

  const {
    data: { data: axiosData },
  } = await axios.get(`http://127.0.0.1:3000/api/json/${slug}`);
  // const {
  //   data: { data: axiosData },
  // } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jsonbooks/${slug}?populate=unit.Lesson.MCQ.Asked_year,unit.Lesson.Question_answer.Asked_year,unit.Lesson.Question_answer.Marks,unit.Lesson.video_url`
  // );
  console.log(axiosData);
  if (!axiosData) {
    return <div>Loading...</div>;
  }

  const { attributes } = axiosData;
  const { unit } = attributes;

  // Find the correct lesson based on the slug1 number
  let lessonCounter = 1;
  let selectedLesson = null;
  let unitName = ""; // Store the unit name

  for (let i = 0; i < unit.length; i++) {
    const { Lesson, Unit_name } = unit[i];
    for (let j = 0; j < Lesson.length; j++) {
      if (lessonCounter === parseInt(slug1)) {
        selectedLesson = Lesson[j];
        unitName = Unit_name; // Assign the unit name when the lesson is found
        break;
      }
      lessonCounter++;
    }
    if (selectedLesson) break;
  }

  if (!selectedLesson) {
    return <div>Lesson not found</div>;
  }

  const totalLessons = unit.reduce(
    (sum, unit1) => sum + unit1.Lesson.length,
    0
  );
  const activeLesson = parseInt(slug1);
  return (
    <div className="box-border h-full w-auto">
      {/* // <div className="flex"> */}
      <Unit
        key={selectedLesson.id}
        unit={unit}
        lesson={selectedLesson}
        unitName={unitName} // Use the unit name here
        activeLesson={activeLesson}
        totalLessons={totalLessons}
        slug={slug}
        slug1={slug1}
      />
    </div>
  );
}
