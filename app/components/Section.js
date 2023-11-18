
import React from 'react';
import SectionList from '../components/SectionList';





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