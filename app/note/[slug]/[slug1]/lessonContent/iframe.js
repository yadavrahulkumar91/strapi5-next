"use client";
import React, { useState } from "react";
import SVG from "./svg";

export default function IframeImage({ value }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!value || !Array.isArray(value) || value.length === 0) return null;

  const currentItem = value[currentIndex];

  const handleNext = () => {
    if (currentIndex < value.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <figure
      className="border-2 inline-block m-2 float-right relative"
      style={currentItem.style ?? {}}
    >
      <div
        className="relative"
        style={{
          width: currentItem.width ?? 500,
          height: currentItem.height ?? "auto",
        }}
      >
        <iframe
          src={currentItem.url}
          width={currentItem.width ?? 500}
          height={currentItem.height ?? 400}
          frameBorder="0"
          allowFullScreen
          title={`Image ${currentIndex + 1}`}
        ></iframe>
        {currentItem.svg && <SVG svg={currentItem.svg} />}
      </div>

      {currentItem.caption && (
        <figcaption className="text-center block m-auto">
          <span>Fig. </span>
          <span
            className="break-words h-auto w-auto"
            dangerouslySetInnerHTML={{ __html: currentItem.caption }}
          />
        </figcaption>
      )}

      {currentItem.about && (
        <div className="text-center block m-auto">
          <span
            className="break-words h-auto w-auto"
            dangerouslySetInnerHTML={{ __html: currentItem.about }}
          />
        </div>
      )}

      {currentItem.credit && (
        <div className="text-center text-sm m-auto italic">
          <span>Credit. </span>
          <span dangerouslySetInnerHTML={{ __html: currentItem.credit }} />
        </div>
      )}

      {value.length > 1 && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <button onClick={handlePrevious} disabled={currentIndex === 0}>
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>
            {currentIndex + 1} / {value.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex === value.length - 1}
          >
            Next
          </button>
        </div>
      )}
    </figure>
  );
}
