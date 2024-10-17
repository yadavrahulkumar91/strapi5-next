// "use client";

// import React, { useState, useEffect } from "react";
import SidebarUnit from "./sidebarUnit";
export default function SideBar({ unit, activeLesson, slug }) {
  let lessonCounter = 1;

  return (
    <div>
      <div
        id="booksidebar"
        className="h-full overflow-y-scroll w-[200px] fullscreen"
      >
        <ol className="p-0">
          {unit.map((unit1, index) => (
            <>
              <SidebarUnit
                unit={unit1}
                activeLesson={activeLesson}
                lessonCounter={lessonCounter}
                slug={slug}
              />
              <span className="hidden">
                {(lessonCounter = lessonCounter + unit1.Lesson.length)}
              </span>
            </>
          ))}
        </ol>
      </div>
    </div>
  );
}
