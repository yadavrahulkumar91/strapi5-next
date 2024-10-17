"use client";
import { useState } from "react";

const VideoPlayer = ({ video_url }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoUrls = video_url;

  const handleNext = () => {
    if (currentVideoIndex < videoUrls.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  return (
    <div>
      {videoUrls.length > 0 && (
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden",
            maxWidth: "100%",
            backgroundColor: "#000",
          }}
        >
          <iframe
            src={videoUrls[currentVideoIndex].video_url}
            title={`Video ${currentVideoIndex + 1}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {videoUrls.length > 1 && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <button onClick={handlePrevious} disabled={currentVideoIndex === 0}>
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>
            {currentVideoIndex + 1} / {videoUrls.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentVideoIndex === videoUrls.length - 1}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
