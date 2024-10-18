// "use client";

// import React, { useState, useEffect } from "react";
import SidebarUnit from "./sidebarUnit";
export default function SideBar({ unit, slug }) {
  let lessonCounter = 1;

  return (
    <ol className="h-full overflow-y-scroll fullscreen">
      {unit.map((unit1, index) => (
        <div key={unit1.id}>
          <SidebarUnit unit={unit1} lessonCounter={lessonCounter} slug={slug} />
          <span className="hidden">
            {(lessonCounter = lessonCounter + unit1.Lesson.length)}
          </span>
        </div>
      ))}
    </ol>
  );
}
