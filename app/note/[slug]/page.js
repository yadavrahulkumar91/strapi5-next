import React from "react";
import axios from "axios";

import Direct from "./direct";
// export async function generateStaticParams() {
//   const {
//     data: { data: axiosData },
//   } = await axios.get(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jsonbooks?populate=classes.jsonbooks,jsonbooks,Profile_picture`
//   );

//   return axiosData.map((data) => ({
//     slug: data.id.toString(),
//   }));
// }

export default async function Page({ params }) {
  const { slug } = params;

  return (
    <>
      <Direct slug={slug} />
    </>
  );
}
