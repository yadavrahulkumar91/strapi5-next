import bucket from "../../lib/firebaseAdmin";

export default async function handler(req, res) {
  try {
    // Function to recursively delete files and folders
    const deleteFilesAndFolders = async (folderPath) => {
      const [files] = await bucket.getFiles({ prefix: folderPath });

      // Delete each file and folder
      for (const file of files) {
        await file.delete();
        console.log(`Deleted: ${file.name}`);
      }
    };

    // Start the deletion process from the content folder
    await deleteFilesAndFolders("content");

    res.status(200).json({
      message:
        "All folders starting with 'content' have been deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting folders: ", error);
    res.status(500).json({ message: "Error deleting folders", error });
  }
}
