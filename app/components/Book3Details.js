// components/Book3Details.js
"use client"
// import React from 'react';
const a = 'http://localhost:1337';

// const Book3Details = ({ selectedLesson }) => {
//     return (
//         <div className="content">
//             {selectedLesson ? (
//                 <div>
//                     <h1>{selectedLesson.attributes.Lesson_name}</h1>
//                     <div dangerouslySetInnerHTML={{ __html: a+selectedLesson.attributes.html_file.data[0].attributes.url }} />
//                 </div>
//             ) : (
//                 <div>Select a lesson from the list</div>
//             )}
//         </div>
//     );
// };

// export default Book3Details;




// components/Book3Details.js

import React, { useEffect, useState } from 'react';

const Book3Details = ({ selectedLesson }) => {
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        const fetchHtmlContent = async () => {
            try {
                const response = await fetch(a+selectedLesson.attributes.html_file.data[0].attributes.url);

                if (!response.ok) {
                    throw new Error('Failed to fetch HTML content');
                }

                const html = await response.text();
                setHtmlContent(html);
            } catch (error) {
                console.error('Error fetching HTML content:', error.message);
                setHtmlContent('Error loading HTML content');
            }
        };

        if (selectedLesson) {
            fetchHtmlContent();
        }
    }, [selectedLesson]);

    const manipulateHtmlContent = (content) => {
        // Add your JavaScript-based manipulations here
        // Example: Append a message to the content
        return content + '<p>This content has been modified using JavaScript!</p>';
    };

    return (
        <div className="content">
            {selectedLesson ? (
                <div>
                    <h1>{selectedLesson.attributes.Lesson_name}</h1>
                    <div dangerouslySetInnerHTML={{ __html: manipulateHtmlContent(htmlContent) }} />
                </div>
            ) : (
                <div>Select a lesson from the list</div>
            )}
        </div>
    );
};

export default Book3Details;
