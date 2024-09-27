// import React from "react";

// export default function image({ value }) {
//   return (

//     <>
//       {value && Array.isArray(value) && value.length > 0
//         ? value.map((image, index) => (
//             <figure
//               key={index}
//               // style={{ float: `${image.data.attributes.float ? image.data.attributes.float : null}`, marginRight: '10px' }}
//               className="border-2 inline-block m-2 float-right"
//             >
//               <img
//                 src={image.url}
//                 width={image.width ? image.width : 500}
//                 // height={image.height ? image.height : 600}
//                 // width={400}
//                 alt={`Image ${index + 1}`}
//               />
//               {image.caption ? (
//                 <figcaption className="text-center block m-auto">
//                   <span> Fig. </span>
//                   <span
//                     key={index}
//                     dangerouslySetInnerHTML={{ __html: image.caption }}
//                   />
//                 </figcaption>
//               ) : null}
//               {image.credit ? (
//                 <div className="text-center text-sm m-auto italic">
//                   <span>Credit. </span>
//                   <span
//                     key={index}
//                     dangerouslySetInnerHTML={{ __html: image.credit }}
//                   />
//                 </div>
//               ) : null}
//             </figure>
//           ))
//         : null}
//     </>
//   );
// }

import React from "react";

export default function Image({ value }) {
  function getImageDimensions(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;

      img.onload = function () {
        const dimensions = {
          width: img.width,
          height: img.height,
        };
        resolve(dimensions);
      };

      img.onerror = function () {
        reject("Error loading image.");
      };
    });
  }

  return (
    <>
      {value && Array.isArray(value) && value.length > 0
        ? value.map((image, index) => (
            <figure
              key={index}
              className="border-2 inline-block m-2 float-right relative"
              style={{ position: "relative", display: "inline-block" }}
            >
              <img
                src={image.url}
                // width={image.width ? image.width : 500}
                alt={`Image ${index + 1}`}
              />

              {/* Render SVG overlay for labels */}
              {
                // getImageDimensions(image.url).then((dimensions) => {
                image.label && image.label.length > 0 && (
                  <svg
                    // width={image.width ? image.width : 500}
                    width="auto"
                    height="auto"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      pointerEvents: "none", // Ensures the SVG does not interfere with image clicks
                    }}
                  >
                    {image.label.map((label, labelIndex) => {
                      // Extract the coordinates and label text
                      const [x1, y1, x2, y2, labelText] = label;

                      // Default value if x2 or y2 is null
                      const endX = x2 !== "" ? x2 : x1 + 200;
                      const endY = y2 !== "" ? y2 : y1;

                      return (
                        <g key={labelIndex}>
                          {/* Draw the line */}
                          <line
                            x1={x1}
                            y1={y1}
                            x2={endX}
                            y2={endY}
                            stroke="red"
                            strokeWidth="2"
                          />
                          {/* Draw the label */}
                          <text
                            x={endX}
                            y={endY}
                            fill="black"
                            fontSize="12"
                            dy="4" // Offset text a bit above the end of the line
                          >
                            {labelText}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                )
                // })
              }

              {image.caption ? (
                <figcaption className="text-center block m-auto">
                  <span> Fig. </span>
                  <span
                    key={index}
                    dangerouslySetInnerHTML={{ __html: image.caption }}
                  />
                </figcaption>
              ) : null}

              {image.credit ? (
                <div className="text-center text-sm m-auto italic">
                  <span>Credit. </span>
                  <span
                    key={index}
                    dangerouslySetInnerHTML={{ __html: image.credit }}
                  />
                </div>
              ) : null}
            </figure>
          ))
        : null}
    </>
  );
}
