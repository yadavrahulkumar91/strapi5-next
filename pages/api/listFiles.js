import bucket from "../../lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests are allowed" });
  }

  const { folder_id } = req.query;

  if (!folder_id) {
    return res.status(400).json({ message: "Missing folder_id in query" });
  }

  try {
    const folderPath = `lesson/${folder_id}/`;
    const [files] = await bucket.getFiles({ prefix: folderPath });

    const fileNames = files.map((file) => file.name.replace(folderPath, "")); // Trim folder path from file names

    res.status(200).json({ files: fileNames });
  } catch (error) {
    console.error("Error fetching files:", error);
    res
      .status(500)
      .json({ message: "Failed to list files", error: error.message });
  }
}
