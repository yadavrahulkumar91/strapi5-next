// import fs from "fs";
// import path from "path";
// import chokidar from "chokidar";
// import { promisify } from "util";
// import { Client } from "pg";

// const readFile = promisify(fs.readFile);

// let client;

// async function connectToDatabase() {
//   if (!client) {
//     client = new Client({
//       user: "avnadmin",
//       host: "gamechanger-academy1-gamechanger-academy.a.aivencloud.com",
//       database: "gamechanger_academy",
//       password: "AVNS_nI2zH78Uh-tzJMU1Egl",
//       port: 10459,
//       ssl: {
//         rejectUnauthorized: false,
//       },
//     });
//     await client.connect();
//   }
// }

// async function updateLessonContent(lessonId, fileContent) {
//   try {
//     const updateQuery = `
//       UPDATE components_jsonbook_lessons
//       SET lesson_content = $1
//       WHERE id = $2
//     `;
//     await client.query(updateQuery, [fileContent, parseInt(lessonId)]);
//     console.log(`Lesson ID ${lessonId} updated successfully.`);
//   } catch (error) {
//     console.error("Error updating lesson content:", error);
//   }
// }

// async function onFileChange(filePath) {
//   try {
//     const fileName = path.basename(filePath);
//     const fileNameWithoutExt = path.parse(fileName).name;
//     const [lessonId] = fileNameWithoutExt.split("_");

//     // Read the file content
//     const fileContent = await readFile(filePath, "utf-8");

//     // Update the database with new content
//     await updateLessonContent(lessonId, fileContent);
//   } catch (error) {
//     console.error("Error processing file change:", error);
//   }
// }

// export default async function handler(req, res) {
//   try {
//     // Connect to PostgreSQL
//     await connectToDatabase();

//     const baseDir = path.join(process.cwd(), "content");

//     // Watch for file changes in the content directory
//     const watcher = chokidar.watch(baseDir, {
//       persistent: true,
//       ignoreInitial: true, // Ignore initial file listings
//     });

//     // On file change (add/change/unlink)
//     watcher.on("change", (filePath) => {
//       console.log(`File changed: ${filePath}`);
//       onFileChange(filePath);
//     });

//     watcher.on("add", (filePath) => {
//       console.log(`File added: ${filePath}`);
//       onFileChange(filePath);
//     });

//     watcher.on("unlink", (filePath) => {
//       console.log(`File deleted: ${filePath}`);
//       // Handle file deletion logic if necessary
//     });

//     res.status(200).json({ message: "Watching for file changes..." });
//   } catch (error) {
//     console.error("Error in API handler:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import { promisify } from "util";
import { Client } from "pg";
import libreOfficeConvert from "libreoffice-convert";
import bucket from "../../lib/firebaseAdmin"; // Using the existing bucket import

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

// Update JSON file content in PostgreSQL
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

// Upload other files to Firebase Storage
// Upload other files to Firebase Storage
async function uploadFileToFirebase(filePath, firebasePath) {
  try {
    const firebaseFile = bucket.file(firebasePath);

    const fileUploadStream = fs.createReadStream(filePath);

    await new Promise((resolve, reject) => {
      fileUploadStream
        .pipe(
          firebaseFile.createWriteStream({
            resumable: false,
            gzip: true,
          })
        )
        .on("finish", async () => {
          console.log(`Uploaded: ${firebasePath}`);

          // Make the file publicly accessible
          await firebaseFile.makePublic();
          const publicUrl = `https://storage.googleapis.com/${
            bucket.name
          }/${firebaseFile.name.replace(/ /g, "%20")}`;

          console.log(`Public URL: ${publicUrl}`);
          resolve();
        })
        .on("error", (error) => {
          console.error(`Error uploading file: ${firebasePath}`, error);
          reject(error);
        });
    });
  } catch (error) {
    console.error("Error uploading to Firebase:", error);
  }
}

// Convert VSDX files to PNG and save in the same directory
async function convertVsdxToPng(filePath) {
  const fileNameWithoutExt = path.parse(filePath).name;
  const outputFormat = ".png";

  try {
    const input = await readFile(filePath);

    libreOfficeConvert.convert(input, outputFormat, undefined, (err, done) => {
      if (err) {
        console.error(`Error converting .vsdx file: ${err.message}`);
        return;
      }

      const outputPath = path.join(
        path.dirname(filePath),
        `${fileNameWithoutExt}.png`
      );
      fs.writeFileSync(outputPath, done);
      console.log(`Converted ${filePath} to PNG at ${outputPath}`);
    });
  } catch (error) {
    console.error("Error converting .vsdx file:", error);
  }
}

// Process file changes
async function onFileChange(filePath) {
  const ext = path.extname(filePath);

  if (ext === ".vsdx") {
    await convertVsdxToPng(filePath);
  }
  // If the file is a JSON file, update the lesson content in the database
  if (ext === ".json") {
    const fileName = path.basename(filePath);
    const fileNameWithoutExt = path.parse(fileName).name;
    const [lessonId] = fileNameWithoutExt.split("_");

    try {
      const fileContent = await readFile(filePath, "utf-8");
      await updateLessonContent(lessonId, fileContent);
    } catch (error) {
      console.error("Error updating lesson content:", error);
    }
  }
  // If the file is a .vsdx file, convert it to PNG

  // For all other files, upload them to Firebase Storage
  else {
    // Correct the firebasePath to remove leading slashes
    let firebasePath = filePath.replace(process.cwd(), "").replace(/\\/g, "/");

    // Remove leading `/` from firebasePath
    if (firebasePath.startsWith("/")) {
      firebasePath = firebasePath.substring(1);
    }

    await uploadFileToFirebase(filePath, firebasePath);
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
