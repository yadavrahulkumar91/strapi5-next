// components/SectionDetails.js

import React from 'react';
const a = 'http://localhost:1337';

const SectionDetails = ({ selectedSection }) => {
    return (
        <div className="content">
            {selectedSection ? (
                <div>
                    <h1>{selectedSection.attributes.section_name}</h1>
                    <p>{selectedSection.attributes.short_description}</p>
                    <img
                        src={a+selectedSection.attributes.section_pic.data[0].attributes.url}
                        alt={selectedSection.attributes.section_pic.data[0].attributes.name}
                        width="200px"
                        // height={selectedSection.attributes.section_pic.data[0].attributes.height}
                    />
                </div>
            ) : (
                <div>Select a section from the list</div>
            )}
        </div>
    );
};

export default SectionDetails;
