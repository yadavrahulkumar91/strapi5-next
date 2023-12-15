

"use client"

import React, { useState } from 'react';
import ContentPage from './ContentPage';

const Sidebar = ({ units }) => {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
    
        <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
            {/* <div className={`page-content ${showSidebar ? 'with-sidebar' : ''}`}> */}
            <ContentPage className='contentPage' units={units} />
            <button className='toggleButton' onClick={toggleSidebar}></button>
        </div>
        
    );
};

export default Sidebar;
