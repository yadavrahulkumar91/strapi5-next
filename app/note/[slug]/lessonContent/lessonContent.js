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
import { MathJaxContext, MathJax } from "better-react-mathjax";

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
  // Step 1: Process lessonContent to replace math expressions
  const processedLessonContent = replaceMathExpressions(lessonContent);

  // Step 2: Wrap the processed content inside MathJaxContext and pass to renderAttributes
  return (
    <MathJaxContext>
      <div className="ml-[-30px] ">
        {renderAttributes(processedLessonContent)}
      </div>
    </MathJaxContext>
  );
};

export default LessonContent;

// const LessonContent = ({ lessonContent }) => {
//   return <div className="ml-[-30px] ">{renderAttributes(lessonContent)}</div>;
// };

// export default LessonContent;

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
//     <ol className=" ">
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

// function renderArray(attributes, level, arrayLevel) {
//   return (
//     <ol style={{ ...getListStyle(arrayLevel) }} className="">
//       {attributes.map((value, i) => {
// if (typeof value === "object") {
//   return renderAttributes(value, level + 1, arrayLevel + 1);
// } else {
//   return (
//     <li key={i} className="text-xl ml-[20px]">
//       <span dangerouslySetInnerHTML={{ __html: value }} />
//     </li>
//   );
// }
//       })}
//     </ol>
//   );
// }

// function getCustomListStyle(arrayLevel, listTypeData, type) {
//   // listTypeData contains custom styles like ["A", "I", "1", "a", "i"] or ["•", "◦", "➢", "a", "i"]
//   // type is either "number" or "bullet"
//   if (type === "number") {
//     switch (arrayLevel) {
//       case 1:
//         return { listStyleType: listTypeData[2] || "decimal" }; // Default to "1"
//       case 2:
//         return { listStyleType: listTypeData[3] || "lower-alpha" }; // Default to "a"
//       case 3:
//         return { listStyleType: listTypeData[4] || "lower-roman" }; // Default to "i"
//       case 4:
//         return { listStyleType: listTypeData[1] || "upper-roman" }; // Default to "I"
//       default:
//         return { listStyleType: "decimal" }; // Fallback
//     }
//   } else if (type === "bullet") {
//     return { listStyleType: listTypeData[arrayLevel - 1] || "disc" }; // Custom bullet styles
//   } else {
//     return getListStyle(arrayLevel); // Fallback to default if type is not valid
//   }
// }

// function renderArray(attributes, level, arrayLevel) {
//   // Check if the first item is an object containing __type and data
//   let listType = null;
//   let customListData = [];

//   if (
//     typeof attributes[0] === "object" &&
//     attributes[0].__type &&
//     Array.isArray(attributes[0].data)
//   ) {
//     listType = attributes[0].__type; // "number" or "bullet"
//     customListData = attributes[0].data; // Custom numbering or bulleting styles
//     attributes = attributes.slice(1); // Remove the first item from the array for rendering
//   }

//   return (
//     <ol
//       style={{
//         ...getCustomListStyle(arrayLevel, customListData, listType),
//       }}
//       className=""
//     >
//       {attributes.map((value, i) => {
//         if (typeof value === "object") {
//           return renderAttributes(value, level + 1, arrayLevel + 1);
//         } else {
//           return (
//             <li key={i} className="text-xl ml-[20px]">
//               <span dangerouslySetInnerHTML={{ __html: value }} />
//             </li>
//           );
//         }
//       })}
//     </ol>
//   );
// }
function renderBulletList(attributes, level, arrayLevel) {
  const bulletType =
    attributes[0]?.__type === "bullet" ? attributes[0]?.data : null;
  // const listItems = Array.isArray(attributes[0]?.data)
  //   ? attributes.slice(1)
  //   : attributes;
  const listItems = attributes.slice(1);

  return (
    <ul className="">
      {listItems.map((value, i) => {
        if (typeof value === "object") {
          return renderAttributes(value, level + 1, arrayLevel + 1);
        } else {
          return (
            <li key={i} className="flex text-xl ml-[20px]">
              <span className="mr-2">
                {bulletType && bulletType[arrayLevel - 1] ? (
                  <div>{bulletType[arrayLevel - 1]}</div>
                ) : (
                  <div>•</div> // Default bullet type
                )}
              </span>
              <span dangerouslySetInnerHTML={{ __html: value }} />
            </li>
          );
        }
      })}
    </ul>
  );
}

function renderNumberList(attributes, level, arrayLevel) {
  const numberType =
    attributes[0]?.__type === "number" ? attributes[0]?.data : null;
  const listItems = Array.isArray(attributes[0]?.data)
    ? attributes.slice(1)
    : attributes;

  return (
    <ol
      className=""
      style={{ listStyleType: getListStyleType(arrayLevel, numberType) }}
    >
      {listItems.map((value, i) => {
        // <li key={i} className="text-xl ml-[20px]">
        //   <span>
        //     {typeof value === "object"
        //       ? renderAttributes(value, level + 1, level + 1)
        //       : value}
        //   </span>
        // </li>

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

function getListStyleType(arrayLevel, numberType) {
  if (!numberType) {
    // Default numbering system if no custom `data` provided
    return getListStyle(arrayLevel).listStyleType;
  }

  // Custom number formatting if `data` is provided
  switch (arrayLevel) {
    case 1:
      return numberType[0] || "decimal"; // Default to "1"
    case 2:
      return numberType[1] || "lower-alpha"; // Default to "a"
    case 3:
      return numberType[2] || "lower-roman"; // Default to "i"
    case 4:
      return numberType[3] || "upper-roman"; // Default to "I"
    default:
      return "decimal"; // Fallback
  }
}

function renderArray(attributes, level, arrayLevel) {
  // Check if the first item is an object containing __type
  if (typeof attributes[0] === "object" && attributes[0].__type) {
    const listType = attributes[0].__type;

    if (listType === "bullet") {
      return renderBulletList(attributes, level, arrayLevel);
    } else if (listType === "number") {
      return renderNumberList(attributes, level, arrayLevel);
    }
  }

  // If the first item is not an object with __type, fall back to default numbered list
  return renderNumberList(attributes, level, arrayLevel);
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
