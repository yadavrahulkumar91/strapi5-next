"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Note from "./[slug1]/layout";

export default function Unit({ slug }) {
  const router = useRouter();

  useEffect(() => {
    // Navigate to the specified route when the component mounts
    router.push(`/note/${slug}/1`); // Adjust the path as needed
  }, [slug]); // Dependency array includes slug

  let slug1 = 1;
  return (
    // <div>
    //   <p>Loading...</p>
    // </div>
    <Note params={{ slug, slug1 }} />
  );
}
