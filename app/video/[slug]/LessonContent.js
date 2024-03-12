"use client";
import React, { useState } from 'react';
import MathJax from 'react-mathjax';
import { Mermaid } from 'mdx-mermaid/Mermaid';
import { Chart } from "react-google-charts";
import pptxgen from "pptxgenjs";
import Ppt from "./ppt.js";



function Presentation(jsonData1, lessonName) {
    console.log("Clicked");

    const pptx = new pptxgen();
    pptx.author = 'Rahul Kumar Yadav';
    pptx.company = 'GameChanger Academy';
    pptx.layout = 'LAYOUT_WIDE';


    

    const objects = [
        { line: { x: 0, y: 0.75, w: "100%", h: 0, line: { color: "0088CC", width: 0.25, dash: true, } } },
        { line: { x: 0, y: 7, w: "100%", h: 0, line: { color: "0088CC", width: 0.25, dash: true, } } },
        { line: { x: 0.65, y: 0, w: 0, h: "100%", line: { color: "0088CC", width: 0.25, dash: true, } } },
        { line: { x: 12.65, y: 0, w: 0, h: "100%", line: { color: "0088CC", width: 0.25, dash: true, } } },
        { text: { text: lessonName, options: { x: 0.7, y: "95%", w: "90%", h: 0.2, highlight: "FFD580" } } },
        {
            text: {
                text: (lessonName.toUpperCase()), options: {
                    // x: 1,
                    y: 0.45,
                    fontSize: 28,
                    w: "100%",
                    bold: true,
                    color: "000000", // Text color
                    fill: { color: "000000" }, // Background color (Orange)
                    fontFace: "Courier New", // Font face, can be any font installed on the system
                    highlight: "FFD580",
                    valign: "middle", align: "center",
                } } },
        { image: { x: 9.75, y: "94%", w: 0.3, h: 0.3, path: "https://academy.rahulkumaryadav.com.np/image/GCround.png" } },
        {
            text: {
                text: 'GameChanger Academy', options: {
                    x: 10, y: "93.5%", w: "30%", h: 0.4,
                    // hyperlink: { url:"https://rahulkumaryadav.com.np"} 
                },

            }
        },
        // { image: { x: 8.65, y: "95%", w: 0.5, h: 0.5, path: "../logo.png" } },
    ];

    pptx.defineSlideMaster({
        title: "MASTER_SLIDE",
        background: { color: "FFFFFF" },
        objects: objects,
        slideNumber: { x: 0.2, y: "93.75%" },
    });

    pptx.addSlide({
        masterName: "MASTER_SLIDE"
    });


  




    // Spacing between lines
    const spacing = 0.35;

    // Draw lines with given spacing
    const lines = [];



    for (let i = 1; i < 18; i++) {
        const line = {
            line: {
                x: 9.65,
                y: 0.75 + i * spacing,
                w: 3.65,
                h: 0,
                line: {
                    color: "0088CC",
                    width: 0.25
                }
            }
        };
        lines.push(line);
    }

    const objects1 = [
        { line: { x: 0, y: 0.75, w: "100%", h: 0, line: { color: "0088CC", width: 0.25, dash: true, } } },
        { line: { x: 0, y: 7, w: "100%", h: 0, line: { color: "0088CC", width: 0.25, dash: true, } } },
        { line: { x: 0.65, y: 0, w: 0, h: "100%", line: { color: "0088CC", width: 0.25, dash: true, } } },
        ...lines,
        // { rect: { x: 0.0, y: 5.3, w: "100%", h: 0.75, fill: { color: "F1F1F1" } } },
        { text: { text: lessonName, options: { x: 0.7, y: "95%", w: "90%", h: 0.2, highlight: "FFD580" } } },
        // { text: { text: 'Notes', options: { x: 10, y: 0.15, w: "15%", h: 0.4 } } },
        { image: { x: 9.75, y: "94%", w: 0.3, h: 0.3, path: "https://academy.rahulkumaryadav.com.np/image/GCround.png" } },
        {
            text: {
                text: 'GameChanger Academy', options: {
                    x: 10, y: "93.5%", w: "30%", h: 0.4,
                    // hyperlink: { url:"https://rahulkumaryadav.com.np"} 
                },

            }
        },
        // { image: { x: 8.65, y: "95%", w: 0.5, h: 0.5, path: "../logo.png" } },
    ];

    pptx.defineSlideMaster({
        title: "MASTER_SLIDE1",
        background: { color: "FFFFFF" },
        objects: objects1,
        slideNumber: { x: 0.2, y: "93.75%" },
    });




    const renderAttributes = (attributes, level = 0) => {
        if (!attributes || typeof attributes !== 'object') {
            return null;
        }
        const isArray = Array.isArray(attributes);





        return Object.entries(attributes).map(([key, value]) => {
            const isObject = typeof value === 'object';

            return (<>
                {renderObject(key, value, isArray, isObject, level)}

            </>);
        });
    };



    renderAttributes(jsonData1)



    function renderObject(key, value, isArray, isObject, level) {


        // let slides = {};
        if (level == 0) {

         let   slide = pptx.addSlide({
                masterName: "MASTER_SLIDE1"
            });
            slide.addText("# " + key.toUpperCase().replace(/_/g, ' '), { x: 0.4, y: 0.55, fontSize: 20, fill: { color: "F1F1F1" }, bold: true, highlight: "F1F1F1" });

        }

        if (key === 'name') {
            key = value;
            value = null;
        }
        if (/^image\d*$/.test(key)) {
            return (
                <div>
                    {(value && Array.isArray(value) && value.length > 0) ? value.map((image, index) => (
                        <figure key={index} style={{ float: `${image.data.attributes.float ? image.data.attributes.float : null}`, marginRight: '10px' }}>
                            <img src={image.data.attributes.url} width={image.data.attributes.width ? image.data.attributes.width : 400} alt={`Image ${index + 1}`} />
                            <figcaption>Fig. <span key={index} dangerouslySetInnerHTML={{ __html: image.data.attributes.caption }} /></figcaption>
                        </figure>
                    )) : null}
                </div>
            );
        }
        else if (key === 'formula') {
            return (
                <MathJax.Provider key={key}>
                    <div>
                        <MathJax.Node formula={value} />
                    </div>
                </MathJax.Provider>
            );
        } else if (/^mermaid\d*$/.test(key)) {
            return (value && Array.isArray(value) && value.length > 0) ? (
                value.map((chartObject, index) => {
                    const { data } = chartObject;

                    if (Array.isArray(data)) {
                        const mermaidChart = data.join('\n');
                        return <Mermaid key={index} chart={mermaidChart} />;
                    } else {
                        // Handle the case where data is not an array (optional)
                        console.error(`Invalid data format at index ${index}. Expected an array.`);
                        return null; // or handle it in a way that makes sense for your application
                    }
                })
            ) : null;
        }
        else if (key === 'google_chart') {
            console.log(value);
            return (
                <Chart key={key} chartType="ScatterChart" data={{ value }} width="100%" height="400px" legendToggle />
            );
        }
        else if (/^html\d*$/.test(key) || key === 'html') {
            return (value && Array.isArray(value) && value.length > 0) ? (
                value.map((chartObject, index) => {
                    const { data } = chartObject;

                    if (Array.isArray(data)) {
                        const chartContent = data.join('\n');

                        // Use dangerouslySetInnerHTML for HTML content
                        return <div key={index} dangerouslySetInnerHTML={{ __html: chartContent }} />;
                    } else {
                        // Handle the case where data is not an array (optional)
                        console.error(`Invalid data format at index ${index}. Expected an array.`);
                        return null; // or handle it in a way that makes sense for your application
                    }
                })
            ) : null;
        }
        else {
            // slide.addText(key + ":" + value, { x: level + 0.5, y: level + 0.7, fontSize: 18 - level });

            return (
                <div key={key} style={{ marginLeft: `${30}px` }} className='border-l-2 border-indigo-500'>
                    {renderArrayOrObjectContent(key, level, isArray, isObject)}
                    {isObject ? renderAttributes(value, level + 1) : <span key={key} style={{ fontSize: '20px' }} dangerouslySetInnerHTML={{ __html: value }} />}
                </div>
            )
        }
    }



    function renderArrayOrObjectContent(key, level, isArray, isObject) {
        if (isArray) {
            if (isObject) {
                return null
                // return <span>{Number(key) + 1}. </span>
            }
            else {
                return <span>{Number(key) + 1}. </span>
            };
        }

        else {
            if (key !== 'parts' && key !== 'part') {
                return (
                    <span
                        style={{
                            color: `hsl(330, 50%, ${level * 10}%)`,
                            fontWeight: `${800 - level * 100}`,
                        }}
                        className={`font-medium hover:font-bold text-xl`}
                    >
                        {renderBulletin(level)}
                        {renderKey(key, level)}
                    </span>
                );
            }
        }

        return null; // You can modify this to return a default component if needed
    }

    function renderBulletin(level) {
        if (level === 0) {
            return (<span># </span>)
        } else if (level === 1) {
            return (<span>❖ </span>)
        } else if (level === 2) {
            return (<span>⟣ </span>)
        } else {
            return (<span>⬦</span>)
        }
    }

    function renderKey(key, level) {
        let formattedKey = key;

        if (key.endsWith('_sn')) {
            // Remove _sn and format to italic
            formattedKey = `<i>${formattedKey.replace(/_sn$/, '')}</i>`;
        }
        if (level === 0) {
            // Change to uppercase if level is 0
            formattedKey = formattedKey.toUpperCase().replace(/_/g, ' ');
        } else {
            // Change to title case if level is not 0
            formattedKey = formattedKey.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/_/g, ' ');
        }

        return <span dangerouslySetInnerHTML={{ __html: formattedKey + ': ' }} />;
    }





    pptx.writeFile(lessonName);
};

const LessonContent = ({ jsonData, lessonName }) => {
    // const jsonData1 = JSON.parse(jsonData);

    if (!jsonData) {
        return <div>No data available</div>;
    }

    const jsonData1 = JSON.parse(jsonData);

    const handlePresentation = () => {
        Presentation(jsonData1, lessonName);
    };

    return (
        <>
            <button onClick={handlePresentation}>Click me</button>
            {/* <button onClick={pptx.writeFile('MyPresentation')}>Click me</button> */}
            {

                // renderAttributes(jsonData1)

            }
        </>
    )

        ;
};
export default LessonContent;