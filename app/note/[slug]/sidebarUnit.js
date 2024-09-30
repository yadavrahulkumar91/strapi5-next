"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function SidebarUnit({ unit, activeLesson, lessonCounter, slug }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleLessonClick = (lessonId) => {
    router.push(`/note/${slug}/${lessonId}`); // Update this path accordingly
  };

  return (
    <div key={unit.id} className="pl-2">
      <li
        className="text-lg font-semibold whitespace-nowrap list-inside"
        style={{ listStyleType: "upper-alpha" }}
      >
        {unit.Unit_name}{" "}
        <button onClick={() => setOpen(!open)}>{open ? "-" : "+"}</button>
      </li>
      {unit.Lesson.map((lesson, i) => {
        const lessonId = lessonCounter + i; // Compute the lesson ID

        return open ? (
          <div
            key={lesson.id} // Use lesson.id for the key instead of index
            className={`cursor-pointer whitespace-nowrap hover:underline mx-4 ${
              activeLesson === lessonId ? "text-red-500" : ""
            }`}
            onClick={() => handleLessonClick(lessonId)} // Call the click handler
          >
            {lessonId}. {lesson.Lesson_name}
          </div>
        ) : null;
      })}
    </div>
  );
}

export default SidebarUnit;
