"use client";
import { useState, useEffect } from "react";
import LessonContent from "../note/[slug]/[slug1]/lessonContent/lessonContent";
import data1 from "../../content/MBBS preparation/MBBS 2nd year TU/gasto_mbbs_2nd_tu/Microbiology/60_Entamoeba histolytica/60_Entamoeba histolytica.json";
import Editor from "@monaco-editor/react";

const WYSIWYGEditor = () => {
  const [lessonId, setLessonId] = useState("");
  const [editorContent, setEditorContent] = useState("{}");
  const [status, setStatus] = useState("");

  const fetchLessonContent = async (id) => {
    if (!id) return;
    try {
      const res = await fetch(`/api/get-lesson-content?id=${id}`);
      const data = await res.json();
      setEditorContent(data.lesson_content || {});
    } catch (error) {
      console.error("Error fetching lesson content:", error);
    }
  };

  const saveContent = async () => {
    if (!lessonId || !editorContent) {
      setStatus("Lesson ID and content are required.");
      return;
    }

    try {
      const res = await fetch("/api/update-lesson-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId,
          fileContent: editorContent,
        }),
      });

      if (res.ok) {
        setStatus("Content saved successfully!");
      } else {
        setStatus("Error saving content.");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      setStatus("Error saving content.");
    }
  };

  const handleEditorChange = (newContent) => {
    // setEditorContent((prevContent) => ({
    //   ...prevContent,
    //   ...newContent,
    // }));

    setEditorContent(newContent);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>WYSIWYG Editor</h1>
      <label>
        Lesson ID:
        <input
          type="text"
          value={lessonId}
          onChange={(e) => setLessonId(e.target.value)}
          placeholder="Enter Lesson ID"
          style={{ marginLeft: "10px" }}
        />
      </label>
      <button
        onClick={() => fetchLessonContent(lessonId)}
        style={{ marginLeft: "10px" }}
      >
        Load Lesson
      </button>

      <div
        style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}
      >
        {/* Replace with a proper editor */}
        {/* <textarea
          value={editorContent}
          onChange={(e) => handleEditorChange(e.target.value)}
          rows="20"
          style={{ width: "100%" }}
        ></textarea> */}
        {/* <Editor
          height="90vh"
          defaultLanguage="json"
          //   defaultValue={editorContent}
          //   onChange={(e) => handleEditorChange(e.target.value)}
        /> */}
        <Editor
          height="400px"
          defaultLanguage="json"
          value={editorContent}
          //   defaultValue={editorContent}
          onChange={handleEditorChange}
          //   theme="vs-dark"
          options={{
            minimap: { enabled: false },
            formatOnPaste: true,
            formatOnType: true,
            wordWrap: "on",
            tabSize: 2,
          }}
        />
      </div>
      <div className="">
        <div className="bg-orange-300 font-bold text-center align-middle py-2 text-3xl font-serif uppercase">
          Palmar arches
        </div>

        {(() => {
          try {
            const parsedContent = JSON.parse(editorContent);
            return <LessonContent lessonContent={parsedContent} />;
          } catch (error) {
            console.error("Invalid JSON in editorContent:", error);
            return null; // Render nothing if JSON is invalid
          }
        })()}
      </div>

      <button
        onClick={saveContent}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Save Content
      </button>
      {status && <p style={{ marginTop: "10px" }}>{status}</p>}
    </div>
  );
};

export default WYSIWYGEditor;
