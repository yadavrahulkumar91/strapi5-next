"use client";
import React from 'react';
import MathJax from 'react-mathjax';
import { Mermaid } from 'mdx-mermaid/Mermaid';
import { Chart } from "react-google-charts";

const PericardiumInfo = ({ pericardiumData }) => {

    const renderAttributes = (attributes, level = 0) => {
        if (!attributes || typeof attributes !== 'object') {
            return ;
        }
        const isArray = Array.isArray(attributes);

        return Object.entries(attributes).map(([key, value]) => {
            const isObject = typeof value === 'object';
        
            if (key === 'name') {
                key = value;
                value = null;
            } else if (key === 'image' && value && value.data && value.data.attributes && value.data.attributes.url) {
                return (
                    <figure key={key} style={{ float: 'right' }}>
                        <img src={value.data.attributes.url} width={400} alt="Image" />
                        <figcaption>Fig. {value.data.attributes.caption} </figcaption>
                    </figure>
                );
            } else if (key === 'formula') {
                return (
                    <MathJax.Provider key={key}>
                        <div>
                            <MathJax.Node formula={value} />
                        </div>
                    </MathJax.Provider>
                );
            } else if (key === 'mermaid') {
                const mermaidChart = value.join('\n');
                return (
                    <Mermaid key={key} chart={mermaidChart} />
                );
            } else if (key === 'google_chart') {
                console.log(value);
                return (
                    <Chart key={key} chartType="ScatterChart" data={{ value }} width="100%" height="400px" legendToggle />
                );
            }

            return (
                <div key={key} style={{ marginLeft: `${30}px`, }} className='border-l-2 border-indigo-500'>
                
                  
                  
                    {isArray ? <span>{Number(key) + 1}. </span> :
                        (key !== 'parts' && key !== 'part') && (
      
                            <div style={{ color: `hsl(330, 50%, ${level*10}%)`, fontWeight: `${800 - level * 100}` }} className={`font-medium hover:font-bold text-xl`}>
                                {(level===0)? <span># </span>: null}
                                {(level===1)? <span>⟣ </span>: null}
                                {(level === 2) ? <span>* </span> : <span>☞</span>}
                                {(level === 0) ? key.toUpperCase().replace(/_/g, ' ') : key.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/_/g, ' ')}:{' '}
                            </div>


                        )
                    }

                    {isObject ? renderAttributes(value, level + 1) : <span key={key} style={{fontSize: '20px'}}>{value}</span>}
                </div>
            );
        });
    };

    return <div>{renderAttributes(pericardiumData)}</div>;
};

export default PericardiumInfo;
