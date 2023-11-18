
import React from 'react';
import Class from './Class'
const a = 'http://localhost:1337';

import GetData from './GetData';


export default async function Page() {
    const url = '/api/sections?populate=*';
    const sections = await GetData(url);
    // console.log(sections);
    return (
        <main>
            <h2>Section List</h2>
            <ul>
                {sections.map((section) => (
                    <li key={section.id} >

                        <div className="content">
                          
                                <h1>{section.attributes.section_name}</h1>
                                <p>{section.attributes.short_description}</p>
                                <img
                                    src={a + section.attributes.section_pic.data[0].attributes.url}
                                    alt={section.attributes.section_pic.data[0].attributes.name}
                                    width="200px"
                                // height={section.attributes.section_pic.data[0].attributes.height}
                                />
                     
                            <Class classes={section.attributes.classes} />
                        </div>


                    </li>
                ))}
            </ul>
        </main>
    )
}