import React from "react";

import { renderAttributes1 } from "./lessonContent";
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
          return renderAttributes1(value, level + 1, arrayLevel + 1);
        } else {
          return (
            <li key={i} className="flex text-xl">
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
    // <ol
    //   className=""
    //   style={{ listStyleType: getListStyleType(arrayLevel, numberType) }}
    // >
    //   {listItems.map((value, i) => {
    //     if (typeof value === "object") {
    //       return renderAttributes1(value, level + 1, arrayLevel + 1);
    //     } else {
    //       return (
    //         <li key={i} className="text-xl ml-[20px]">
    //           <span dangerouslySetInnerHTML={{ __html: value }} />
    //         </li>
    //       );
    //     }
    //   })}
    // </ol>
    <ol
      className=""
      style={{ listStyleType: getListStyleType(arrayLevel, numberType) }}
    >
      {listItems.map((value, i) => {
        if (typeof value === "object") {
          // Ensure that each object also has a unique key
          return (
            <span key={i}>
              {renderAttributes1(value, level + 1, arrayLevel + 1)}
            </span>
          );
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
function renderParagraph(attributes, level, arrayLevel) {
  const indentValue = attributes[0]?.indent || 0; // Get the indent value from attributes[0], default to 0 if not available
  const listItems = attributes.slice(1);

  return (
    <>
      {listItems.map((value, i) => {
        if (typeof value === "object") {
          return renderAttributes1(value, level + 1, arrayLevel + 1);
        } else {
          return (
            <p
              className="my-2"
              key={i}
              style={{
                textIndent: `${indentValue}px`,
                textAlign: "justify",
                textJustify: "interWord",
              }}
            >
              {renderAttributes1(value, level + 1, arrayLevel + 1)}
              {/* <span dangerouslySetInnerHTML={{ __html: value }} /> */}
            </p>
          );
        }
      })}
    </>
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

export default function RenderArray({ attributes, level, arrayLevel }) {
  // Check if the first item is an object containing __type
  if (typeof attributes[0] === "object" && attributes[0].__type) {
    const listType = attributes[0].__type;

    if (listType === "bullet") {
      return renderBulletList(attributes, level, arrayLevel);
    } else if (listType === "number") {
      return renderNumberList(attributes, level, arrayLevel);
    } else if (listType === "p") {
      return renderParagraph(attributes, level, arrayLevel);
    }
  }

  // If the first item is not an object with __type, fall back to default numbered list
  return renderNumberList(attributes, level, arrayLevel);
}
