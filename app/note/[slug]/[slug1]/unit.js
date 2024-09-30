"use client";
import React from "react";

import Sidebar from "../sidebar";
import LessonPage from "./lesson";
import { useRouter } from "next/navigation";

// Inside your component

export default function Unit({
  lesson,
  unit,
  unitName,
  activeLesson,
  totalLessons,
  slug,
  slug1,
}) {
  const router = useRouter();
  const handlePrevLesson = () => {
    if (activeLesson > 1) {
      router.push(`/note/${slug}/${activeLesson - 1}`); // Adjust the path as needed
    }
  };

  const handleNextLesson = () => {
    if (activeLesson < totalLessons) {
      router.push(`/note/${slug}/${activeLesson + 1}`); // Adjust the path as needed
    }
  };

  return (
    <div className="box-border flex w-full h-full">
      <Sidebar unit={unit} activeLesson={activeLesson} slug={slug} />
      <button
        className="text-2xl p-0 border-2 w-5 fullscreen"
        onClick={handlePrevLesson}
        disabled={activeLesson <= 1}
      >
        ⯇
      </button>

      <LessonPage
        lesson={lesson}
        unitName={unitName} // Use the unit name here
        lessonCounter={activeLesson} // Use slug1 as the lesson number
      />

      <button
        className="text-xl p-0 border-2 w-5 right-0 fullscreen"
        onClick={handleNextLesson}
        disabled={activeLesson >= totalLessons}
      >
        ⯈
      </button>
    </div>
  );
}
