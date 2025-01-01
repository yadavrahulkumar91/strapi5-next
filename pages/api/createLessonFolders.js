import fs from "fs-extra";
// import path from "path";
import bucket from "../../lib/firebaseAdmin";
import connectToDatabase from "../../lib/db";

export default async function handler(req, res) {
  let dbClient;

  try {
    // Connect to the database
    const { client } = await connectToDatabase();
    dbClient = client;

    // Fetch all lesson IDs
    const result = await dbClient.query(
      "SELECT id FROM components_jsonbook_lessons"
    );
    const lessons = result.rows;

    if (!lessons || lessons.length === 0) {
      return res
        .status(404)
        .json({ message: "No lessons found in the database" });
    }

    // Local base folder (optional, if you want to use it for reference)
    // const baseFolderPath = path.resolve("./content"); // Replace or remove if not needed

    // Function to create folders in Firebase Storage for each lesson
    const createFoldersForLessons = async (lessonIds) => {
      for (const lesson of lessonIds) {
        const lessonFolderPath = `lesson/${lesson.id}/`; // Firebase folder path
        await bucket.file(lessonFolderPath).save(""); // Create placeholder file to simulate folder
        console.log(`Created folder for lesson ID: ${lesson.id}`);
      }
    };

    // Start creating folders for all lesson IDs
    await createFoldersForLessons(lessons);

    res.status(200).json({
      message: "Folders created successfully in Firebase Storage.",
      count: lessons.length,
    });
  } catch (error) {
    console.error("Error creating lesson folders: ", error);
    res
      .status(500)
      .json({ message: "Error creating lesson folders", error: error.message });
  } finally {
    // Release database client
    if (dbClient) dbClient.release();
  }
}
