// "use client";
// import { useState } from "react";
// import { AskedYear } from "./qa";
// import { BsEye, BsEyeSlash } from "react-icons/bs";

// const YourMCQPage = ({ MCQ }) => {
//   return (
//     <div className="box-border w-full text-xl">
//       {MCQ.map((item, index) => {
//         const [qu, a, b, c, d, ans, sol, askedYears] = item;

//         return (
//           <McqComponent
//             key={index}
//             index={index}
//             qu={qu}
//             options={{ a, b, c, d }}
//             ans={ans}
//             sol={sol}
//             askedYears={askedYears}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default YourMCQPage;

// export function McqComponent({ index, qu, options, ans, sol, askedYears }) {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isCorrect, setIsCorrect] = useState(null);
//   const [isSolutionVisible, setIsSolutionVisible] = useState(false);

//   const handleOptionClick = (optionKey) => {
//     setSelectedOption(optionKey);
//     setIsCorrect(optionKey === ans);
//   };

//   const toggleSolution = () => {
//     setIsSolutionVisible(!isSolutionVisible);
//   };

//   return (
//     <div className="border border-solid border-fuchsia-500 bg-fuchsia-50 rounded-lg my-2 overflow-hidden m-1">
//       <div className="flex justify-between bg-fuchsia-300">
//         <span className="flex pl-1">
//           <span className="mr-1">{index + 1}. </span>
//           <span dangerouslySetInnerHTML={{ __html: qu }} />
//         </span>
//         <span>
//           {askedYears?.length > 0
//             ? AskedYear(askedYears.map((y) => ({ Asked_year: y })))
//             : null}
//         </span>
//       </div>

//       <ul className="ml-3 lg:grid lg:grid-cols-[50%,50%]">
//         {["a", "b", "c", "d"].map((key) => (
//           <li
//             key={key}
//             className={`border border-fuchsia-500 rounded-lg m-2 mx-4 px-2 focus:bg-fuchsia-300 cursor-pointer ${
//               selectedOption === key
//                 ? isCorrect
//                   ? "bg-green-300"
//                   : "bg-red-300"
//                 : ""
//             }`}
//             onClick={() => handleOptionClick(key)}
//             style={{ listStyleType: "lower-alpha" }}
//             dangerouslySetInnerHTML={{ __html: options[key] }}
//           />
//         ))}
//       </ul>

//       <div className="bg-fuchsia-100">
//         <button onClick={toggleSolution} className="inline m-2">
//           {isSolutionVisible ? <BsEyeSlash /> : <BsEye />}
//         </button>
//         <span className={`${isSolutionVisible ? "" : "hidden"}`}>
//           (<span dangerouslySetInnerHTML={{ __html: ans }} />){" "}
//           <span dangerouslySetInnerHTML={{ __html: sol }} />
//         </span>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { AskedYear } from "./qa";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const YourMCQPage = ({ MCQ }) => {
  // Filter out invalid MCQs (those not having exactly 8 items)
  const validMCQs = MCQ.filter((item, index) => {
    const isValid = item.length === 8;
    if (!isValid) {
      console.warn(`Invalid MCQ at index ${index}:`, item);
    }
    return isValid;
  });

  return (
    <div className="box-border w-full text-xl">
      {validMCQs.map((item, index) => {
        const [qu, a, b, c, d, ans, sol, askedYears] = item;

        return (
          <McqComponent
            key={index}
            index={index}
            qu={qu}
            options={{ a, b, c, d }}
            ans={ans}
            sol={sol}
            askedYears={askedYears}
          />
        );
      })}
    </div>
  );
};

export default YourMCQPage;

export function McqComponent({ index, qu, options, ans, sol, askedYears }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isSolutionVisible, setIsSolutionVisible] = useState(false);

  const handleOptionClick = (optionKey) => {
    setSelectedOption(optionKey);
    setIsCorrect(optionKey === ans);
  };

  const toggleSolution = () => {
    setIsSolutionVisible(!isSolutionVisible);
  };

  return (
    <div className="border border-solid border-fuchsia-500 bg-fuchsia-50 rounded-lg my-2 overflow-hidden m-1">
      <div className="flex justify-between bg-fuchsia-300">
        <span className="flex pl-1">
          <span className="mr-1">{index + 1}. </span>
          <span dangerouslySetInnerHTML={{ __html: qu }} />
        </span>
        <span>
          {/* {askedYears?.length > 0
            ? AskedYear(askedYears.map((y) => ({ Asked_year: y })))
            : null} */}
          {askedYears.length > 0 && <AskedYear years={askedYears} />}
        </span>
      </div>

      <ul className="ml-3 lg:grid lg:grid-cols-[50%,50%]">
        {["a", "b", "c", "d"].map((key) => (
          <li
            key={key}
            className={`border border-fuchsia-500 rounded-lg m-2 mx-4 px-2 focus:bg-fuchsia-300 cursor-pointer ${
              selectedOption === key
                ? isCorrect
                  ? "bg-green-300"
                  : "bg-red-300"
                : ""
            }`}
            onClick={() => handleOptionClick(key)}
            style={{ listStyleType: "lower-alpha" }}
            dangerouslySetInnerHTML={{ __html: options[key] }}
          />
        ))}
      </ul>

      <div className="bg-fuchsia-100">
        <button onClick={toggleSolution} className="inline m-2">
          {isSolutionVisible ? <BsEyeSlash /> : <BsEye />}
        </button>
        <span className={`${isSolutionVisible ? "" : "hidden"}`}>
          (<span dangerouslySetInnerHTML={{ __html: ans }} />){" "}
          <span dangerouslySetInnerHTML={{ __html: sol }} />
        </span>
      </div>
    </div>
  );
}
