// pages/Class.js

import React from 'react';
import Link from 'next/link';

export default function Class ({ classes }) {
    return (
        <div>
            {/* <h1>Class Page</h1> */}
            <ul>
                
                {classes.data.map((classItem) => (
                    <li key={classItem.id} className="border-b-4">

                        <Link href={`/class/${classItem.id}`}>
                        <strong>Class Name:</strong> {classItem.attributes.Class_name}
                        <br />
                        <strong>Created At:</strong> {classItem.attributes.createdAt}
                        <br />
                        <strong>Updated At:</strong> {classItem.attributes.updatedAt}
                        <br />
                        <strong>Published At:</strong> {classItem.attributes.publishedAt}
                        <br />
                        <br />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};


