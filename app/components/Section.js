
import React from 'react';
import Class from './Class'
// const a = 'http://localhost:1337';
const a = 'https://gamechanger-f5da7.web.app';
import Image from 'next/image';

import GetData from './GetData';



export default async function Page() {
    const url = '/api/sections?populate=*&sort=id:asc';
    const sections = await GetData(url);

    return (
        <main>
            <div className="">
                {sections.map((section) => (


                    <div className="p-6 border rounded-lg shadow-md" key={section.id}>
                       <h1>{section.attributes.section_name}</h1>
                        <div className="flex">
                            <Image
                                src={section.attributes.section_pic.data[0].attributes.url}
                                alt={section.attributes.section_pic.data[0].attributes.name}
                                width="200"
                                height='200'
                            />
                            <Class classes={section.attributes.classes} />
                        </div>
                        <p>{section.attributes.short_description}</p>
                    </div>



                ))}
            </div>

        </main>
    )
}