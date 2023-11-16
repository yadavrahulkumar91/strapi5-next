"use client"


// pages/index.js

import React, { useState, useEffect } from 'react';
import SectionList from '../components/SectionList';
import SectionDetails from '../components/SectionDetails';

const Home = () => {
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/sections?populate=*', {
                    // headers: {
                    //     Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual access token
                    // },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setSections(data.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (sections.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div className="container">
            <SectionList sections={sections} onSectionClick={handleSectionClick} />
            <SectionDetails selectedSection={selectedSection} />
        </div>
    );
};

export default Home;
