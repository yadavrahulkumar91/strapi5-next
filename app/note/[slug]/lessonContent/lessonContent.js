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

// let qaId = 0
// let mcqId = 0

const LessonContent = ({ lessonContent }) => {
  // const jsonLessonContent = JSON.parse(lessonContent)
  // window.MathJax = {
  //   tex: {
  //     inlineMath: [
  //       ['$', '$'],
  //       ['\\(', '\\)']
  //     ]
  //   },
  //   svg: {
  //     fontCache: 'global'
  //   }
  // }
  // ;(function () {
  //   var script = document.createElement('script')
  //   script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js'
  //   script.async = true
  //   document.head.appendChild(script)
  // })()

  //   }
  // }, [])

  return <div className="ml-[-30px] ">{renderAttributes(lessonContent)}</div>;
};

export default LessonContent;

export const renderAttributes = (attributes, level = 0, arrayLevel = 1) => {
  if (!attributes) {
    return null;
  }

  if (Array.isArray(attributes)) {
    return (
      <div className="ml-[30px]">
        {renderArray(attributes, level, arrayLevel)}
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
        className="text-[20px] mx-2"
        dangerouslySetInnerHTML={{ __html: attributes }}
      >
        {/* {attributes} */}
      </div>
    );
  }
};

// function renderArray(attributes, level) {
//   return (
//     <ol className=" max-w-[60%]">
//       {attributes.map((value, i) => {
//         if (typeof value === "object") {
//           return renderAttributes(value, level + 1);
//         } else {
//           return (
//             <li className="list-decimal list-outside text-xl ml-[20px]" key={i}>
//               <span dangerouslySetInnerHTML={{ __html: value }} />
//             </li>
//           );
//         }
//       })}
//     </ol>
//   );
// }

function getListStyle(arrayLevel) {
  switch (arrayLevel) {
    case 1:
      return { listStyleType: "decimal" }; // 1, 2, 3
    case 2:
      return { listStyleType: "lower-alpha" }; // a, b, c
    case 3:
      return { listStyleType: "lower-roman" }; // i, ii, iii
    case 4:
      return { listStyleType: "upper-roman" }; // I, II, III
    default:
      return { listStyleType: "disc" }; // fallback for deeper levels
  }
}

function renderArray(attributes, level, arrayLevel) {
  return (
    <ol style={{ ...getListStyle(arrayLevel) }} className="max-w-[60%]">
      {attributes.map((value, i) => {
        if (typeof value === "object") {
          return renderAttributes(value, level + 1, arrayLevel + 1);
        } else {
          return (
            <li key={i} className="text-xl ml-[20px]">
              <span dangerouslySetInnerHTML={{ __html: value }} />
            </li>
          );
        }
      })}
    </ol>
  );
}

function renderObject(key, value, level, arrayLevel) {
  if (/^__image\d*$/.test(key)) {
    return <Image value={value} />;
  } else if (/^__table\d*$/.test(key)) {
    return <Table value={value} />;
  } else if (/^__mermaid\d*$/.test(key)) {
    return <Mermaid value={value} />;
  } else if (key === "google_chart") {
    return <></>;
  } else if (/^__html\d*$/.test(key) || key === "html") {
    return <Html value={value} />;
  } else if (/^__note\d*$/.test(key)) {
    return <Note value={value} />;
  } else if (/^__levelup\d*$/.test(key)) {
    return renderAttributes(value, (level = level + 1));
  } else if (/^__p\d*$/.test(key)) {
    return renderAttributes(value, level, arrayLevel);
    // } else if (/^__p\d*$/.test(key)) {
    //   return (
    //     <p className="text-[20px]" dangerouslySetInnerHTML={{ __html: value }} />
    //   );
  } else if (/^__bullet\d*$/.test(key)) {
    return <Bullet value={value} />;
  } else if (/^__org\d*$/.test(key)) {
    return <OrgChart value={value} />;
    // } else if (/^__org\d*$/.test(key)) {
    //   return <AROC value={value} />
  } else if (/^__mcq\d*$/.test(key)) {
    return <MCQ MCQ={value} />;
  } else if (/^__qa\d*$/.test(key)) {
    return <QA Question_answer={value} />;
  } else if (/^__gap\d*$/.test(key)) {
    return <div style={{ height: value }} />;
  } else if (/^__right\d*$/.test(key)) {
    return (
      // <div className='h-8'>
      <div className="relative left-[800px] w-[300px]">
        {elseFunction("", value.data, level)}
      </div>
      // </div>
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
        renderAttributes(value, level + 1, arrayLevel)
      ) : (
        <span
          className="max-w-[60%] inline-block"
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
        color: `hsl(330, 50%, ${level * 10}%)`,
        backgroundColor: level === 0 ? "lightgrey" : null,
        fontWeight: `${800 - Math.min(level, 4) * 100}`, // Caps the level at 4
        display: level === 0 ? "block" : null,
      }}
      className={`font-medium text-xl align-top`}
    >
      {formatBulletin(level)} {formatKey(key, level)}
    </span>
  );
}

function formatBulletin(level) {
  const bulletChars = ["▢", "❖", "◉", "◈", "■", "●", "⟣", "➢", "⬦", "○"]; // Define bullet characters array
  const bullet = bulletChars[Math.min(level, bulletChars.length - 1)]; // Pick character or fallback to last one
  return <span>{bullet} </span>;
}

function formatKey(key, level) {
  let formattedKey = key;
  if (level === 0) {
    formattedKey = formattedKey.toUpperCase();
  }
  if (key === "") {
    return null;
  }
  return <span dangerouslySetInnerHTML={{ __html: formattedKey + ": " }} />;
}
