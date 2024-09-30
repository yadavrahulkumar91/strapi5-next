"use client";
import React, { useState, useEffect } from "react";
import LessonPage from "./[slug1]/page";
import Sidebar from "./sidebar";

export default function Unit({ units }) {
  let lessonCounter = 1;
  // const [activeLesson, setActiveLesson] = useState(1);

  // useEffect(() => {
  //   const element = document.getElementById("lesson-" + activeLesson);
  //   if (element) {
  //     element.style.display = "block";
  //   }
  //   const element1 = document.getElementById(activeLesson);
  //   if (element1) {
  //     element1.style.color = "red";
  //   }
  //   return () => {
  //     if (element) {
  //       element.style.display = "none"; // Cleanup or reset if needed
  //     }
  //     const element1 = document.getElementById(activeLesson);
  //     if (element1) {
  //       element1.style.color = "black";
  //     }
  //   };
  // }, [activeLesson]);

  return (
    <div className="box-border flex w-full h-full">
      {/* <Sidebar units={units} setActiveLesson={setActiveLesson} /> */}
      {/* <button
        className="text-2xl p-0 border-2 w-5 fullscreen"
        onClick={() => setActiveLesson(activeLesson - 1)}
        disabled={activeLesson <= 1}
      >
        ⯇
      </button> */}
      {unit.map((unit, u) => (
        <span key={u}>
          <p>Hi</p>
          {unit.Lesson.map((lesson, l) => (
            <>
              <p>Hello</p>
              <LessonPage
                key={lesson.id}
                lesson={lesson}
                unitName={unit.Unit_name}
                lessonCounter={lessonCounter++}
              />
            </>
          ))}
        </span>
      ))}

      {/* <button
        className="text-xl p-0 border-2 w-5 right-0 fullscreen"
        onClick={() => setActiveLesson(activeLesson + 1)}
        disabled={
          activeLesson >=
          units.reduce((sum, unit) => sum + unit.Lesson.length, 0)
        }
      >
        ⯈
      </button> */}
    </div>
  );
}
