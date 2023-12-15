// const HomePage = async ({ params }) => {

//     const url = '/api/teachers/' + params.slug + '?populate=*';
//     const data = await GetData(url);

//     return (
//         <div>

//         </div>
//     );
// };


// export default HomePage;






import React from 'react';
import GetData from '../../components/GetData';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';


// const a = 'http://localhost:1337';
const a = 'https://gamechanger-f5da7.web.app';

const HomePage = async ({ params }) => {
    // Assuming the API endpoint returns a teacher object
    const url = '/api/teachers/' + params.slug + '?populate=*';
    const teacherData = await GetData(url);
    console.log(teacherData);

    // Ensure the data has loaded before rendering
    if (!teacherData) {
        return <div>Loading...</div>;
    }

    const {
        id,
        attributes: {
            Teacher_name,
            Telephone,
            Description,
            createdAt,
            updatedAt,
            publishedAt,
            Email_Address,
            Profile_picture,
            classes,
        },
    } = teacherData;

    return (
        <div>
            {Profile_picture && (
                <img
                    src={a + Profile_picture.data.attributes.url}
                    alt={Profile_picture.data.attributes.name}
                    width={300}
                />
            )}
            <h1>{Teacher_name}</h1>

            <p>Telephone: {Telephone || 'Not provided'}</p>
            <p>Email Address: {Email_Address || 'Not provided'}</p>
            <h2>Classes Taught:</h2>
            <ul>
                {classes.data.map((cls) => (
                    <li key={cls.id}>{cls.attributes.Class_name}</li>
                ))}
            </ul>

            <h2>Description:            </h2>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>

                {Description || 'Not provided'}
            </ReactMarkdown>



            {/* Display Profile Picture */}

            {/* Display Classes */}
        </div>
    );
};

export default HomePage;
