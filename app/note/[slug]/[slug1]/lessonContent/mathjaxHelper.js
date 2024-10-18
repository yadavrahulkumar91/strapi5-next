// "use client";

// import { mathjax } from "mathjax-full/js/mathjax.js";
// import { TeX } from "mathjax-full/js/input/tex.js";
// import { CHTML } from "mathjax-full/js/output/chtml.js";
// import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js";
// import { AllPackages } from "mathjax-full/js/input/tex/AllPackages.js";

// const adaptor = liteAdaptor();
// const tex = new TeX({ packages: AllPackages });
// const chtml = new CHTML();
// const htmlDocument = mathjax.document("", {
//   InputJax: tex,
//   OutputJax: chtml,
//   adaptor,
// });

// // Helper function to process individual strings containing TeX
// const processTeX = async (content) => {
//   const node = htmlDocument.convert(content, { display: true });
//   return adaptor.outerHTML(node);
// };

// // Recursive function to process the entire lessonContent object
// export const processLessonContentTeX = async (content) => {
//   if (typeof content === "string") {
//     // If the content is a string, process it for TeX
//     return await processTeX(content);
//   } else if (Array.isArray(content)) {
//     // If it's an array, process each element recursively
//     return await Promise.all(
//       content.map((item) => processLessonContentTeX(item))
//     );
//   } else if (typeof content === "object" && content !== null) {
//     // If it's an object, process each key-value pair recursively
//     const processedObject = {};
//     for (const [key, value] of Object.entries(content)) {
//       processedObject[key] = await processLessonContentTeX(value);
//     }
//     return processedObject;
//   }
//   return content;
// };

// import { mathjax } from "mathjax-full/js/mathjax.js";
// import { TeX } from "mathjax-full/js/input/tex.js";
// import { CHTML } from "mathjax-full/js/output/chtml.js";
// import { AllPackages } from "mathjax-full/js/input/tex/AllPackages.js";

// // Helper function to initialize MathJax and process TeX content
// export const processLessonContentTeX = async (content) => {
//   const tex = new TeX({ packages: AllPackages });
//   const chtml = new CHTML();
//   const htmlDocument = mathjax.document("", {
//     InputJax: tex,
//     OutputJax: chtml,
//   });

//   const processTeX = async (texString) => {
//     return htmlDocument.convert(texString, { display: false });
//   };

//   // Recursive function to process all TeX in the content
//   const recursiveProcess = async (content) => {
//     if (typeof content === "string") {
//       return processTeX(content); // Process the TeX string and return HTML
//     } else if (Array.isArray(content)) {
//       return await Promise.all(content.map((item) => recursiveProcess(item)));
//     } else if (typeof content === "object" && content !== null) {
//       const processedObject = {};
//       for (const [key, value] of Object.entries(content)) {
//         processedObject[key] = await recursiveProcess(value);
//       }
//       return processedObject;
//     }
//     return content;
//   };

//   return await recursiveProcess(content);
// };
// "use client";
// import { mathjax } from "mathjax-full/js/mathjax.js";
// import { TeX } from "mathjax-full/js/input/tex.js";
// import { CHTML } from "mathjax-full/js/output/chtml.js";
// import { AllPackages } from "mathjax-full/js/input/tex/AllPackages.js";

// // Helper function to process TeX in the entire JSON string
// export const processLessonContentTeX = async (content) => {
//   const tex = new TeX({ packages: AllPackages });
//   const chtml = new CHTML();
//   const htmlDocument = mathjax.document("", {
//     InputJax: tex,
//     OutputJax: chtml,
//   });

//   const jsonString = JSON.stringify(content); // Convert JSON object to string

//   // Convert the entire string with MathJax
//   const processedContent = htmlDocument.convert(jsonString, { display: false });

//   return processedContent; // Return the processed HTML
// };

// import { mathjax } from "mathjax-full/js/mathjax.js";
// import { TeX } from "mathjax-full/js/input/tex.js";
// import { CHTML } from "mathjax-full/js/output/chtml.js";
// import { AllPackages } from "mathjax-full/js/input/tex/AllPackages.js";

