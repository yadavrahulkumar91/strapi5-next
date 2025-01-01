"use client";
import { useState, useEffect } from "react";
import LessonContent from "./lessonContent/lessonContent";
import Editor from "@monaco-editor/react";
import ListFiles from "./ListFiles";

const WYSIWYGEditor = ({ id }) => {
  const [editorContent, setEditorContent] = useState("{}");
  const [lastValidContent, setLastValidContent] = useState({});
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchLessonContent = async (id) => {
      if (!id) return;
      try {
        const res = await fetch(`/api/getLessonContent?id=${id}`);
        const data = await res.json();
        setEditorContent(data.lesson_content || "{}");
        // setEditorContent(data.lesson_content);
        setLastValidContent(JSON.parse(data.lesson_content || "{}"));
      } catch (error) {
        console.error("Error fetching lesson content:", error);
      }
    };

    fetchLessonContent(id);
  }, [id]);

  // Save content to the API
  const saveContent = async () => {
    if (!id || !editorContent) {
      setStatus("Lesson ID and content are required.");
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch("/api/update-lesson-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId: id,
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
    } finally {
      setIsSaving(false);
    }
  };

  // Handle editor content changes
  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);

    try {
      // Try parsing the new content to validate JSON
      const parsedContent = JSON.parse(newContent);
      setLastValidContent(parsedContent);
    } catch {
      // Invalid JSON; keep showing the last valid content
    }
  };

  return (
    <>
      <div className="flex w-full h-full">
        {/* JSON Editor */}
        <div
          style={{
            border: "1px solid #ccc",
            display: "grid",
            gridTemplateRows: "auto 25px",
          }}
          className="w-1/2 h-full box-border"
        >
          <Editor
            // height="95%"
            defaultLanguage="json"
            value={editorContent}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              formatOnPaste: true,
              formatOnType: true,
              wordWrap: "on",
              tabSize: 2,
            }}
          />

          <button
            onClick={saveContent}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>

          {status && <div>{status}</div>}
        </div>

        {/* Rendered Lesson Content */}
        <div className="w-1/2 h-[100%] overflow-y-scroll">
          <LessonContent lessonContent={lastValidContent} />
        </div>
      </div>
      {/* <ListFiles folderId={id} /> */}
    </>
  );
};

export default WYSIWYGEditor;
