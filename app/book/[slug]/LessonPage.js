
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
            {unit.Lesson.map(lesson => (
                <div key={lesson.id} className='container' id={`lesson-${lesson.id}`}>
                    <div className='line'></div>
                    <div className='lesson-title'>{lesson.Lesson_name}</div>
                    {/* <div dangerouslySetInnerHTML={{ __html: lesson.Lesson_content }} /> */}
                    {/* <ReactMarkdown  rehypePlugins={[rehypeRaw]} >{lesson.Lesson_content}</ReactMarkdown> */}
                    {/* <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{markdown}</ReactMarkdown>
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]} >{markdown}</ReactMarkdown> */}
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]} >{lesson.Lesson_content}</ReactMarkdown>

                    {/* <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {lesson.Lesson_content}
                    </ReactMarkdown> */}

                    {/* <ReactMarkdown > {lesson.Lesson_content} </ReactMarkdown> */}


                    <h4>MCQs</h4>
                    {lesson.MCQ.map(mcq => (
                        <div key={mcq.id}>
                            <p>{mcq.Question}</p>
                            <ul>
                                <li>{mcq.Option_a}</li>
                                <li>{mcq.Option_b}</li>
                                <li>{mcq.Option_c}</li>
                                <li>{mcq.Option_d}</li>
                            </ul>
                            <p>Correct Answer: {mcq.Correct_answer}</p>
                            <p>Explanation: {mcq.Explanation}</p>
                        </div>
                    ))}

                    <h4>Question Answers</h4>
                    {lesson.Question_answer.map(qa => (
                        <div key={qa.id}>
                            <p>{qa.Question}</p>
                            <p>Answer: </p>
                            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]} >{qa.Answer}</ReactMarkdown>

                        </div>
                    ))}
                </div>
            ))}

        </div>
    );
};

export default LessonPage;
