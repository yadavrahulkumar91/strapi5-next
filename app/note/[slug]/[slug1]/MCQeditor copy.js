// MCQeditor.js

"use client";
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import Editor from "@monaco-editor/react";

const WYSIWYGEditor = ({ id }) => {
  const [editorContent, setEditorContent] = useState("{}");
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchLessonContent = async () => {
      try {
        const res = await fetch(`/api/getMCQ?lessonId=${id}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        console.log("Fetched MCQs:", data);

        // Transform the fetched data into the desired format
        const formattedContent = data.mcqs.map((mcq) => [
          mcq.id,
          mcq.question, // Strip <p> tags for plain text
          mcq.options.A,
          mcq.options.B,
          mcq.options.C,
          mcq.options.D,
          mcq.answer,
          mcq.solution ? mcq.solution : null,
          mcq.askedYears,
        ]);

        console.log("Formatted MCQs:", formattedContent);

        // Set the transformed content to the editor
        // const newContent = JSON.stringify(formattedContent, null, 2);
        setEditorContent(JSON.stringify(formattedContent, null, 2));
      } catch (error) {
        console.error("Error fetching lesson content:", error);
      }
    };

    if (id) {
      fetchLessonContent();
    }
  }, [id]);

  const saveContent = async (content) => {
    if (!id || !content) {
      setStatus("Lesson ID and content are required.");
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch("/api/updateMCQ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId: id,
          fileContent: content,
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

  // Debounce the saveContent function
  const debouncedSaveContent = debounce(saveContent, 1000);

  // Handle editor content changes
  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);

    // Call the debounced saveContent function
    debouncedSaveContent(newContent);
  };

  // Flush debounced saveContent on unmount to save the last change
  useEffect(() => {
    return () => {
      debouncedSaveContent.flush();
    };
  }, []);

  return (
    <>
      <div className="flex w-full h-full">
        <div
          style={{
            border: "1px solid #ccc",
            display: "grid",
            gridTemplateRows: "auto 25px",
          }}
          className="w-1/2 h-full box-border"
        >
          <Editor
            height="90vh"
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
            onClick={() => {
              debouncedSaveContent.flush(); // Ensure all pending saves are flushed
              saveContent(editorContent); // Save directly for immediate feedback
            }}
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
      </div>
    </>
  );
};

export default WYSIWYGEditor;
