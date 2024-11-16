"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function SidebarUnit({ unit, lessonCounter, slug }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleLessonClick = (lessonId) => {
    // router.push(`/note/${slug}/${lessonId}`);
    router.push(`/note/${slug}/${lessonId}`, { scroll: false });
  };

  return (
    <div key={unit.id} className="pl-2">
      <li
        className="text-lg font-semibold whitespace-nowrap list-inside cursor-pointer"
        style={{
          listStyleType: "upper-alpha",
          // color: open ? "blue" : "black",
          fontWeight: open ? "normal" : "bold",
        }}
        onClick={() => setOpen(!open)}
      >
        {unit.Unit_name}
      </li>

      {unit.Lesson.map((lesson, i) => {
        const lessonId = lessonCounter + i; // Compute the lesson ID

        return open ? (
          <div
            key={lesson.id} // Use lesson.id for the key instead of index
            className="cursor-pointer whitespace-nowrap hover:underline mx-4"
            onClick={() => handleLessonClick(lessonId)} // Call the click handler
            id={lessonId.toString()}
          >
            {lessonId}. {lesson.Lesson_name}
          </div>
        ) : null;
      })}
    </div>
  );
}

export default SidebarUnit;
