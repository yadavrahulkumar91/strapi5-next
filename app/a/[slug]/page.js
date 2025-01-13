import React from "react";
// import Unit from "./page";

import axios from "axios";

// export async function generateStaticParams() {
//   const {
//     data: { data: axiosData },
//   } = await axios.get(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jsonbooks?populate=unit.Lesson`
//   );

//   const params = [];

//   axiosData.forEach((book) => {
//     const bookSlug = book.id.toString();
//     var lessonCounter1 = 1;
//     book.attributes.unit.forEach((unit, u) => {
//       unit.Lesson.forEach((lesson, i) => {
//         const lessonSlug = (lessonCounter1++).toString();
//         params.push({
//           slug: bookSlug,
//           slug1: lessonSlug,
//         });
//       });
//     });
//   });

//   return params;
// }

export default async function Page({ params }) {
  const { slug } = params;

  const axiosData = await axios.get(`http://127.0.0.1:3000/api/json/${slug}`);
  //   const {
  //     data: { data: axiosData },
  //   } = await axios.get(`/api/json/${slug}`);

  console.log(axiosData);

  //   if (!axiosData) {
  //     return <div>Loading...</div>;
  //   }

  //   const { attributes } = axiosData;
  //   const { unit } = attributes;

  //   let lessonCounter = 1;
  //   let selectedLesson = null;
  //   let unitName = "";

  //   for (let i = 0; i < unit.length; i++) {
  //     const { Lesson, Unit_name } = unit[i];
  //     for (let j = 0; j < Lesson.length; j++) {
  //       if (lessonCounter === parseInt(slug1)) {
  //         selectedLesson = Lesson[j];
  //         unitName = Unit_name;
  //         break;
  //       }
  //       lessonCounter++;
  //     }
  //     if (selectedLesson) break;
  //   }

  //   if (!selectedLesson) {
  //     return <div>Lesson not found</div>;
  //   }

  //   const totalLessons = unit.reduce(
  //     (sum, unit1) => sum + unit1.Lesson.length,
  //     0
  //   );
  //   const activeLesson = parseInt(slug1);
  return (
    <div className="box-border h-full w-auto">
      {/* <Unit
        key={selectedLesson.id}
        unit={unit}
        lesson={selectedLesson}
        unitName={unitName} 
        activeLesson={activeLesson}
        totalLessons={totalLessons}
        slug={slug}
        slug1={slug1}
      /> */}
    </div>
  );
}
