"use client";
import React from 'react';
import MathJax from 'react-mathjax';
import { Mermaid } from 'mdx-mermaid/Mermaid';
import { Chart } from "react-google-charts";

const PericardiumInfo = ({ pericardiumData }) => {
    const pericardiumData1 = JSON.parse(pericardiumData);
    return <div>{renderAttributes(pericardiumData1)}</div>;
};
export default PericardiumInfo;


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


function renderObject(key, value, isArray, isObject, level) {

    if (key === 'name') {
        key = value;
        value = null;
    }
    if (/^image\d*$/.test(key)) {
        return (
            // <div>
            //     {(value && Array.isArray(value) && value.length > 0) ? value.map((image, index) => (
            //         <figure key={index} style={{ float: `${image.data.attributes.float ? image.data.attributes.float : null}`, marginRight: '10px' }}>
            //             <img src={image.data.attributes.url} width={image.data.attributes.width ? image.data.attributes.width : 400} alt={`Image ${index + 1}`} />
            //             <figcaption>Fig. <span key={index} dangerouslySetInnerHTML={{ __html: image.data.attributes.caption }} /></figcaption>
            //         </figure>
            //     )) : null}
            // </div>
            <div>
                {(value && Array.isArray(value) && value.length > 0) ? value.map((image, index) => (
                    <figure key={index} 
                    // style={{ float: `${image.data.attributes.float ? image.data.attributes.float : null}`, marginRight: '10px' }}
                    >
                        <img src={image.url} width={image.width ?  image.width : 400} alt={`Image ${index + 1}`} />
                        <figcaption>Fig. <span key={index} dangerouslySetInnerHTML={{ __html: image.caption }} /></figcaption>
                    </figure>
                )) : null}
            </div>
        );
    }
    else if (/^table\d*$/.test(key)) {
        return (
            <div>
                {(value && Array.isArray(value) && value.length > 0) ? value.map((table, tableIndex) => (
                    <table key={tableIndex} border="1">
                        <tbody>
                            {table.data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        rowIndex === 0 ? (
                                            <th key={cellIndex}>{cell}</th>
                                        ) : (
                                            <td key={cellIndex}>
                                                {Array.isArray(cell) ? (
                                                    <ul>
                                                        {cell.map((item, itemIndex) => (
                                                            <li key={itemIndex}>{item}</li>
                                                        ))}
                                                    </ul>
                                                ) : cell}
                                            </td>
                                        )
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )) : null}
            </div>
        );
    }
    else if (key === 'formula' || key === 'math') {
        return (
            <>
                {(value && Array.isArray(value) && value.length > 0) ? value.map((formula, index) => (
                    <MathJax.Provider key={key}>
                        <div>
                            <MathJax.Node formula={formula.data} />
                        </div>
                    </MathJax.Provider>

                )) : null}
            </>
        );
    }
    else if (/^mermaid\d*$/.test(key)) {
        return (value && Array.isArray(value) && value.length > 0) ? (
            // value.map((chartObject, index) => {
            //     const { data } = chartObject;

            //     if (Array.isArray(data)) {
            //         const mermaidChart = data.join('\n');
            //         return <Mermaid key={index} chart={mermaidChart} />;
            //     } else {
            //         // Handle the case where data is not an array (optional)
            //         console.error(`Invalid data format at index ${index}. Expected an array.`);
            //         return null; // or handle it in a way that makes sense for your application
            //     }
            // })



            // value.map((chartObject, index) => {
            //     const { type, data } = chartObject;

            //     if (type === 'graph TD' && Array.isArray(data) && data.length > 0) {
            //         const mermaidChart = [
            //             type,
            //             ...data.map((item, i) => `${String.fromCharCode(65 + i)}["${item}"]`)
            //         ].join('\n');

            //         return <Mermaid key={index} chart={mermaidChart} />;
            //     } else {
            //         // Handle the case where the chart type is not supported, data is not an array, or data is empty (optional)
            //         console.error(`Invalid chart object at index ${index}.`);
            //         return null; // or handle it in a way that makes sense for your application
            //     }
            // })


            value.map((chartObject, index) => {
                const { type, data } = chartObject;

                if (type === 'graph TD' && Array.isArray(data) && data.length > 0) {
                    const mermaidChart = [
                        type,
                        ...data.map((item, i) => `${String.fromCharCode(65 + i)}["${i + 1}) ${item}"]`),
                        ...data.slice(0, -1).map((_, i) => `${String.fromCharCode(65 + i)} --> ${String.fromCharCode(66 + i)}`)
                    ].join('\n');

                    return <Mermaid key={index} chart={mermaidChart} />;
                } else {
                            const mermaidChart = data.join('\n');
                    return <Mermaid key={index} chart={mermaidChart} />;
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
            return <span style={{ fontSize: '20px' }}>{Number(key) + 1}. </span>
        };
    }

    else {
        if (key !== 'parts' && key !== 'part') {
            return (
                <span
                    style={{
                        color: `hsl(330, 50%, ${level * 10}%)`,
                        backgroundColor: level === 0 ? 'lightgrey' : null, // Set red background color for level 0
                        fontWeight: `${800 - level * 100}`,
                        display: level === 0 ? 'block' : null,
                        // padding: '5px',
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
        return (<span>▢ </span>)
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
        const style = {
            backgroundcolor: "red"
        }
        formattedKey = formattedKey.toUpperCase().replace(/_/g, ' ');
    } else {
        // Change to title case if level is not 0
        formattedKey = formattedKey.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/_/g, ' ');
    }

    return <span dangerouslySetInnerHTML={{ __html: formattedKey + ': ' }} />;
}


// function renderKey(key, level) {
//     let formattedKey = key;
//     let style = {}; // Declare style outside the if block

//     if (key.endsWith('_sn')) {
//         // Remove _sn and format to italic
//         formattedKey = `<i>${formattedKey.replace(/_sn$/, '')}</i>`;
//     }
//     if (level === 0) {
//         // Change to uppercase if level is 0
//         style = {
//             backgroundColor: "red" // Fix the camelCase for backgroundColor
//         };
//         formattedKey = formattedKey.toUpperCase().replace(/_/g, ' ');
//     } else {
//         // Change to title case if level is not 0
//         formattedKey = formattedKey.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/_/g, ' ');
//     }

//     return <span style={style} dangerouslySetInnerHTML={{ __html: formattedKey + ': ' }} />;
// }