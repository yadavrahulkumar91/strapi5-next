// import React from 'react'
// import { Mermaid } from 'mdx-mermaid/Mermaid'

// export default function mermaid ({value}) {

//     return (value && Array.isArray(value) && value.length > 0) ? (
//             value.map((chartObject, index) => {
//                 const { type, data } = chartObject;

//                 if (type === 'graph TD' && Array.isArray(data) && data.length > 0) {
//                     const mermaidChart = [
//                         type,
//                         ...data.map((item, i) => `${String.fromCharCode(65 + i)}["${i + 1}) ${item}"]`),
//                         ...data.slice(0, -1).map((_, i) => `${String.fromCharCode(65 + i)} --> ${String.fromCharCode(66 + i)}`)
//                     ].join('\n');

//                     return <Mermaid key={index} chart={mermaidChart} />;
//                 }
//                 else if (Array.isArray(data) && data.length > 0) {
//                             const mermaidChart = data.join('\n');
//                     return <Mermaid key={index} chart={mermaidChart} />;
//                 }
//             })

//         ) : null;

// }

"use client";
import React from "react";
import { Mermaid } from "mdx-mermaid/Mermaid";

export default function MermaidCharts({ value }) {
  //   const generateChartData = (data, parent = null, nodeIndexRef = 1) => {
  //     let chartLines = [];
  //     let currentNode = nodeIndexRef; // Use numbers for node IDs

  //     data.forEach((item) => {
  //       if (Array.isArray(item)) {
  //         // Recursive case for branching: keep current node as parent for nested arrays
  //         chartLines.push(...generateChartData(item, parent, ++nodeIndexRef));
  //       } else {
  //         // If there's a parent, create a connection
  //         if (parent) {
  //           chartLines.push(`${parent} --> ${currentNode}`);
  //         }
  //         // Add the node definition
  //         chartLines.push(`${currentNode}[${item}]`);

  //         // Update the parent for potential children
  //         parent = currentNode;
  //         ++nodeIndexRef; // Increment the index for the next unique node
  //         currentNode = nodeIndexRef; // Use next number for node ID
  //       }
  //     });

  //     return chartLines;
  //   };

  const generateChartData = (
    data,
    parent = null,
    nodeIndexRef = { index: 1 }
  ) => {
    let chartLines = [];

    data.forEach((item) => {
      if (Array.isArray(item)) {
        chartLines.push(...generateChartData(item, parent, nodeIndexRef));
      } else {
        let currentNode = nodeIndexRef.index++;
        if (parent) {
          chartLines.push(`${parent} --> ${currentNode}`);
        }
        chartLines.push(`${currentNode}[${item}]`);

        parent = currentNode;
      }
    });

    return chartLines;
  };

  if (!value || !Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <>
      {value.map((chartObject, index) => {
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

        const { type, data } = chartObject;

        if (type === "graph TD" && Array.isArray(data) && data.length > 0) {
          const chartLines = generateChartData(data);
          //   const [chartLines] = generateChartData(data, null, 1);
          const mermaidChart = [type, ...chartLines].join("\n");

          return <Mermaid key={index} chart={mermaidChart} />;
        } else if (Array.isArray(data) && data.length > 0) {
          const mermaidChart = data.join("\n");
          return <Mermaid key={index} chart={mermaidChart} />;
        }

        return null;
      })}
    </>
  );
}
