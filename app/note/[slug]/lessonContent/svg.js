import React from "react";

const SvgComponent = ({ svg }) => {
  if (!svg) return null;

  return (
    <svg
      width="auto"
      height="auto"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none", // Ensures the SVG does not interfere with image clicks
      }}
    >
      {/* Render labels */}
      {svg.label &&
        svg.label.length > 0 &&
        svg.label.map((label, labelIndex) => {
          const [x1, y1, x2, y2, labelText] = label;
          const endX = x2 !== "" ? x2 : "90%";
          const endY = y2 !== "" ? y2 : y1;

          return (
            <g key={labelIndex}>
              <line
                x1={x1}
                y1={y1}
                x2={endX}
                y2={endY}
                stroke="black"
                strokeWidth="0.2%"
              />
              <text x={endX} y={endY} fill="black" fontSize="12" dy="4">
                {labelText}
              </text>
            </g>
          );
        })}

      {/* Render text */}
      {svg.text &&
        svg.text.length > 0 &&
        svg.text.map((textItem, textIndex) => {
          const [x, y, textContent] = textItem;
          return (
            <text key={textIndex} x={x} y={y} fill="black" fontSize="14">
              {textContent}
            </text>
          );
        })}
    </svg>
  );
};

export default SvgComponent;
