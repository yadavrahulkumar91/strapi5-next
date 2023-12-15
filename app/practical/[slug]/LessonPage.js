
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'

import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you



const LessonPage = ({ unit }) => {
    const markdown = `The lift coefficient ($C_L$) is a dimensionless coefficient.
    $$C_2$$
    <p>Hi $c_2$<p>
    `

    return (
        <div>
            {unit.Topic.map(lesson => (
                <div key={lesson.id} className='container' id={`lesson-${lesson.id}`}>
                    <div className='line'></div>
                    <div className='lesson-title'>{lesson.Name}</div>
               
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]} >{lesson.Description}</ReactMarkdown>

                </div>
            ))}

        </div>
    );
};

export default LessonPage;
