"use client";
import React, { useEffect, useState } from "react";
import MCQ from "./mcq";
import LessonContent from "./lessonContent/lessonContent";
import QA from "./qa";
import { MdOutlineFullscreen, MdFullscreenExit } from "react-icons/md";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import Video from "./video";

const LessonPage = ({ lesson, lessonCounter, unitName }) => {
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(".fullscreen");

    elements.forEach((element) => {
      if (toggled) {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }
    });

    return () => {
      elements.forEach((element) => {
        element.style.display = "block";
      });
    };
  }, [toggled]);

  const [toggled1, setToggled1] = useState(true);

  useEffect(() => {
    const element = document.getElementById("booksidebar");
    if (element) {
      if (toggled1) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }

    return () => {
      if (element) {
        element.style.display = "none";
      }
    };
  }, [toggled1]);

  let lessonContent = {};

  if (lesson.lesson_content === "") {
    lessonContent = {}; // Handle empty lesson_content case
  } else {
    try {
      lessonContent = JSON.parse(lesson.lesson_content);
    } catch (error) {
      lessonContent = {}; // Default empty object or handle accordingly
      console.error("Failed to parse lesson content:", error, lessonContent);
    }
  }

  return (
    <div
      key={lesson.id}
      className=" p-0 m-0 overflow-y-scroll w-full h-full"
      id={`lesson-${lessonCounter}`}
    >
      <div className="top-0 flex justify-between z-50 sticky bg-orange-300">
        <div>
          <button
            className=""
            onClick={() => {
              setToggled1(!toggled1);
            }}
          >
            {toggled1 ? <GoSidebarExpand /> : <GoSidebarCollapse />}
          </button>
          <span className="text-lg font-semibold ml-2">{unitName}</span>
        </div>
        <span className="text-center font-bold text-2xl font-sans uppercase">
          {lessonCounter}. {lesson.Lesson_name}
        </span>
        <button
          className="mr-2 text-2xl"
          onClick={() => {
            setToggled(!toggled);
          }}
        >
          {toggled ? <MdOutlineFullscreen /> : <MdFullscreenExit />}
        </button>
      </div>
      {lesson.video_url.length > 0 && <Video video_url={lesson.video_url} />}

      {/* <div className='h-full' style={{ width: '100%', overflow: 'scroll' }}> */}
      {/* <LessonContent lessonContent={JSON.parse(lesson.lesson_content)} /> */}
      <LessonContent lessonContent={lessonContent} />
      {lesson.MCQ.length > 0 && (
        <>
          <h2 className="text-center text-3xl"> Multiple Choice Questions</h2>
          <MCQ MCQ={lesson.MCQ} />
        </>
      )}
      {lesson.Question_answer.length > 0 && (
        <>
          <h2 className="text-center font-semibold m-2 text-3xl">
            Question Answers
          </h2>
          <QA Question_answer={lesson.Question_answer} />
        </>
      )}

      {/* </div> */}
    </div>
  );

  //   })
  //       }
  //     </>
  //   );
};

export default LessonPage;
