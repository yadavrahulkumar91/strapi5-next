"use client";
import React, { useEffect, useState } from "react";
import MCQ from "./mcq";
import LessonContent from "./lessonContent/lessonContent";
import QA from "./qa";
import { MdOutlineFullscreen, MdFullscreenExit } from "react-icons/md";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

const LessonPage = ({ lessons, lessonCounter, unitName }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.MathJax = {
        tex: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
        },
        svg: {
          fontCache: "global",
        },
      };
      (function () {
        var script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
        script.async = true;
        document.head.appendChild(script);
      })();
    }
  }, []);

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
        element.style.display = "block"; // Cleanup or reset if needed
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
        element.style.display = "none"; // Cleanup or reset if needed
      }
    };
  }, [toggled1]);

  return (
    <>
      {lessons.map((lesson, i) => {
        let lessonContent = {};

        try {
          lessonContent = JSON.parse(lesson.lesson_content);
        } catch (error) {
          console.error("Failed to parse lesson content:", error);
          // Optionally, you can set lessonContent to some default value or show an error message
          lessonContent = {}; // Default empty object or handle accordingly
        }
        return (
          <div
            key={lesson.id}
            className="lesson p-0 m-0 overflow-y-scroll w-full h-full"
            style={{
              borderRadius: "1%",
            }}
            id={`lesson-${lessonCounter + i}`}
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
                {lessonCounter + i}. {lesson.Lesson_name}
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
            {lesson.video_url && (
              <iframe
                // width='100%'
                // height='100vh'
                src={lesson.video_url}
                frameBorder="0"
                allowFullScreen
                // style={{ width: '100%', height: '60vh' }}
              ></iframe>
            )}

            {/* <div className='h-full' style={{ width: '100%', overflow: 'scroll' }}> */}
            {/* <LessonContent lessonContent={JSON.parse(lesson.lesson_content)} /> */}
            <LessonContent lessonContent={lessonContent} />

            <h2 style={{ backgroundColor: "grey", border: "2px solid black" }}>
              Multiple Choice Questions
            </h2>
            <MCQ MCQ={lesson.MCQ} />

            <h2 style={{ backgroundColor: "grey", border: "2px solid black" }}>
              Question Answers
            </h2>
            <QA Question_answer={lesson.Question_answer} />
            {/* </div> */}
          </div>
        );
      })}
    </>
  );
};

export default LessonPage;