// // Helper function to process TeX in a stringified JSON object
// export const processLessonContentTeX = async (content) => {
//   const tex = new TeX({ packages: AllPackages });
//   const chtml = new CHTML();

//   // Stringify the JSON object to process as a single string
//   const jsonString = JSON.stringify(content);

//   // Convert the TeX content to HTML directly without the need for a document object
//   const html = mathjax.tex2chtml(jsonString, {
//     display: false, // Inline display, set to true if you need block display
//     exFactor: 1,
//     em: 16,
//   });

//   // Output the resulting HTML
//   return chtml.outerHTML(html); // Return the HTML as a string
// };

// "use client";
// import dynamic from "next/dynamic";
// // import { init } from "mathjax";

// const MathJax = dynamic(() => import("mathjax"), {
//   ssr: false,
// });

// export const processLessonContentTeX = async (lessonContent) => {
//   console.log(lessonContent);
//   //   const MathJax = await init({
//   //     loader: { load: ["input/tex", "output/chtml"] }, // You can use 'output/svg' or other formats as well
//   //   });

//   // Convert JSON object to string to pass the whole content
//   //   const jsonString = JSON.stringify(lessonContent);

//   // Process the content with MathJax
//   //   const chtml = MathJax.tex2chtml(lessonContent, { display: false }); // Use tex2chtml or tex2svg
//   //   return MathJax.startup.adaptor.outerHTML(chtml);
//   return lessonContent;
// };

// "use client";
// import dynamic from "next/dynamic";

// // Dynamically import MathJax
// const MathJax = dynamic(() => import("mathjax"), { ssr: false });

// export const processLessonContentTeX = async (lessonContent) => {
//   // Wait for MathJax to be imported and initialized
//   const { default: MathJaxLib } = await MathJax;

//   await MathJaxLib.init({
//     loader: { load: ["input/tex", "output/chtml"] },
//   });

//   // Convert JSON object to string
//   const jsonString = JSON.stringify(lessonContent);

//   // Process the TeX content
//   const processTeX = (texString) => {
//     const chtml = MathJaxLib.tex2chtml(texString, { display: false });
//     return MathJaxLib.startup.adaptor.outerHTML(chtml);
//   };

//   // Replace TeX content in the string
//   const processedJsonString = jsonString.replace(
//     /\\\(([^)]+)\\\)|\\\[([^]+?)\\\]/g,
//     (match, p1, p2) => {
//       const texContent = p1 || p2;
//       return processTeX(texContent); // Process TeX and replace it with the formatted HTML
//     }
//   );

//   // Parse the processed JSON string back to an object
//   return JSON.parse(processedJsonString);
// };

// import dynamic from "next/dynamic";

// // Dynamically import MathJax
// const MathJax = dynamic(() => import("mathjax/es5/tex-mml-chtml.js"), {
//   ssr: false,
// });

// export const processLessonContentTeX = async (lessonContent) => {
//   // Wait for MathJax to be imported
//   const MathJaxLib = await MathJax;

//   // Initialize MathJax
//   const { tex2chtml } = MathJaxLib;

//   // Convert JSON object to string
//   const jsonString = JSON.stringify(lessonContent);

//   // Function to process TeX strings
//   const processTeX = (texString) => {
//     const chtml = tex2chtml(texString, { display: false });
//     return MathJaxLib.startup.adaptor.outerHTML(chtml);
//   };

//   // Replace TeX content in the string
//   const processedJsonString = jsonString.replace(
//     /\\\(([^)]+)\\\)|\\\[([^]+?)\\\]/g,
//     (match, p1, p2) => {
//       const texContent = p1 || p2;
//       return processTeX(texContent); // Process TeX and replace it with the formatted HTML
//     }
//   );

//   // Parse the processed JSON string back to an object
//   return JSON.parse(processedJsonString);
// };
