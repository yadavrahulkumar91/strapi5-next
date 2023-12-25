
import React from 'react';
import Book from './book'
import Teacher from './teacher'
import Link from 'next/link';


// const a = 'http://localhost:1337';
const a = 'https://gamechanger-f5da7.web.app';

import GetData from '../components/GetData';

export default async function Page() {
    const url = '/api/classes?populate=*&sort=id:asc';
    const classes = await GetData(url);
    return (
        <main>
            <div className="group/1 " tabindex="0">
                <p className="text-md mx-2 underline" >Books</p>
                <div className='absolute'>

                    {classes.map((Class) => (
                        <div key={Class.id} className="p-0 m-0 group hover:bg-sky-500  group-hover/1:block  hidden " tabindex="0">
                            <div className="">{Class.attributes.Class_name}</div>
                            <div className="p-0 m-0 flex hidden group-hover:block group-focus:block" tabindex="0">
                                {Class.attributes.books?.data && <Book books={Class.attributes.books.data} />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="group/1 mx-2 underline" tabindex="0">
                <Link href={`/homeTuitionTutor`}>
                <p className="text-md" >Home tuition tutors</p>
                </Link>
                <div className='absolute'>

                    {classes.map((Class) => (
                        <div key={Class.id} className="p-0 m-0 group hover:bg-sky-500  group-hover/1:block group-focus/1:block hidden " tabindex="0">
                            <div className="">Home tutor for {Class.attributes.Class_name}</div>
                            <div className="p-0 m-0 flex hidden group-hover:block" tabindex="0">
                                {Class.attributes.books?.data && <Teacher books={Class.attributes.teachers.data} />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </main>
    )
}




// "use client"


// import React, { useState } from 'react';
// import Book from './book';
// import GetData from '../components/GetData';

// const baseUrl = 'https://gamechanger-f5da7.web.app';

// export default async function Page() {
//     const [hoveredClass, setHoveredClass] = useState(null);

//     const handleClassHover = (classId) => {
//         setHoveredClass(classId);
//     };

//     const url = '/api/classes?populate=*&sort=id:asc';
//     const classes = await GetData(url);

//     return (
//         <main>
//             <div className="">
//                 {classes.map((Class) => (
//                     <div
//                         key={Class.id}
//                         className={`border pl-5 ${hoveredClass === Class.id ? 'hovered' : ''}`}
//                         onMouseEnter={() => handleClassHover(Class.id)}
//                         onMouseLeave={() => handleClassHover(null)}
//                     >
//                         <div>{Class.attributes.Class_name}</div>
//                         <div className="flex">
//                             {hoveredClass === Class.id && Class.attributes.books?.data && (
//                                 <Book books={Class.attributes.books.data} />
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <style jsx>{`
//         /* Add styles for the hovered class */
//         .hovered {
//           background-color: #f0f0f0; /* Adjust the background color as needed */
//         }
//       `}</style>
//         </main>
//     );
// }
