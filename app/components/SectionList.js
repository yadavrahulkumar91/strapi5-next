// components/SectionList.js

"use client"

import React from 'react';

import Class from './Class'
const a = 'http://localhost:1337';
const b = 'http://localhost:3000';

const SectionList = ({ sections }) => {


    return (
        <div className="sidebar">
            <h2>Section List</h2>
            <ul>
                {sections.map((section) => (
                    <li key={section.id} >
                        {/* <Link href={"/"+section.attributes.url}> */}
                        {/* <Link href={`/${section.id}`} as={"/" + section.attributes.url} passHref> */}
                      
                            <div className="content">
                                <div>
                                    <h1>{section.attributes.section_name}</h1>
                                    <p>{section.attributes.short_description}</p>
                                    <img
                                        src={a + section.attributes.section_pic.data[0].attributes.url}
                                        alt={section.attributes.section_pic.data[0].attributes.name}
                                        width="200px"
                                    // height={section.attributes.section_pic.data[0].attributes.height}
                                    />
                                </div>
                                <Class classes={section.attributes.classes} /> 
                            </div>
                      
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SectionList;
