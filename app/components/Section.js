


// // pages/index.js

import React from 'react';
import SectionList from '../components/SectionList';



// const getData = async () => {
//           try {
//               const response = await fetch('http://localhost:1337/api/sections?populate=*', {
//                   // headers: {
//                   //     Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual access token
//                   // },
//               });

//               if (!response.ok) {
//                   throw new Error('Network response was not ok');
//               }

//              const data = response.json();
           
//               console.log(data);
//           } catch (error) {
//             console.log(error); 
//           }
//       };

// const Home = async () => {



//     const section = await getData();
//   console.log(section);

//     return (
//         <div className="container">
//             This is the container
//             {/* <SectionList sections={section}/> */}
//             {section}
   
          
//         </div>
//     );
// };

// export default Home;



// const getData = async () => {
//     try {
//         const response = await fetch('http://localhost:1337/api/sections?populate=*', {
//             // headers: {
//             //     Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual access token
//             // },
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json(); // Add 'await' here

//         console.log(data);
//         return data; // Return the data
//     } catch (error) {
//         console.log(error);
//     }
// };



// const Home = async () => {
//     const section = await getData();
//     console.log(section);

//     return (
//         <div className="container">
//             This is the container
//             {/* <SectionList sections={section}/> */}
//             {section}
//         </div>
//     );
// };



const getData = async () => {
    try {
        const response = await fetch('http://127.0.0.1:1337/api/sections?populate=*');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};


export default async function Page() {
    const data = await getData()
    const sections = data.data;
console.log(sections);
    return <main>Hi garmi
        <p></p>

        <SectionList sections={sections} /> 


    </main>
}