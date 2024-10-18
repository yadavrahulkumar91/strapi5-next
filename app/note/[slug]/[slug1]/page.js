"use client";
import React, { useEffect } from "react";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

// import Sidebar from "../sidebar";
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
      router.push(`/note/${slug}/${activeLesson - 1}`, { scroll: false }); // Adjust the path as needed
    }
  };

  const handleNextLesson = () => {
    if (activeLesson < totalLessons) {
      router.push(`/note/${slug}/${activeLesson + 1}`, { scroll: false }); // Adjust the path as needed
    }
  };

  useEffect(() => {
    const element = document.getElementById(activeLesson);

    if (element) {
      element.style.color = "red"; // Set the color of the active lesson
    }

    return () => {
      const cleanupElement = document.getElementById(activeLesson); // Re-fetch element during cleanup
      if (cleanupElement) {
        cleanupElement.style.color = "black"; // Reset the color when the component unmounts or updates
      }
    };
  }, [activeLesson]);

  return (
    <div className="box-border relative w-full h-full">
      <button
        className="text-lg p-0 top-1/2 left-[-4px] fullscreen absolute z-50"
        onClick={handlePrevLesson}
        disabled={activeLesson <= 1}
      >
        <GrPrevious />
      </button>

      <LessonPage
        lesson={lesson}
        unitName={unitName} // Use the unit name here
        lessonCounter={activeLesson} // Use slug1 as the lesson number
      />

      <button
        className="text-lg p-0 right-1 top-1/2 fullscreen absolute"
        onClick={handleNextLesson}
        disabled={activeLesson >= totalLessons}
      >
        <GrNext />
      </button>
    </div>
  );
}
