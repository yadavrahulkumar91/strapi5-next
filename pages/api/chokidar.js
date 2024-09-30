import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import { promisify } from "util";
import { Client } from "pg";

const readFile = promisify(fs.readFile);

let client;

async function connectToDatabase() {
  if (!client) {
    client = new Client({
      user: "avnadmin",
      host: "gamechanger-academy1-gamechanger-academy.a.aivencloud.com",
      database: "gamechanger_academy",
      password: "AVNS_nI2zH78Uh-tzJMU1Egl",
      port: 10459,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    await client.connect();
  }
}

async function updateLessonContent(lessonId, fileContent) {
  try {
    const updateQuery = `
      UPDATE components_jsonbook_lessons
      SET lesson_content = $1
      WHERE id = $2
    `;
    await client.query(updateQuery, [fileContent, parseInt(lessonId)]);
    console.log(`Lesson ID ${lessonId} updated successfully.`);
  } catch (error) {
    console.error("Error updating lesson content:", error);
  }
}

async function onFileChange(filePath) {
  try {
    const fileName = path.basename(filePath);
    const fileNameWithoutExt = path.parse(fileName).name;
    const [lessonId] = fileNameWithoutExt.split("_");

    // Read the file content
    const fileContent = await readFile(filePath, "utf-8");

    // Update the database with new content
    await updateLessonContent(lessonId, fileContent);
  } catch (error) {
    console.error("Error processing file change:", error);
  }
}

export default async function handler(req, res) {
  try {
    // Connect to PostgreSQL
    await connectToDatabase();

    const baseDir = path.join(process.cwd(), "content");

    // Watch for file changes in the content directory
    const watcher = chokidar.watch(baseDir, {
      persistent: true,
      ignoreInitial: true, // Ignore initial file listings
    });

    // On file change (add/change/unlink)
    watcher.on("change", (filePath) => {
      console.log(`File changed: ${filePath}`);
      onFileChange(filePath);
    });

    watcher.on("add", (filePath) => {
      console.log(`File added: ${filePath}`);
      onFileChange(filePath);
    });

    watcher.on("unlink", (filePath) => {
      console.log(`File deleted: ${filePath}`);
      // Handle file deletion logic if necessary
    });

    res.status(200).json({ message: "Watching for file changes..." });
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
