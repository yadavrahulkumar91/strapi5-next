"use client";
import React from "react";
// import MathJax from 'react-mathjax'
import Mermaid from "./mermaid";
import Image from "./image";
import Table from "./table";
import Html from "./html";
import Note from "./note";
import Bullet from "./bullet";
import OrgChart from "./OrgChart";
import MCQ from "../mcq";
import QA from "../qa";
import AROC from "./aroc";
import Visio from "./visio";
import Arrays from "./array";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import Content from "./content";

const replaceMathExpressions = (obj) => {
  if (typeof obj === "string") {
    // Replace \( ... \) with inline MathJax component
    obj = obj.replace(/\\\\((.*?)\\\\)/g, (match, p1) => {
      return `<MathJax>{"\\\\(${p1}\\\\)"}</MathJax>`;
    });

    // Replace \[ ... \] with display MathJax component
    obj = obj.replace(/\\\\[(.*?)\\\\]/g, (match, p1) => {
      return `<MathJax>{"\\\\[${p1}\\\\]"}</MathJax>`;
    });
  } else if (typeof obj === "object" && obj !== null) {
    // If it's an object or array, recursively process its properties
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = replaceMathExpressions(obj[key]);
      }
    }
  }
  return obj;
};

const LessonContent = ({ lessonContent }) => {
  const processedLessonContent = replaceMathExpressions(lessonContent);

  return (
    <MathJaxContext>{renderAttributes(processedLessonContent)}</MathJaxContext>
  );
};

export default LessonContent;

export const renderAttributes = (attributes, level = 0, arrayLevel = 1) => {
  return (
    <div className="ml-[-30px]">
      {renderAttributes1(attributes, level, arrayLevel)}
    </div>
  );
};

export const renderAttributes1 = (attributes, level, arrayLevel) => {
  if (!attributes) {
    return null;
  }

  if (Array.isArray(attributes)) {
    return (
      <div className="ml-[30px]">
        <Arrays attributes={attributes} level={level} arrayLevel={arrayLevel} />
      </div>
    );
  } else if (typeof attributes === "object") {
    return Object.entries(attributes).map(([key, value]) => {
      return (
        <div key={key} className="ml-[30px]">
          {renderObject(key, value, level, arrayLevel)}
        </div>
      );
    });
  } else {
    return (
      <div
        className="text-[20px] mx-2 ml-[30px]"
        dangerouslySetInnerHTML={{ __html: attributes }}
      >
        {/* {attributes} */}
      </div>
    );
  }
};

function renderObject(key, value, level, arrayLevel) {
  if (/^__image\d*$/.test(key)) {
    return <Image value={value} />;
  } else if (/^__table\d*$/.test(key)) {
    return <Table value={value} />;
  } else if (/^__c\d*$/.test(key)) {
    return <Content lessonContent={value} />;
  } else if (/^__mermaid\d*$/.test(key)) {
    return <Mermaid value={value} />;
  } else if (key === "google_chart") {
    return <></>;
  } else if (/^__html\d*$/.test(key) || key === "html") {
    return <Html value={value} />;
  } else if (/^__note\d*$/.test(key)) {
    return <Note value={value} />;
  } else if (/^__levelup\d*$/.test(key)) {
    return renderAttributes1(value, (level = level + 1));
  } else if (/^__null\d*$/.test(key)) {
    return renderAttributes(value, level, arrayLevel);
  } else if (/^__nulll\d*$/.test(key)) {
    return (
      <div className="ml-[-30px]">
        {renderAttributes(value, level - 1, arrayLevel)}
      </div>
    );
  } else if (/^__bullet\d*$/.test(key)) {
    return <Bullet value={value} />;
  } else if (/^__org\d*$/.test(key)) {
    return <OrgChart value={value} />;
  } else if (/^__mcq\d*$/.test(key)) {
    return <MCQ MCQ={value} />;
  } else if (/^__qa\d*$/.test(key)) {
    return <QA Question_answer={value} />;
  } else if (/^__gap\d*$/.test(key)) {
    return <div style={{ height: value }} />;
  } else if (/^__visio\d*$/.test(key)) {
    return <Visio url={value} />;
  } else if (/^__right\d*$/.test(key)) {
    return (
      <div className="relative left-[800px] w-[300px]">
        {elseFunction("", value.data, level)}
      </div>
    );
  } else {
    return elseFunction(key, value, level, arrayLevel);
  }
}

function elseFunction(key, value, level, arrayLevel) {
  return (
    <div key={key} className="">
      {renderKey(key, level)}
      {typeof value === "object" ? (
        renderAttributes1(value, level + 1, arrayLevel)
      ) : (
        <span
          className=" inline-block"
          key={key}
          style={{ fontSize: "20px" }}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      )}
    </div>
  );
}

function renderKey(key, level) {
  return (
    <span
      style={{
        // color: `hsl(330, 50%, ${level * 10}%)`,
        color: "white",
        backgroundColor: `hsl(208, 100%, ${(level + 1) * 10}%)`,
        // backgroundColor: `hsl(356, 100%, ${(level + 1) * 10}%)`,
        // backgroundColor: level === 0 ? "lightgrey" : null,
        // backgroundColor: "lightgrey",
        fontWeight: `${800 - Math.min(level, 4) * 100}`,
        // fontWeight: "600",
        // display: level === 0 ? "block" : null,
        display: "block",
        top: `${level * 30}px`, // Adjust top offset based on hierarchy
        zIndex: `${100 - level}`, // Higher levels have higher z-index
      }}
      className={`font-medium text-xl align-top my-[2px] sticky top-0 pl-2`}
    >
      {formatKey(key, level)}
    </span>
  );

  // return (
  //   <span
  //     style={{
  //       backgroundColor: "lightgrey",
  //       fontWeight: "600",
  //       display: "block",
  //       top: `${level * 30}px`, // Adjust top offset based on hierarchy
  //       zIndex: `${100 - level}`, // Higher levels have higher z-index
  //     }}
  //     className={`font-medium text-xl align-top my-[2px] sticky py-0`}
  //   >
  //     {formatKey(key, level)}
  //   </span>
  // );
}
function formatKey(key, level) {
  let formattedKey = key;
  if (level === 0) {
    formattedKey = formattedKey.toUpperCase();
  }
  if (key === "") {
    return null;
  }
  return (
    <div className="" dangerouslySetInnerHTML={{ __html: formattedKey }} />
  );
}

// function formatBulletin(level) {
//   const bulletChars = ["▢", "❖", "◉", "◈", "■", "●", "⟣", "➢", "⬦", "○"];
//   const bullet = bulletChars[Math.min(level, bulletChars.length - 1)];
//   return <span>{bullet} </span>;
// }
