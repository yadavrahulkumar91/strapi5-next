
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import 'katex/dist/katex.min.css'
import MCQ from './mcq'
import PericardiumInfo from './PericardiumInfo';

const LessonPage = ({ unit }) => {
    return (
        <div>
            {unit.Lesson.map(lesson => (
                <div key={lesson.id} className=' ' style={{ borderRadius: "1%", border: "2px solid black" }} id={`lesson-${lesson.id}`} >
                    <div className='lesson-title sticky top-0 text-blue' style={{ position: "sticky" }}>{lesson.Lesson_name}</div>
                    {lesson.video_url &&
                        <iframe
                            width="100%"
                            height="100vh"
                            src={lesson.video_url}
                            frameBorder="0"
                            allowFullScreen
                            style={{ width: '100%', height: "60vh" }}
                        ></iframe>
                    }
                    {/* <hr style={{ width: '100%', borderColor: 'orange', borderWidth: '5px', padding:'0px', margin:'0px', offset:'0px' }} /> */}

                    <div style={{ width: '100%', height: "95vh", overflow: "scroll",  }}>

                 
                        <PericardiumInfo pericardiumData={lesson.lesson_content} />

                        <h4>MCQs </h4>
                        <MCQ lesson={lesson} />

                        <h4>Question Answers</h4>
                        {lesson.Question_answer.map(qa => (
                            <div key={qa.id}>
                                <p>{qa.Question}</p>
                                <p>Answer: </p>
                                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]} >{qa.Answer}</ReactMarkdown>

                            </div>
                        ))}
                    </div>




                </div>
            ))}

        </div>
    );
};

export default LessonPage;
