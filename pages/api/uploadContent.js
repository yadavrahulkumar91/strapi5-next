// import bucket from "../../lib/firebaseAdmin";
// import fs from "fs-extra";
// import path from "path";

// export default async function handler(req, res) {
//   try {
//     const contentFolderPath = path.resolve("./content");

//     // Function to recursively create folders and upload files
//     const uploadFiles = async (folderPath, firebasePath) => {
//       const files = await fs.readdir(folderPath);

//       // Ensure the Firebase content directory exists
//       const contentDir = bucket.file(`content/`); // Create the main content directory
//       await contentDir.save(Buffer.from("")); // Save an empty file to create the directory

//       for (const fileName of files) {
//         const localFilePath = path.join(folderPath, fileName);
//         const fileStat = await fs.stat(localFilePath);

//         // If it's a directory, recursively upload
//         if (fileStat.isDirectory()) {
//           // Call the function recursively for the subdirectory
//           await uploadFiles(localFilePath, path.join(firebasePath, fileName));
//         } else {
//           // Skip JSON files
//           if (path.extname(fileName) === ".json") {
//             console.log(`Skipping JSON file: ${fileName}`);
//             continue;
//           }

//           // Create the correct path for Firebase
//           const firebaseFilePath = path
//             .join(firebasePath, fileName)
//             .replace(/\\/g, "/"); // Use forward slashes for Firebase
//           const firebaseFile = bucket.file(firebaseFilePath);
//           const [exists] = await firebaseFile.exists();

//           // Check if the file exists in Firebase and if it's different
//           let remoteLastModified;

//           if (exists) {
//             const [metadata] = await firebaseFile.getMetadata(); // Fetch metadata
//             remoteLastModified = new Date(metadata.updated);

//             // Compare modified times
//             if (fileStat.mtime <= remoteLastModified) {
//               console.log(`No changes for: ${fileName}, skipping.`);
//               continue; // Skip if no changes
//             }
//           }

//           // Upload the file
//           const fileUploadStream = fs.createReadStream(localFilePath);

//           await new Promise((resolve, reject) => {
//             fileUploadStream
//               .pipe(
//                 firebaseFile.createWriteStream({
//                   resumable: false, // Disable resumable uploads
//                   gzip: true, // Optionally compress the file
//                 })
//               )
//               .on("finish", async () => {
//                 console.log(`Uploaded: ${firebaseFilePath}`);

//                 // Make the file publicly accessible
//                 await firebaseFile.makePublic();

//                 console.log(
//                   `Public URL: https://storage.googleapis.com/${bucket.name}/${firebaseFile.name}`
//                 );

//                 resolve();
//               })
//               .on("error", (error) => {
//                 console.error(`Error uploading file: ${fileName}`, error);
//                 reject(error);
//               });
//           });
//         }
//       }
//     };

//     // Start the upload process from the content folder, creating a single 'content' directory in Firebase
//     await uploadFiles(contentFolderPath, "content");

//     res
//       .status(200)
//       .json({ message: "Files uploaded successfully, excluding JSON files" });
//   } catch (error) {
//     console.error("Error uploading files: ", error);
//     res.status(500).json({ message: "Error uploading files", error });
//   }
// }

import fs from "fs-extra";
import path from "path";
import bucket from "../../lib/firebaseAdmin";

export default async function handler(req, res) {
  try {
    const baseFolderPath = path.resolve("./content"); // Local content directory

    // Function to recursively create folders and upload files in Firebase Storage
    const createFolderStructureAndUploadFiles = async (
      localPath,
      firebasePath
    ) => {
      const items = await fs.readdir(localPath);

      for (const item of items) {
        const localItemPath = path.join(localPath, item);
        const firebaseItemPath = path
          .join(firebasePath, item)
          .replace(/\\/g, "/"); // Ensure forward slashes for Firebase

        const stats = await fs.stat(localItemPath);

        if (stats.isDirectory()) {
          // Check if the folder exists in Firebase
          const firebaseFolderExists = await checkIfFolderExists(
            firebaseItemPath
          );
          if (!firebaseFolderExists) {
            // Create the folder in Firebase if it doesn't exist
            await bucket.file(firebaseItemPath + "/").save(""); // Saving an empty string to create a folder
            console.log(`Created folder: ${firebaseItemPath}`);
          }

          // Recursively create subfolders and upload files
          await createFolderStructureAndUploadFiles(
            localItemPath,
            firebaseItemPath
          );
        } else {
          // Upload files except JSON files
          if (!item.endsWith(".json")) {
            await uploadFile(localItemPath, firebaseItemPath);
          } else {
            console.log(`Skipping JSON file: ${item}`);
          }
        }
      }
    };

    // Function to check if the folder exists in Firebase
    const checkIfFolderExists = async (firebasePath) => {
      const file = bucket.file(firebasePath + "/");
      const [exists] = await file.exists();
      return exists;
    };

    // Function to upload a single file to Firebase
    const uploadFile = async (localFilePath, firebaseFilePath) => {
      const firebaseFile = bucket.file(firebaseFilePath);
      const fileUploadStream = fs.createReadStream(localFilePath);

      await new Promise((resolve, reject) => {
        fileUploadStream
          .pipe(
            firebaseFile.createWriteStream({
              resumable: false, // Disable resumable uploads
              gzip: true, // Optionally compress the file
            })
          )
          .on("finish", async () => {
            // Make the file publicly accessible
            await firebaseFile.makePublic();
            console.log(`Uploaded file: ${firebaseFilePath}`);
            resolve();
          })
          .on("error", (error) => {
            console.error(`Error uploading file: ${firebaseFilePath}`, error);
            reject(error);
          });
      });
    };

    // Start the folder creation and file upload process
    await createFolderStructureAndUploadFiles(baseFolderPath, "content");

    res.status(200).json({
      message:
        "Folder structure created and files uploaded successfully in Firebase Storage.",
    });
  } catch (error) {
    console.error(
      "Error creating folder structure and uploading files: ",
      error
    );
    res.status(500).json({
      message: "Error creating folder structure and uploading files",
      error,
    });
  }
}
