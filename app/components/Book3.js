// pages/index.js
"use client"
import React, { useState, useEffect } from 'react';
import Book3List from '../components/Book3List';
import Book3Details from '../components/Book3Details';

const Home = () => {
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/book3s?populate=*', {
                    // headers: {
                    //     Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual access token
                    // },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setLessons(data.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLessonClick = (lesson) => {
        setSelectedLesson(lesson);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (lessons.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div className="container">
            <Book3List lessons={lessons} onLessonClick={handleLessonClick} />
            <Book3Details selectedLesson={selectedLesson} />
        </div>
    );
};

export default Home;
