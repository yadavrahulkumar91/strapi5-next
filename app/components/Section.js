// "use client"
import React from 'react';
import Class from './Class'
// const a = 'http://localhost:1337';
const a = 'https://gamechanger-f5da7.web.app';
import Image from 'next/image';
import axios from 'axios';
import GetData from './GetData';



export default async function Page() {
    const url = '/api/sections?populate=*&sort=id:asc';
    const sections = await GetData(url);

    const { data: { data: axiosData } } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/sections?populate=*&sort=id:asc`);

    if (!axiosData) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            {/* <PhotoProvider>
                <PhotoView src="/rupesh_yadav_profile_pic.jpg">
                </PhotoView>
            </PhotoProvider> */}
           
            <div className="">
                {axiosData.map((section) => (


                    <div className="p-6 border rounded-lg shadow-md" key={section.id}>
                       <h1>{section.attributes.section_name}</h1>
                        <div className="flex">
                            {/* {section.attributes.section_pic?.data[0]?.attributes?.url && (
                                <img
                                    key={section.id}
                                    src={section.attributes.section_pic?.data[0]?.attributes?.url}
                                    alt={`Cover for ${section.attributes.section_pic?.data[0]?.attributes?.name}`}
                                    style={{ width: '200px', height: '200px' }}
                                />
                            )} */}
                            {section.attributes.section_pic?.data && section.attributes.section_pic.data[0]?.attributes?.url && (
                                <img
                                    key={section.id}
                                    src={section.attributes.section_pic.data[0].attributes.url}
                                    alt={`Cover for ${section.attributes.section_pic.data[0].attributes.name}`}
                                    style={{ width: '200px', height: '200px' }}
                                />
                            )}

                            {/* <Image
                                src={section.attributes.section_pic.data[0].attributes.url}
                                alt={section.attributes.section_pic.data[0].attributes.name}
                                width="200"
                                height='200'
                            /> */}
                            <Class classes={section.attributes.classes} />
                        </div>
                        <p>{section.attributes.short_description}</p>
                    </div>



                ))}
            </div>

        </main>
    )
}