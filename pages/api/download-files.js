// // pages/api/download-files.js

// import bucket from "../../lib/firebaseAdmin";
// import fs from "fs-extra";
// import path from "path";

// export default async function handler(req, res) {
//   try {
//     const [files] = await bucket.getFiles();
//     const downloadFolderPath = path.resolve("./downloads");

//     // Ensure the download folder exists
//     await fs.ensureDir(downloadFolderPath);

//     for (const file of files) {
//       const destFilePath = path.join(downloadFolderPath, file.name);
//       const writeStream = fs.createWriteStream(destFilePath);

//       // Download the file to local
//       await file.createReadStream().pipe(writeStream);
//       console.log(`Downloaded: ${file.name}`);
//     }

//     res.status(200).json({ message: "Files downloaded successfully" });
//   } catch (error) {
//     console.error("Error downloading files: ", error);
//     res.status(500).json({ message: "Error downloading files", error });
//   }
// }

// import bucket from "../../lib/firebaseAdmin";
// import fs from "fs-extra";
// import path from "path";

// export default async function handler(req, res) {
//   try {
//     const [files] = await bucket.getFiles();
//     const downloadFolderPath = path.resolve("./downloads");

//     // Ensure the download folder exists
//     await fs.ensureDir(downloadFolderPath);

//     for (const file of files) {
//       const destFilePath = path.join(downloadFolderPath, file.name);

//       // Ensure the directory structure exists
//       const destDirPath = path.dirname(destFilePath);
//       await fs.ensureDir(destDirPath);

//       const writeStream = fs.createWriteStream(destFilePath);

//       // Download the file to local
//       await new Promise((resolve, reject) => {
//         file
//           .createReadStream()
//           .pipe(writeStream)
//           .on("finish", resolve)
//           .on("error", reject);
//       });

//       console.log(`Downloaded: ${file.name}`);
//     }

//     res.status(200).json({ message: "Files downloaded successfully" });
//   } catch (error) {
//     console.error("Error downloading files: ", error);
//     res.status(500).json({ message: "Error downloading files", error });
//   }
// }

// import bucket from "../../lib/firebaseAdmin";
// import fs from "fs-extra";
// import path from "path";

// export default async function handler(req, res) {
//   try {
//     const [files] = await bucket.getFiles();
//     const downloadFolderPath = path.resolve("./downloads");

//     // Ensure the download folder exists
//     await fs.ensureDir(downloadFolderPath);

//     for (const file of files) {
//       const destFilePath = path.join(downloadFolderPath, file.name);

//       // Check if the file already exists locally
//       if (await fs.pathExists(destFilePath)) {
//         console.log(`File already exists: ${file.name}. Skipping...`);
//         continue; // Skip to the next file if it already exists
//       }

//       // Ensure the directory structure exists
//       const destDirPath = path.dirname(destFilePath);
//       await fs.ensureDir(destDirPath);

//       const writeStream = fs.createWriteStream(destFilePath);

//       // Download the file to local
//       await new Promise((resolve, reject) => {
//         file
//           .createReadStream()
//           .pipe(writeStream)
//           .on("finish", resolve)
//           .on("error", reject);
//       });

//       console.log(`Downloaded: ${file.name}`);
//     }

//     res.status(200).json({ message: "Files downloaded successfully" });
//   } catch (error) {
//     console.error("Error downloading files: ", error);
//     res.status(500).json({ message: "Error downloading files", error });
//   }
// }

// import bucket from "../../lib/firebaseAdmin";
// import fs from "fs-extra";
// import path from "path";

// export default async function handler(req, res) {
//   try {
//     const [files] = await bucket.getFiles();
//     const downloadFolderPath = path.resolve("./downloads");

//     // Ensure the download folder exists
//     await fs.ensureDir(downloadFolderPath);

//     for (const file of files) {
//       const destFilePath = path.join(downloadFolderPath, file.name);

//       // Check if the current item is a directory or a file
//       if (file.name.endsWith("/")) {
//         // If it's a directory, ensure the directory structure exists
//         await fs.ensureDir(destFilePath);
//         console.log(`Directory ensured: ${file.name}`);
//         continue; // Skip to the next item
//       }

//       // Check if the file already exists locally
//       if (await fs.pathExists(destFilePath)) {
//         console.log(`File already exists: ${file.name}. Skipping...`);
//         continue; // Skip to the next file if it already exists
//       }

//       // Ensure the directory structure exists for the file
//       const destDirPath = path.dirname(destFilePath);
//       await fs.ensureDir(destDirPath);

//       const writeStream = fs.createWriteStream(destFilePath);

//       // Download the file to local
//       await new Promise((resolve, reject) => {
//         file
//           .createReadStream()
//           .pipe(writeStream)
//           .on("finish", resolve)
//           .on("error", reject);
//       });

//       console.log(`Downloaded: ${file.name}`);
//     }

//     res.status(200).json({ message: "Files downloaded successfully" });
//   } catch (error) {
//     console.error("Error downloading files: ", error);
//     res.status(500).json({ message: "Error downloading files", error });
//   }
// }

import bucket from "../../lib/firebaseAdmin";
import fs from "fs-extra";
import path from "path";

export default async function handler(req, res) {
  try {
    const [files] = await bucket.getFiles();
    const downloadFolderPath = path.resolve("./downloads");

    // Ensure the download folder exists
    await fs.ensureDir(downloadFolderPath);

    for (const file of files) {
      const destFilePath = path.join(downloadFolderPath, file.name);

      // Check if the current item is a directory or a file
      if (file.name.endsWith("/")) {
        // If it's a directory, ensure the directory structure exists
        await fs.ensureDir(destFilePath);
        console.log(`Directory ensured: ${file.name}`);
        continue; // Skip to the next item
      }

      // Check if the file already exists locally
      if (await fs.pathExists(destFilePath)) {
        console.log(`File already exists: ${file.name}. Skipping...`);
        continue; // Skip to the next file if it already exists
      }

      // Ensure the directory structure exists for the file
      const destDirPath = path.dirname(destFilePath);
      await fs.ensureDir(destDirPath);

      const writeStream = fs.createWriteStream(destFilePath);

      // Download the file to local
      await new Promise((resolve, reject) => {
        file
          .createReadStream()
          .pipe(writeStream)
          .on("finish", resolve)
          .on("error", reject);
      });

      // Get the remote file's last modified time
      const lastModifiedTime = new Date(file.metadata.updated);

      // Apply the remote last modified time to the local file
      await fs.utimesSync(destFilePath, lastModifiedTime, lastModifiedTime);

      console.log(`Downloaded and updated timestamp: ${file.name}`);
    }

    res.status(200).json({ message: "Files downloaded successfully" });
  } catch (error) {
    console.error("Error downloading files: ", error);
    res.status(500).json({ message: "Error downloading files", error });
  }
}
