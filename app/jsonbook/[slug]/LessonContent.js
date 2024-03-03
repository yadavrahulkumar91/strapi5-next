"use client";
import React from 'react';
import MathJax from 'react-mathjax';
import { Mermaid } from 'mdx-mermaid/Mermaid';
import { Chart } from "react-google-charts";

const PericardiumInfo = ({ pericardiumData }) => {
    // const pericardiumData1 = JSON.parse(pericardiumData);

    if (!pericardiumData) {
        return <div>No data available</div>;
    }

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

    return null; 
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
