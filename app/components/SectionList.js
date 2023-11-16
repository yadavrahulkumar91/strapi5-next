// components/SectionList.js

import React from 'react';

const SectionList = ({ sections, onSectionClick }) => {
    return (
        <div className="sidebar">
            <h2>Section List</h2>
            <ul>
                {sections.map((section) => (
                    <li key={section.id} onClick={() => onSectionClick(section)}>
                        {section.attributes.section_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SectionList;
