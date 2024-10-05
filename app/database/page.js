// "use client"

// import { useState } from "react";

// export default function ManageFiles() {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleGenerateFiles = async () => {
//     setLoading(true);
//     setMessage("");

//     const response = await fetch("/api/generateFiles", {
//       method: "POST",
//     });

//     const data = await response.json();
//     setLoading(false);
//     setMessage(data.message);
//   };

//   const handleUpdateFiles = async () => {
//     setLoading(true);
//     setMessage("");

//     const response = await fetch("/api/updateFiles", {
//       method: "POST",
//     });

//     const data = await response.json();
//     setLoading(false);
//     setMessage(data.message);
//   };

//   return (
//     <div>
//       <h1>Manage GameChanger Academy Files</h1>
//       <button onClick={handleGenerateFiles} disabled={loading}>
//         {loading ? "Generating..." : "Generate Files"}
//       </button>
//       <button onClick={handleUpdateFiles} disabled={loading}>
//         {loading ? "Updating..." : "Update Files"}
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";

// export default function ManageFiles() {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleGenerateFiles = async () => {
//     setLoading(true);
//     setMessage("");

//     const response = await fetch("/api/generateFiles", {
//       method: "POST",
//     });

//     const data = await response.json();
//     setLoading(false);
//     setMessage(data.message);
//   };

//   const handleUpdateFiles = async () => {
//     setLoading(true);
//     setMessage("");

//     const response = await fetch("/api/updateFiles", {
//       method: "POST",
//     });

//     const data = await response.json();
//     setLoading(false);
//     setMessage(data.message);
//   };

//   const handleDownloadFiles = async () => {
//     setLoading(true);
//     setMessage("");

//     const response = await fetch("/api/download-files", {
//       method: "POST",
//     });

//     const data = await response.json();
//     setLoading(false);
//     setMessage(data.message);
//   };

//   return (
//     <div>
//       <h1>Manage GameChanger Academy Files</h1>
//       <button onClick={handleGenerateFiles} disabled={loading}>
//         {loading ? "Generating..." : "Generate Files"}
//       </button>
//       <button onClick={handleUpdateFiles} disabled={loading}>
//         {loading ? "Updating..." : "Update Files"}
//       </button>
//       <button onClick={handleDownloadFiles} disabled={loading}>
//         {loading ? "Downloading..." : "Download Files"}
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

"use client";

import { useState } from "react";

export default function ManageFiles() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerateFiles = async () => {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/generateFiles", {
      method: "POST",
    });

    const data = await response.json();
    setLoading(false);
    setMessage(data.message);
  };

  const handleUpdateFiles = async () => {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/updateFiles", {
      method: "POST",
    });

    const data = await response.json();
    setLoading(false);
    setMessage(data.message);
  };

  // New handler for updating Firebase files
  const handleUpdateFirebaseFiles = async () => {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/update-files", {
      method: "POST",
    });

    const data = await response.json();
    setLoading(false);
    setMessage(data.message);
  };

  const updateContent = async () => {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/uploadContent", {
      method: "POST",
    });

    const data = await response.json();
    setLoading(false);
    setMessage(data.message);
  };

  const handleDownloadFiles = async () => {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/download-files", {
      method: "POST",
    });

    const data = await response.json();
    setLoading(false);
    setMessage(data.message);
  };

  return (
    <div>
      <h1>Manage GameChanger Academy Files</h1>
      <button onClick={handleGenerateFiles} disabled={loading}>
        {loading ? "Generating..." : "Generate Files"}
      </button>
      <button onClick={handleUpdateFiles} disabled={loading}>
        {loading ? "Updating..." : "Update Files"}
      </button>
      <button onClick={handleUpdateFirebaseFiles} disabled={loading}>
        {loading ? "Updating..." : "Update Firebase Files"}
      </button>
      <button onClick={handleDownloadFiles} disabled={loading}>
        {loading ? "Downloading..." : "Download Files"}
      </button>
      <button onClick={updateContent} disabled={loading}>
        {loading ? "Downloading..." : "Update content to firebase storage"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
