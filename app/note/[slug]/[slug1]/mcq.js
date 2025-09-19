"use client";
import { useState } from "react";
import { AskedYear } from "./qa";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";

const YourMCQPage = ({ MCQ }) => {
  return (
    <div className="box-border w-full text-xl">
      {MCQ.map((mcq, index) => McqComponent(mcq, index))}
    </div>
  );
};

export default YourMCQPage;

export function McqComponent(mcq, index) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isSolutionVisible, setIsSolutionVisible] = useState(false);

  const handleOptionClick = (optionKey) => {
    setSelectedOption(optionKey);
    setIsCorrect(optionKey === mcq.ans);
  };

  const toggleSolution = () => {
    setIsSolutionVisible(!isSolutionVisible);
  };

  return (
    <div
      key={index}
      className="border border-solid border-fuchsia-500 bg-fuchsia-50 rounded-lg my-2 overflow-hidden m-1"
    >
      <div className="flex justify-between bg-fuchsia-300">
        <span className="flex pl-1">
          <span className="mr-1">{index + 1}. </span>
          <span dangerouslySetInnerHTML={{ __html: mcq.qu }} />
        </span>
        <span>
          {mcq.Asked_year
            ? mcq.Asked_year.length > 0
              ? AskedYear(mcq.Asked_year)
              : null
            : null}
        </span>
      </div>

      <ul className="ml-3 lg:grid lg:grid-cols-[50%,50%]">
        {["a", "b", "c", "d"].map((optionKey) => (
          <li
            key={optionKey}
            className={`border border-fuchsia-500 rounded-lg m-2 mx-4 px-2 focus:bg-fuchsia-300 cursor-pointer ${
              selectedOption === optionKey
                ? isCorrect
                  ? "bg-green-300"
                  : "bg-red-300"
                : ""
            }`}
            onClick={() => handleOptionClick(optionKey)}
            style={{ listStyleType: "lower-alpha" }}
            dangerouslySetInnerHTML={{ __html: mcq[optionKey] }}
          />
        ))}
      </ul>

      <div className="bg-fuchsia-100">
        <button onClick={toggleSolution} className="inline m-2">
          {isSolutionVisible ? <BsEyeSlash /> : <BsEye />}
        </button>
        <span className={` ${isSolutionVisible ? "" : "hidden"}`}>
          (<span dangerouslySetInnerHTML={{ __html: mcq.ans }} />){" "}
          <span dangerouslySetInnerHTML={{ __html: mcq.sol }} />
        </span>
      </div>
    </div>
  );
}
