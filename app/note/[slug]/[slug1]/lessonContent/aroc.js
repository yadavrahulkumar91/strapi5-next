"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { renderAttributes } from "./lessonContent";

import OrgChart, {
  LayoutType,
  ConnectorAlignment,
} from "awesome-react-org-chart";

// Dynamically import the OrgChart component to disable SSR
const DynamicOrgChart = dynamic(() => import("awesome-react-org-chart"), {
  ssr: false,
});

export default function Aroc({ data, layout_type }) {
  const isValidNode = (node) => node !== undefined && node !== null;

  // Modified keyGetter to generate a unique key based on the node's depth and index
  const generateUniqueKey = (node, parentKey = "0") => {
    const children = node.children || [];
    return {
      ...node,
      key: `${parentKey}-${children.length}`,
      children: children.map((child, index) =>
        generateUniqueKey(child, `${parentKey}-${index}`)
      ),
    };
  };

  const orgDataWithKeys = generateUniqueKey(data);

  const keyGetter = (node) => node.key;
  const renderNode = (node) => (
    <div className="border-[1px] border-[green]   z-10 bg-white">
      <div
        className="text-[20px] leading-[20px]  font-semibold bg-green-200 p-1 whitespace-break-spaces"
        dangerouslySetInnerHTML={{ __html: node.name }}
      />
      <div>
        {node.about ? (
          <div className="mx-1">
            {renderAttributes(node.about, node.level ?? 2)}
          </div>
        ) : null}
      </div>
    </div>
  );
  const childNodesGetter = (node) => node.children || [];

  // Optional styles
  const lineHorizontalStyle = {
    borderTop: "1px solid  green",
    // transition: '800ms transform, 800ms width, 800ms height'
  };
  const lineVerticalStyle = {
    borderLeft: "1px solid  green",
    // transition: '800ms transform, 800ms width, 800ms height'
  };
  // const containerStyle = { margin: "", pointerEvents: "none" };

  const containerStyle = {
    width: "100%", // Full width of the parent
    boxSizing: "border-box",
    // height: "auto",
    // height: "500px", // Fixed height
    margin: "4px 0px", // Centered with margin

    // backgroundColor: "#f9f9f9", // Light gray background
    // border: "1px solid #ccc", // Light border
    // borderRadius: "10px", // Rounded corners
    overflow: "auto", // Scroll if content overflows
    // overflowX: "auto", // Horizontal scroll if content overflows
    // overflowY: "hidden",
    boxSizing: "border-box",
    pointerEvents: "auto", // Enable pointer events (e.g., clicking)
    // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow
  };

  // Use layout_type prop instead of hardcoded layout
  const layout = LayoutType[layout_type] || LayoutType.LINEAR;

  const debug = false;

  return (
    <div className="org-chart-container hiddenScrollbar">
      <DynamicOrgChart
        root={orgDataWithKeys}
        isValidNode={isValidNode}
        keyGetter={keyGetter}
        renderNode={renderNode}
        childNodesGetter={childNodesGetter}
        lineHorizontalStyle={lineHorizontalStyle}
        lineVerticalStyle={lineVerticalStyle}
        measureStrategy="effect"
        connectorThickness={1}
        connectorAlignment={ConnectorAlignment.Center}
        layout={layout}
        containerStyle={containerStyle}
        debug={debug}
      />
    </div>
  );
}
