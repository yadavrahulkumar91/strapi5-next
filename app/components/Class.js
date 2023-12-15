// pages/Class.js

import React from 'react';
import Link from 'next/link';

export default function Class ({ classes }) {
    return (
        <div className="">
            {/* <h1>Class Page</h1> */}
        
                
                {classes.data.map((classItem) => (
                 
                        <Link href={`/class/${classItem.id}`}>
                    <div  className="p-6 border rounded-lg shadow-md ">
                        <strong>Class: {classItem.attributes.Class_name}</strong>
                      
                </div>
                        </Link>
                ))}
           
        </div>
    );
};


