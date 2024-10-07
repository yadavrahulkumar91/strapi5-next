"use client";
import React from "react";
import { Mermaid } from "mdx-mermaid/Mermaid";

export default function MermaidCharts({ value }) {
  const generateChartData = (
    data,
    parent = null,
    nodeIndexRef = { index: 1 },
    lastItemRefs = {
      lastItems: [],
      inNested: false,
      childLevel: 0,
      parentLevel: 0,
    },
    level = 0
  ) => {
    let chartLines = [];
    let currentLevel = level;

    data.forEach((item, index) => {
      if (Array.isArray(item)) {
        lastItemRefs.childLevel++;
        // Recursively process the nested array, passing the current parent
        lastItemRefs.inNested = true;
        currentLevel = level + 1;
        let childChartLines = generateChartData(
          item,
          parent,
          nodeIndexRef,
          lastItemRefs,
          currentLevel
        );

        chartLines.push(...childChartLines);

        lastItemRefs.inNested = false; // Reset after processing nested array
      } else {
        let currentNode = nodeIndexRef.index++;
        lastItemRefs.parentLevel++;
        lastItemRefs.childLevel++;

        // If in a nested array, store the last item of the nested level
        if (lastItemRefs.inNested && index === data.length - 1) {
          lastItemRefs.lastItems.push(currentNode);
        }

        // If not the last item, link all stored last items to the current node
        if (level == currentLevel - 1 && lastItemRefs.lastItems.length > 0) {
          lastItemRefs.lastItems.forEach((lastItem) => {
            chartLines.push(`${lastItem} --> ${currentNode}`);
          });
          lastItemRefs.lastItems.length = 0; // Clear after linking
        } else {
          if (parent) {
            chartLines.push(`${parent} --> ${currentNode}`);
          }
        }

        chartLines.push(`${currentNode}[${item}]`);
        parent = currentNode; // Update parent to the current node
      }
    });

    return chartLines;
  };

  const generateChartWithLastItemLinking = (data) => {
    let nodeIndexRef = { index: 1 };
    let lastItemRefs = { lastItems: [] };
    let level = 0;
    let chartLines = generateChartData(
      data,
      null,
      nodeIndexRef,
      lastItemRefs,
      level
    );

    return chartLines;
  };

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
              {caption && <p style={{ textAlign: "center" }}>{caption}</p>}
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
