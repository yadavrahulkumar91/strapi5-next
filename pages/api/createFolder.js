import fs from "fs-extra";
import path from "path";
import bucket from "../../lib/firebaseAdmin";

export default async function handler(req, res) {
  try {
    const baseFolderPath = path.resolve("./content"); // Local content directory

    // Function to recursively create folders in Firebase Storage
    const createFolderStructure = async (localPath, firebasePath) => {
      const items = await fs.readdir(localPath);

      for (const item of items) {
        const localItemPath = path.join(localPath, item);
        const firebaseItemPath = path
          .join(firebasePath, item)
          .replace(/\\/g, "/"); // Ensure forward slashes for Firebase

        const stats = await fs.stat(localItemPath);

        if (stats.isDirectory()) {
          // Create the folder in Firebase
          await bucket.file(firebaseItemPath + "/").save(""); // Saving an empty string to create a folder
          console.log(`Created folder: ${firebaseItemPath}`);

          // Recursively create subfolders
          await createFolderStructure(localItemPath, firebaseItemPath);
        }
      }
    };

    // Start the folder creation process
    await createFolderStructure(baseFolderPath, "content");

    res.status(200).json({
      message: "Folder structure created successfully in Firebase Storage.",
    });
  } catch (error) {
    console.error("Error creating folder structure: ", error);
    res.status(500).json({ message: "Error creating folder structure", error });
  }
}
