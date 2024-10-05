// export default function Visio({ url }) {
//   const visioUrl = `${url}#Page=0`;
//   return (
//     <iframe
//       src={visioUrl}
//       width="90%"
//       height="600px"
//       frameBorder="0"
//       title="VSDX Viewer"
//     />
//   );
// }

"use client";
import { useState, useEffect } from "react";

export default function Visio({ url }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const convertVsdxToPng = async () => {
      if (!url) return;

      setLoading(true);
      try {
        const response = await fetch("/api/convert-vsdx", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileUrl: url }), // Pass the URL from the prop
        });

        const data = await response.json();
        if (data.success) {
          setImageUrl(data.imageUrl); // Set the converted image URL
        } else {
          console.error("Failed to convert .vsdx file");
        }
      } catch (error) {
        console.error("Error during conversion:", error);
      } finally {
        setLoading(false);
      }
    };

    convertVsdxToPng();
  }, [url]);

  return (
    <div>
      {loading && <p>Converting .vsdx file...</p>}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Converted Diagram"
          style={{ maxWidth: "100%" }}
        />
      ) : (
        !loading && <p>No image to display.</p>
      )}
    </div>
  );
}
