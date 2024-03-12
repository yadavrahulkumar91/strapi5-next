// import React from 'react';
// import PptxGenJS from 'pptxgenjs';

// const Presentation = () => {
//     const pptx = new PptxGenJS();

//     pptx.defineSlideMaster({
//         title: 'MASTER_SLIDE',
//         objects: [
//             { text: { text: 'Welcome to My Presentation', options: { x: 1, y: 1, w: '100%', h: 1 } } }
//         ]
//     });

//     pptx.addSlide('MASTER_SLIDE', 'TITLE_SLIDE');

//     // Formatting text with HTML-like syntax
//     const formattedText = `
//     <p>This is a paragraph.</p>
//     <p style="color:red;">This is a red paragraph.</p>
//     <ul>
//       <li>Item 1</li>
//       <li>Item 2</li>
//     </ul>
//     <p><strong>Bold text</strong> and <em>italic text</em></p>
//   `;

//     pptx.addSlide('MASTER_SLIDE', 'TEXT_SLIDE', {
//         title: 'Formatted Text Example',
//         text: formattedText
//     });

//     pptx.writeFile('MyPresentation');

//     return <div>Presentation generated!</div>;
// };

// export default Presentation;


import React from 'react';
import PptxGenJS from 'pptxgenjs';

const Presentation = () => {
    const pptx = new PptxGenJS();

    pptx.defineSlideMaster({
        title: 'MASTER_SLIDE',
        objects: [
            { text: { text: 'Welcome to My Presentation', options: { x: 1, y: 1, w: '100%', h: 1 } } }
        ]
    });

    pptx.addSlide('MASTER_SLIDE', 'TITLE_SLIDE');
    pptx.addSlide('MASTER_SLIDE', 'TEXT_SLIDE', { title: 'Slide 2', text: 'This is slide 2' });
    pptx.addSlide('MASTER_SLIDE', 'TEXT_SLIDE', { title: 'Final Slide', text: 'Last slide' });

    pptx.writeFile('MyPresentation');

    return <div>Presentation generated!</div>;
};

export default Presentation;
