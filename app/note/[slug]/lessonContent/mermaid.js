"use client";
import React from "react";
import { Mermaid } from "mdx-mermaid/Mermaid";

export default function MermaidCharts({ value }) {
  function assignUniqueIds(data, startId = 1) {
    let currentId = startId;
    const idData = data.map((item) => {
      if (Array.isArray(item)) {
        const [newIdData, newStartId] = assignUniqueIds(item, currentId);
        currentId = newStartId;
        return newIdData;
      }
      return { id: currentId++, label: item };
    });
    return [idData, currentId];
  }

  function generateChartWithLastItemLinking(data) {
    let chartLines = [];

    function processArrayWithIds(idData, parent = null) {
      for (let i = 0; i < idData.length; i++) {
        const item = idData[i];

        // If it's an array, recursively process its contents
        if (Array.isArray(item)) {
          // processArrayWithIds(item, idData[i - 1].id);
          processArrayWithIds(item, parent); // Link to the last processed element

          function processLastItem(idData, item) {
            const lastItem = item[item.length - 1];
            if (Array.isArray(lastItem)) {
              for (let k = item.length - 1; Array.isArray(item[k]); k--) {
                processLastItem(idData, item[k]);
              }
            } else {
              for (let j = i; j < idData.length; j++) {
                if (!Array.isArray(idData[j])) {
                  chartLines.push(
                    `${lastItem.id} --> ${idData[j].id}[${idData[j].label}]`
                  );
                  break;
                }
              }
            }
          }

          processLastItem(idData, item);
        } else {
          if (Array.isArray(idData[i - 1])) {
            parent = null;
          }
          if (parent !== null) {
            chartLines.push(
              `${parent.id}[${parent.label}] --> ${item.id}[${item.label}]`
            );
          }
          parent = item;
        }
      }
    }

    const [idData] = assignUniqueIds(data); // Get the ID-mapped data
    processArrayWithIds(idData); // Generate links based on IDs

    return chartLines;
  }

  if (!value || !Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <>
      {value.map((chartObject, index) => {
        const { type, data, caption } = chartObject; // Destructure caption as well

        if (type === "graph TD" && Array.isArray(data) && data.length > 0) {
          const chartLines = generateChartWithLastItemLinking(data);
          const mermaidChart = [type, ...chartLines].join("\n");

          return (
            <div key={index}>
              <Mermaid chart={mermaidChart} />
              {caption && (
                <p style={{ textAlign: "center", marginTop: "" }}>{caption}</p>
              )}
            </div>
          );
        } else if (Array.isArray(data) && data.length > 0) {
          const mermaidChart = data.join("\n");
          return (
            <div key={index}>
              <Mermaid chart={mermaidChart} />
              {caption && (
                <span style={{ textAlign: "center", marginTop: "" }}>
                  {caption}
                </span>
              )}
            </div>
          );
        }

        return null;
      })}
    </>
  );
}

// const { type, data } = chartObject;

// if (type === "graph TD" && Array.isArray(data) && data.length > 0) {
//   const mermaidChart = [
//     type,
//     ...data.map(
//       (item, i) => `${String.fromCharCode(65 + i)}["${i + 1}) ${item}"]`
//     ),
//     ...data
//       .slice(0, -1)
//       .map(
//         (_, i) =>
//           `${String.fromCharCode(65 + i)} --> ${String.fromCharCode(
//             66 + i
//           )}`
//       ),
//   ].join("\n");

//   return <Mermaid key={index} chart={mermaidChart} />;
