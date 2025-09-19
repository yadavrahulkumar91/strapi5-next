"use client";
import React, { useState } from "react";

export default function Video({ value }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!value || !Array.isArray(value) || value.length === 0) return null;

  const currentVideo = value[currentIndex];

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

  const isYouTube = (url) =>
    url.includes("youtube.com") || url.includes("youtu.be");

  return (
    <figure
      className="border-2 inline-block m-2 relative"
      style={currentVideo.style ?? {}}
    >
      <div className="relative">
        {isYouTube(currentVideo.url) ? (
          <iframe
            width={currentVideo.width ?? 700}
            height={currentVideo.height ?? 400}
            src={currentVideo.url}
            title={`Video ${currentIndex + 1}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video
            controls
            src={currentVideo.url}
            width={currentVideo.width ?? 500}
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>

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
