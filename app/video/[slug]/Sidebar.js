

"use client"

import React, { useState } from 'react';
import ContentPage from './ContentPage';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

export default function SideBar({ units }) {
    // const [showSidebar, setShowSidebar] = useState(false);

    // const toggleSidebar = () => {
    //     setShowSidebar(!showSidebar);
    // };
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);

    return (
        <div className=''>
                   <Sidebar collapsed={collapsed} collapsedWidth="60px" onBackdropClick={() => setToggled(false)} toggled={toggled} 
                //    breakPoint="always"
                   >
                <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
                    Collapse
                </button>

                <Menu renderExpandIcon={({ open }) => <span>{open ? '-' : '+'}</span>}>
                    {units.map((unit, index) => (
                        <div key={index}>
                            <SubMenu defaultOpen label={unit.Unit_name} >
                                {/* <h2>{unit.Unit_name}</h2> */}
                                <ul>
                                    {unit.Lesson.map((lesson, lessonIndex) => (
                                        <li key={lessonIndex}>
                                            <MenuItem>
                                                <a href={`#lesson-${lesson.id}`}>{lesson.Lesson_name}</a>
                                            </MenuItem>
                                        </li>
                                    ))}
                                </ul>

                            </SubMenu>
                        </div>
                    ))}

                </Menu>
            </Sidebar>






            {/* <button className="sb-button" onClick={() => setToggled(!toggled)}>
                Toggle
            </button> */}

        </div>
    );
};




