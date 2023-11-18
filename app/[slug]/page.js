import React from 'react';

const getData = async (id) => {
    try {
        const response = await fetch('http://127.0.0.1:1337/api/classes/'+{id}+'?populate=*');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export default function Page({ params }) {


    getData( params.slug );
    return <div>My Post: {params.slug}</div>
}
