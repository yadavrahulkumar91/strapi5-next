

"use client"

import React, { useState } from 'react';
import ContentPage from './ContentPage';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

export default function  SideBar  ({ units }) {
    // const [showSidebar, setShowSidebar] = useState(false);

    // const toggleSidebar = () => {
    //     setShowSidebar(!showSidebar);
    // };
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);

    return (
        <>
        {/* <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
            <button className='toggleButton' onClick={toggleSidebar}></button>
        </div> */}

            <Sidebar collapsed={collapsed} collapsedWidth="60px" onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="always">
                <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
                    Collapse
                </button>
                <Menu renderExpandIcon={({ open }) => <span>{open ? '-' : '+'}</span>} menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        // only apply styles on first level elements of the tree
                        if (level === 0)
                            return {
                                color: disabled ? '#f5d9ff' : '#d359ff',
                                backgroundColor: active ? '#eecef9' : undefined,
                            };
                    },
                }}>
        <ContentPage className='contentPage' units={units} />
                    {/* <SubMenu label="Charts">
                        <MenuItem> Pie charts </MenuItem>
                        <MenuItem> Line charts </MenuItem>
                    </SubMenu>
                    <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem> */}
                </Menu>
            </Sidebar>

            <button className="sb-button" onClick={() => setToggled(!toggled)}>
                Toggle
            </button>
        
        </>
    );
};




