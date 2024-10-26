"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { renderAttributes } from "./lessonContent";

import OrgChart, {
  LayoutType,
  ConnectorAlignment,
} from "awesome-react-org-chart";

const DynamicOrgChart = dynamic(() => import("awesome-react-org-chart"), {
  ssr: false,
});

export default function Aroc({ data, layout_type }) {
  const isValidNode = (node) => node !== undefined && node !== null;

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
    <>
      <div className="border-[1px] border-[green]   z-10 bg-white">
        <div
          className="text-[20px] leading-[20px] text-center  font-semibold bg-green-200 p-1 whitespace-break-spaces"
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
      <div>
        {node.line ? (
          <div className="mx-1 text-center">
            {renderAttributes(node.line, node.level ?? 2)}
          </div>
        ) : null}
      </div>
    </>
  );
  const childNodesGetter = (node) => node.children || [];

  const lineHorizontalStyle = {
    borderTop: "1px solid  green",
  };
  const lineVerticalStyle = {
    borderLeft: "1px solid  green",
  };

  const containerStyle = {
    width: "100%",
    boxSizing: "border-box",

    margin: "4px 0px",

    overflow: "auto",

    boxSizing: "border-box",
    pointerEvents: "auto",
  };

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
