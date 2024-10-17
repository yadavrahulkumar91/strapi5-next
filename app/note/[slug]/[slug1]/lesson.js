"use client";
import React, { useEffect, useState } from "react";
import MCQ from "../mcq";
import LessonContent from "../lessonContent/lessonContent";
import QA from "../qa";
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
  // console.log(lesson);
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
      style={{
        borderRadius: "1%",
      }}
      id={`lesson-${lessonCounter}`}
    >
      <div className="top-0 flex justify-between z-50 backdrop-blur-sm sticky bg-orange-300">
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
      {lesson.video_url.length > 0 && (
        // <div
        //   style={{
        //     position: "relative",
        //     paddingBottom: "56.25%",
        //     height: 0,
        //     overflow: "hidden",
        //     maxWidth: "100%",
        //     backgroundColor: "#000",
        //   }}
        // >
        //   <iframe
        //     src={lesson.video_url}
        //     title="YouTube video player"
        //     style={{
        //       position: "absolute",
        //       top: 0,
        //       left: 0,
        //       width: "100%",
        //       height: "100%",
        //     }}
        //     frameBorder="0"
        //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        //     referrerPolicy="strict-origin-when-cross-origin"
        //     allowFullScreen
        //   ></iframe>
        // </div>
        <Video video_url={lesson.video_url} />
      )}

      {/* <div className='h-full' style={{ width: '100%', overflow: 'scroll' }}> */}
      {/* <LessonContent lessonContent={JSON.parse(lesson.lesson_content)} /> */}
      <LessonContent lessonContent={lessonContent} />

      <h2 style={{ backgroundColor: "grey", border: "2px solid black" }}>
        Multiple Choice Questions
      </h2>
      {/* <MCQ MCQ={lesson.MCQ} /> */}

      <h2 style={{ backgroundColor: "grey", border: "2px solid black" }}>
        Question Answers
      </h2>
      {/* <QA Question_answer={lesson.Question_answer} /> */}
      {/* </div> */}
    </div>
  );

  //   })
  //       }
  //     </>
  //   );
};

export default LessonPage;
