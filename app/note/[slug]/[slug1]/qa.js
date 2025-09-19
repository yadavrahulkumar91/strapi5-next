// import React from "react";

// export default function QA({ Question_answer }) {
//   return Question_answer.map((qa) => (
//     <div key={qa.id}>
//       <div
//         id={`qa-${qa.id}`}
//         style={{ display: "flex", backgroundColor: "lightgrey" }}
//       >
//         <span>
//           <p style={{ marginLeft: " 5px", marginRight: "5px" }}>Q.</p>
//         </span>
//         <span dangerouslySetInnerHTML={{ __html: qa.Question }} />
//         <span style={{ display: "flex", justifyContent: "flex-end" }}>
//           {qa.Marks.length > 0 ? marks(qa.Marks) : null}
//           {qa.Asked_year.length > 0 ? Askyear(qa.Asked_year) : null}
//         </span>
//       </div>

//       <div style={{ display: "flex" }}>
//         <span>
//           <p style={{ marginLeft: " 5px", marginRight: "5px" }}>➤</p>{" "}
//         </span>
//         <span dangerouslySetInnerHTML={{ __html: qa.Answer }} />
//       </div>
//     </div>
//   ));
// }

// export function Askyear(years) {
//   return (
//     <p>
//       [
//       {years.map((year, index) => (
//         <span id={`qa-${index}`} key={year.id}>
//           {year.Asked_year}
//           {index < years.length - 1 && ", "}
//         </span>
//       ))}
//       ]
//     </p>
//   );
// }

// function marks(marks) {
//   const totalMarks = marks.reduce((sum, mark) => sum + mark.Mark, 0);
//   return (
//     <p>
//       (
//       {marks.map((mark, index) => (
//         <span key={mark.id}>
//           {mark.Mark}
//           {index < marks.length - 1 && " + "}
//         </span>
//       ))}
//       = {totalMarks})
//     </p>
//   );
// }
import React from "react";
import Content from "./lessonContent/content";

export default function QA({ Question_answer }) {
  const validMCQs = Question_answer.filter((item, index) => {
    const isValid = item.length === 4;
    if (!isValid) {
      console.warn(`Invalid MCQ at index ${index}:`, item);
    }
    return isValid;
  });

  return validMCQs.map((qa, index) => {
    const [question, answer, mark, askedYears] = qa;

    return (
      <div key={index} className="text-xl">
        <div
          id={`qa-${index}`}
          style={{ display: "flex", backgroundColor: "lightgrey" }}
        >
          <span>
            <p style={{ marginLeft: "5px", marginRight: "5px" }}>
              {index + 1}.
            </p>
          </span>
          <span>
            <Content lessonContent={question} />
          </span>
          <span style={{ display: "flex", justifyContent: "flex-end" }}>
            {mark && <Marks mark={mark} />}
            {askedYears.length > 0 && <AskedYear years={askedYears} />}
          </span>
        </div>

        <div style={{ display: "flex" }}>
          <span>
            <p style={{ marginLeft: "5px", marginRight: "5px" }}>➤</p>
          </span>
          <Content lessonContent={answer} />
        </div>
      </div>
    );
  });
}

export function AskedYear({ years }) {
  return (
    <p>
      [
      {years.map((year, index) => (
        <span key={index}>
          {year}
          {index < years.length - 1 && ", "}
        </span>
      ))}
      ]
    </p>
  );
}

function Marks({ mark }) {
  return <p>({mark})</p>;
}
