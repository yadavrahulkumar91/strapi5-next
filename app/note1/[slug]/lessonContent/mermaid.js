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

        // When coming out of the nested array, link all stored last items to the current parent
        // if (index === data.length - 1 && parent !== null) {
        //   lastItemRefs.lastItems.forEach((lastItem) => {
        //     chartLines.push(`${lastItem} --> ${parent}`);
        //   });
        //   lastItemRefs.lastItems.length = 0; // Clear after linking
        // }

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

  //   const generateChartData = (
  //     data,
  //     parent = null,
  //     nodeIndexRef = { index: 1 },
  //     lastItemRefs = { lastItems: [], inNested: false },
  //     level = 0
  //   ) => {
  //     let chartLines = [];

  //     data.forEach((item, index) => {
  //       if (Array.isArray(item)) {
  //         // Recursively process the nested array, passing the current parent
  //         lastItemRefs.inNested = true;
  //         let currentLevel = level + 1;
  //         chartLines.push(
  //           ...generateChartData(
  //             item,
  //             parent,
  //             nodeIndexRef,
  //             lastItemRefs,
  //             currentLevel
  //           )
  //         );
  //       } else {
  //         let currentNode = nodeIndexRef.index++;

  //         // If the current item is the last one in the current array
  //         if (level < currentLevel && lastItemRefs.inNested) {
  //           lastItemRefs.lastItems.push(currentNode);
  //         }

  //         // If the current item is not the last one, link all the stored last items to the current node
  //         if (index !== data.length - 1 && lastItemRefs.lastItems.length > 0) {
  //           lastItemRefs.lastItems.forEach((lastItem) => {
  //             chartLines.push(`${lastItem} --> ${currentNode}`);
  //           });
  //           lastItemRefs.lastItems.length = 0; // Clear after linking
  //         } else {
  //           if (parent) {
  //             chartLines.push(`${parent} --> ${currentNode}`);
  //           }
  //         }

  //         chartLines.push(`${currentNode}[${item}]`);
  //         parent = currentNode; // Update parent to the current node
  //       }
  //     });

  //     return chartLines;
  //   };

  //   const generateChartWithLastItemLinking = (data) => {
  //     let nodeIndexRef = { index: 1 };
  //     let lastItemRefs = { lastItems: [] };
  //     let level = 0;
  //     let chartLines = generateChartData(
  //       data,
  //       null,
  //       nodeIndexRef,
  //       lastItemRefs,
  //       level
  //     );

  //     return chartLines;
  //   };

  //   const generateChartData = (
  //     data,
  //     parent = null,
  //     parent0 = { parent1: null },
  //     nodeIndexRef = { index: 1 }
  //   ) => {
  //     let chartLines = [];

  //     data.forEach((item, index) => {
  //       if (Array.isArray(item)) {
  //         chartLines.push(
  //           ...generateChartData(item, parent, parent0, nodeIndexRef)
  //         );
  //       } else {
  //         let currentNode = nodeIndexRef.index++;

  //         if (parent0.parent1 && index === data.length - 1) {
  //           chartLines.push(`${parent0.parent1} --> ${currentNode}`);
  //         }
  //         // Check if the current parent exists
  //         else if (parent) {
  //           chartLines.push(`${parent} --> ${currentNode}`);
  //         }

  //         // Check if parent0.parent1 is not null and the current item is the last one

  //         // Add the current node to the chart
  //         chartLines.push(`${currentNode}[${item}]`);

  //         // Update parent references
  //         parent0.parent1 = currentNode;
  //         parent = currentNode;
  //       }
  //     });

  //     return chartLines;
  //   };

  // const generateChartData = (
  //   data,
  //   parent = null,
  //   nodeIndexRef = { index: 1 }
  // ) => {
  //   let chartLines = [];

  //   data.forEach((item) => {
  //     if (Array.isArray(item)) {
  //       chartLines.push(...generateChartData(item, parent, nodeIndexRef));
  //     } else {
  //       let currentNode = nodeIndexRef.index++;
  //       if (parent) {
  //         chartLines.push(`${parent} --> ${currentNode}`);
  //       }
  //       chartLines.push(`${currentNode}[${item}]`);

  //       parent = currentNode;
  //     }
  //   });

  //   return chartLines;
  // };

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
          //   const chartLines = generateChartData(data);
          const chartLines = generateChartWithLastItemLinking(data);
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
