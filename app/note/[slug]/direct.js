"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Unit({ slug }) {
  const router = useRouter();

  useEffect(() => {
    // Navigate to the specified route when the component mounts
    router.push(`/note/${slug}/1`); // Adjust the path as needed
  }, [slug]); // Dependency array includes slug

  return (
    <div>
      {/* You can add any content or loading indicator here if needed */}
      <p>Loading...</p>
    </div>
  );
}
