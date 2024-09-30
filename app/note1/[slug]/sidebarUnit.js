"use client";
import React, { useState } from "react";

function SidebarUnit({ unit, setActiveLesson, lessonCounter }) {
  const [open, setOpen] = useState(true);

  return (
    <div key={unit.id} className="pl-2">
      <li
        className="text-lg font-semibold whitespace-nowrap list-inside"
        style={{ listStyleType: "upper-alpha" }}
      >
        {unit.Unit_name}{" "}
        <button onClick={() => setOpen(!open)}>{open ? "-" : "+"}</button>
      </li>
      {unit.Lesson.map((lesson, i) =>
        open ? (
          <div
            key={i}
            className="cursor-pointer whitespace-nowrap hover:underline  mx-4"
            id={lessonCounter + i}
            onClick={(e) => setActiveLesson(parseInt(e.target.id, 10))}
          >
            {lessonCounter + i}. {lesson.Lesson_name}
          </div>
        ) : null
      )}
    </div>
  );
}

export default SidebarUnit;
