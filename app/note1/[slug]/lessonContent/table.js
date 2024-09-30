// import React from 'react'
// import { renderAttributes } from './lessonContent'

// export default function Table ({ value }) {
//   return (
//     <div>
//       {value && Array.isArray(value) && value.length > 0
//         ? value.map((table, tableIndex) => (
//             <table className="m-2 " key={tableIndex} border="1">
//               {table.caption ? (
//                 <caption className="text-base">
//                   <span> Table: </span>
//                   <span
//                     dangerouslySetInnerHTML={{ __html: table.caption }}
//                   />
//                 </caption>
//               ) : null}

//               <tbody>
//                 {table.data.map((row, rowIndex) => (
//                   <tr key={rowIndex}>
//                     {row.map((cell, cellIndex) =>
//                       rowIndex === 0 ? (
//                         <th
//                           className="border border-blue-600 bg-blue-300"
//                           key={cellIndex}
//                         >
//                           {renderAttributes(cell, table.level ?? 2)}
//                         </th>
//                       ) : (
//                         <td
//                           className="border border-blue-400 bg-blue-50"
//                           key={cellIndex}
//                         >
//                           {renderAttributes(cell, table.level ?? 2)}
//                         </td>
//                       )
//                     )}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ))
//         : null}
//     </div>
//   );
// }

import React from "react";
import { renderAttributes } from "./lessonContent";

export default function Table({ value }) {
  const computeSpan = (tableData) => {
    const spans = tableData.map((row) =>
      row.map(() => ({ colspan: 1, rowspan: 1, skip: false }))
    );

    for (let rowIndex = 0; rowIndex < tableData.length; rowIndex++) {
      for (
        let colIndex = 0;
        colIndex < tableData[rowIndex].length;
        colIndex++
      ) {
        const cell = tableData[rowIndex][colIndex];

        if (spans[rowIndex][colIndex].skip) {
          continue; // Skip if part of a previously calculated span
        }

        // Apply rowspan logic: If this cell has "  " below it, increase its rowspan.
        if (
          rowIndex < tableData.length - 1 &&
          tableData[rowIndex + 1][colIndex] === "  "
        ) {
          let rowspan = 1;
          let nextRowIndex = rowIndex + 1;

          while (
            nextRowIndex < tableData.length &&
            tableData[nextRowIndex][colIndex] === "  "
          ) {
            rowspan++;
            spans[nextRowIndex][colIndex].skip = true; // Mark cells below as skipped
            nextRowIndex++;
          }

          spans[rowIndex][colIndex].rowspan = rowspan; // Apply rowspan to the current cell
        }

        // Apply colspan logic: If a cell is followed by " ", increase the colspan of the current cell.
        if (
          colIndex < tableData[rowIndex].length - 1 &&
          tableData[rowIndex][colIndex + 1] === " "
        ) {
          let colspan = 1;
          let nextColIndex = colIndex + 1;

          while (
            nextColIndex < tableData[rowIndex].length &&
            tableData[rowIndex][nextColIndex] === " "
          ) {
            colspan++;
            spans[rowIndex][nextColIndex].skip = true; // Mark cells to the right as skipped
            nextColIndex++;
          }

          spans[rowIndex][colIndex].colspan = colspan; // Apply colspan to the current cell
        }
      }
    }

    return spans;
  };

  return (
    <div>
      {value && Array.isArray(value) && value.length > 0
        ? value.map((table, tableIndex) => {
            const spans = computeSpan(table.data); // Compute the spans for this table

            return (
              <>
                <table className="m-2" key={tableIndex} border="1">
                  {table.caption ? (
                    <caption className="text-base">
                      <span>Table: </span>
                      <span
                        dangerouslySetInnerHTML={{ __html: table.caption }}
                      />
                    </caption>
                  ) : null}

                  <tbody>
                    {table.data.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => {
                          const { colspan, rowspan, skip } =
                            spans[rowIndex][cellIndex];

                          if (skip) return null; // Skip cell if it's part of a colspan or rowspan

                          if (rowIndex === 0) {
                            return (
                              <th
                                className="border border-blue-600 bg-blue-300"
                                key={cellIndex}
                                colSpan={colspan}
                                rowSpan={rowspan}
                              >
                                {renderAttributes(cell, table.level ?? 2)}
                              </th>
                            );
                          } else {
                            return (
                              <td
                                className="border border-blue-400 bg-blue-50"
                                key={cellIndex}
                                colSpan={colspan}
                                rowSpan={rowspan}
                              >
                                {renderAttributes(cell, table.level ?? 2)}
                              </td>
                            );
                          }
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {table.about ?? renderAttributes(table.about, table.level ?? 2)}
              </>
            );
          })
        : null}
    </div>
  );
}
