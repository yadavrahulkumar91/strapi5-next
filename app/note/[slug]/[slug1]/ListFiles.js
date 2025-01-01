// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const ListFiles = ({ folderId }) => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!folderId) return;

//     const fetchFiles = async () => {
//       setLoading(true);
//       setError("");
//       setFiles([]);

//       try {
//         const response = await axios.get(
//           `/api/listFiles?folder_id=${folderId}`
//         );
//         setFiles(response.data.files);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch files.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFiles();
//   }, [folderId]);

//   return (
//     <div>
//       <h1>Files in Folder: {folderId}</h1>

//       {loading && <p>Loading files...</p>}

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {files.length > 0 && (
//         <ul>
//           {files.map((file, index) => (
//             <li key={index}>{file}</li>
//           ))}
//         </ul>
//       )}

//       {files.length === 0 && !loading && !error && <p>No files found.</p>}
//     </div>
//   );
// };

// export default ListFiles;

"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const ListFiles = ({ folderId }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch files when folderId changes
  useEffect(() => {
    if (!folderId) return;

    const fetchFiles = async () => {
      setLoading(true);
      setError("");
      setFiles([]);

      try {
        const response = await axios.get(
          `/api/listFiles?folder_id=${folderId}`
        );
        setFiles(response.data.files);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch files.");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [folderId]);

  // Upload file handler
  const uploadFile = async () => {
    if (!selectedFile) {
      setError("No file selected for upload.");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("folder_id", folderId);

    try {
      const response = await axios.post("/api/jsonUploadFile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFiles((prevFiles) => [...prevFiles, response.data.fileName]);
      setSelectedFile(null);
      alert("File uploaded successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "File upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Files in Folder: {folderId}</h1>

      {/* File Upload Section */}
      <div>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          disabled={uploading}
        />
        <button onClick={uploadFile} disabled={uploading || !selectedFile}>
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Loading Indicator */}
      {loading && <p>Loading files...</p>}

      {/* Files List */}
      {files.length > 0 && (
        <ul>
          {files.map((file, index) => {
            const publicUrl = `https://storage.googleapis.com/gamechanger-drive-91.appspot.com/${folderId}/${file}`;
            return (
              <li key={index}>
                <a href={publicUrl} target="_blank" rel="noopener noreferrer">
                  {file}
                </a>{" "}
                - <span>{publicUrl}</span>
              </li>
            );
          })}
        </ul>
      )}

      {/* Empty State */}
      {files.length === 0 && !loading && !error && <p>No files found.</p>}
    </div>
  );
};

export default ListFiles;
