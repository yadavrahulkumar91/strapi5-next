// // import React from "react";

// // export default function image({ value }) {
// //   return (

// //     <>
// //       {value && Array.isArray(value) && value.length > 0
// //         ? value.map((image, index) => (
// //             <figure
// //               key={index}
// //               // style={{ float: `${image.data.attributes.float ? image.data.attributes.float : null}`, marginRight: '10px' }}
// //               className="border-2 inline-block m-2 float-right"
// //             >
// //               <img
// //                 src={image.url}
// //                 width={image.width ? image.width : 500}
// //                 // height={image.height ? image.height : 600}
// //                 // width={400}
// //                 alt={`Image ${index + 1}`}
// //               />
// //               {image.caption ? (
// //                 <figcaption className="text-center block m-auto">
// //                   <span> Fig. </span>
// //                   <span
// //                     key={index}
// //                     dangerouslySetInnerHTML={{ __html: image.caption }}
// //                   />
// //                 </figcaption>
// //               ) : null}
// //               {image.credit ? (
// //                 <div className="text-center text-sm m-auto italic">
// //                   <span>Credit. </span>
// //                   <span
// //                     key={index}
// //                     dangerouslySetInnerHTML={{ __html: image.credit }}
// //                   />
// //                 </div>
// //               ) : null}
// //             </figure>
// //           ))
// //         : null}
// //     </>
// //   );
// // }

//   // function getImageDimensions(url) {
//   //   return new Promise((resolve, reject) => {
//   //     const img = new Image();
//   //     img.src = url;

//   //     img.onload = function () {
//   //       const dimensions = {
//   //         width: img.width,
//   //         height: img.height,
//   //       };
//   //       resolve(dimensions);
//   //     };

//   //     img.onerror = function () {
//   //       reject("Error loading image.");
//   //     };
//   //   });
//   // }

import React from "react";
import SVG from "./svg";
export default function Image({ value }) {
  return (
    <>
      {value && Array.isArray(value) && value.length > 0
        ? value.map((image, index) => (
            <figure
              key={index}
              className="border-2 inline-block m-2 float-right relative"
              style={image.style ?? image.style}
            >
              <div height="auto" width="auto" className="relative">
                <img
                  src={image.url + "?" + "t=" + Date.now()}
                  // src={image.url}
                  width={image.width ? image.width : 500}
                  // height={image.height ? image.height : 600}
                  // width={400}
                  // className={className??className}
                  alt={`Image ${index + 1}`}
                />
                {image.svg && <SVG svg={image.svg} />}
              </div>
              {image.caption && (
                <figcaption className="text-center block m-auto">
                  <span>Fig. </span>
                  <span
                    key={index}
                    className="break-words h-auto w-auto"
                    dangerouslySetInnerHTML={{ __html: image.caption }}
                  />
                </figcaption>
              )}

              {image.credit && (
                <div className="text-center text-sm m-auto italic">
                  <span>Credit. </span>
                  <span
                    key={index}
                    dangerouslySetInnerHTML={{ __html: image.credit }}
                  />
                </div>
              )}
            </figure>
          ))
        : null}
    </>
  );
}

// import React from "react";

// export default function Image({ value }) {
//   return (
//     <>
//       {value && Array.isArray(value) && value.length > 0
//         ? value.map((image, index) => (
//             <figure
//               key={index}
//               className="border-2 inline-block m-2 float-right"
//             >
//               {/* SVG containing the image using foreignObject */}
//               <svg
//                 width={image.width ? image.width : 600}
//                 height={image.height ? image.height : 600}
//                 xmlns="http://www.w3.org/2000/svg"
//                 style={{
//                   display: "inline-block",
//                   border: "2px solid black",
//                 }}
//               >
//                 {/* Embed the image using foreignObject */}
//                 <foreignObject
//                   width={image.width ? image.width : 500}
//                   height={image.height ? image.height : 600}
//                 >
//                   <img
//                     xmlns="http://www.w3.org/1999/xhtml"
//                     src={image.url}
//                     width={image.width ? image.width : 500}
//                     height={image.height ? image.height : 600}
//                     alt={`Image ${index + 1}`}
//                     // style={{ display: "block", width: "100%", height: "100%" }}
//                   />
//                 </foreignObject>

//                 {/* Render SVG overlay for labels */}
//                 {image.label &&
//                   image.label.length > 0 &&
//                   image.label.map((label, labelIndex) => {
//                     const [x1, y1, x2, y2, labelText] = label;
//                     const endX = x2 !== "" ? x2 : x1 + 200;
//                     const endY = y2 !== "" ? y2 : y1;

//                     return (
//                       <g key={labelIndex}>
//                         {/* Draw the line */}
//                         <line
//                           x1={x1}
//                           y1={y1}
//                           x2={endX}
//                           y2={endY}
//                           stroke="red"
//                           strokeWidth="2"
//                         />
//                         {/* Draw the label */}
//                         <text
//                           x={endX}
//                           y={endY}
//                           fill="black"
//                           fontSize="12"
//                           dy="4" // Offset text a bit above the end of the line
//                         >
//                           {labelText}
//                         </text>
//                       </g>
//                     );
//                   })}
//               </svg>

//               {/* Optional: Render caption and credit below the SVG */}
//               {image.caption && (
//                 <figcaption className="text-center block m-auto">
//                   <span> Fig. </span>
//                   <span dangerouslySetInnerHTML={{ __html: image.caption }} />
//                 </figcaption>
//               )}

//               {image.credit && (
//                 <div className="text-center text-sm m-auto italic">
//                   <span>Credit. </span>
//                   <span dangerouslySetInnerHTML={{ __html: image.credit }} />
//                 </div>
//               )}
//             </figure>
//           ))
//         : null}
//     </>
//   );
// }
