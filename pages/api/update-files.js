// // pages/api/update-files.js

// import bucket from "../../lib/firebaseAdmin";
// import fs from "fs-extra";
// import path from "path";

// export default async function handler(req, res) {
//   try {
//     const downloadFolderPath = path.resolve("./downloads");
//     const files = await fs.readdir(downloadFolderPath);

//     for (const fileName of files) {
//       const localFilePath = path.join(downloadFolderPath, fileName);
//       const fileStat = await fs.stat(localFilePath);

//       // Ensure that the path is a file (not a directory)
//       if (fileStat.isFile()) {
//         const fileUploadStream = fs.createReadStream(localFilePath);
//         const file = bucket.file(fileName);

//         // Create a writable stream to upload the file to Firebase Storage
//         await new Promise((resolve, reject) => {
//           fileUploadStream
//             .pipe(
//               file.createWriteStream({
//                 resumable: false, // Disable resumable uploads
//                 gzip: true, // Optionally compress the file
//               })
//             )
//             .on("finish", () => {
//               console.log(`Updated: ${fileName}`);
//               resolve();
//             })
//             .on("error", (error) => {
//               console.error(`Error updating file: ${fileName}`, error);
//               reject(error);
//             });
//         });
//       }
//     }

//     res.status(200).json({ message: "Files updated successfully" });
//   } catch (error) {
//     console.error("Error updating files: ", error);
//     res.status(500).json({ message: "Error updating files", error });
//   }
// }

// pages/api/update-files.js

// import bucket from "../../lib/firebaseAdmin";
// import fs from "fs-extra";
// import path from "path";

// async function uploadFile(filePath, fileName) {
//   const fileUploadStream = fs.createReadStream(filePath);
//   const file = bucket.file(fileName);

//   await new Promise((resolve, reject) => {
//     fileUploadStream
//       .pipe(
//         file.createWriteStream({
//           resumable: false, // Disable resumable uploads
//           gzip: true, // Optionally compress the file
//         })
//       )
//       .on("finish", () => {
//         console.log(`Updated: ${fileName}`);
//         resolve();
//       })
//       .on("error", (error) => {
//         console.error(`Error updating file: ${fileName}`, error);
//         reject(error);
//       });
//   });
// }

// async function checkAndUploadFile(localFilePath, fileName) {
//   const [metadata] = await bucket
//     .file(fileName)
//     .getMetadata()
//     .catch(() => [{ updated: 0 }]);
//   const localStat = await fs.stat(localFilePath);

//   // Compare modification times to determine if the local file has changed
//   if (localStat.mtimeMs > new Date(metadata.updated).getTime()) {
//     await uploadFile(localFilePath, fileName);
//   } else {
//     console.log(`No update needed for: ${fileName}`);
//   }
// }

// async function processDirectory(directoryPath) {
//   const files = await fs.readdir(directoryPath);

//   for (const fileName of files) {
//     const filePath = path.join(directoryPath, fileName);
//     const fileStat = await fs.stat(filePath);

//     if (fileStat.isDirectory()) {
//       // Recursively process directories
//       await processDirectory(filePath);
//     } else if (fileStat.isFile()) {
//       // Check if the file needs to be updated
//       await checkAndUploadFile(filePath, fileName);
//     }
//   }
// }

// export default async function handler(req, res) {
//   try {
//     const downloadFolderPath = path.resolve("./downloads");
//     await processDirectory(downloadFolderPath);

//     res.status(200).json({ message: "Files updated successfully" });
//   } catch (error) {
//     console.error("Error updating files: ", error);
//     res.status(500).json({ message: "Error updating files", error });
//   }
// }

// pages/api/update-files.js

// import bucket from "../../lib/firebaseAdmin";
// import fs from "fs-extra";
// import path from "path";

// export default async function handler(req, res) {
//   try {
//     const downloadFolderPath = path.resolve("./downloads");

//     // Function to recursively upload files
//     const uploadFiles = async (folderPath, firebasePath) => {
//       const files = await fs.readdir(folderPath);

//       for (const fileName of files) {
//         const localFilePath = path.join(folderPath, fileName);
//         const fileStat = await fs.stat(localFilePath);

//         // If it's a directory, recursively upload
//         if (fileStat.isDirectory()) {
//           // Create the directory in Firebase by recursively calling uploadFiles
//           await uploadFiles(localFilePath, path.join(firebasePath, fileName));
//         } else {
//           const firebaseFile = bucket.file(
//             path.join(firebasePath, fileName).replace(/\\/g, "/")
//           ); // Use forward slashes for Firebase
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
//               .on("finish", () => {
//                 console.log(`Updated: ${path.join(firebasePath, fileName)}`);
//                 resolve();
//               })
//               .on("error", (error) => {
//                 console.error(`Error updating file: ${fileName}`, error);
//                 reject(error);
//               });
//           });
//         }
//       }
//     };

//     // Start the upload process from the local folder
//     await uploadFiles(downloadFolderPath, "");

//     res.status(200).json({ message: "Files updated successfully" });
//   } catch (error) {
//     console.error("Error updating files: ", error);
//     res.status(500).json({ message: "Error updating files", error });
//   }
// }

import bucket from "../../lib/firebaseAdmin";
import fs from "fs-extra";
import path from "path";

export default async function handler(req, res) {
  try {
    const downloadFolderPath = path.resolve("./downloads");

    // Function to recursively upload files
    const uploadFiles = async (folderPath, firebasePath) => {
      const files = await fs.readdir(folderPath);

      for (const fileName of files) {
        const localFilePath = path.join(folderPath, fileName);
        const fileStat = await fs.stat(localFilePath);

        // If it's a directory, recursively upload
        if (fileStat.isDirectory()) {
          // Create the directory in Firebase by recursively calling uploadFiles
          await uploadFiles(localFilePath, path.join(firebasePath, fileName));
        } else {
          const firebaseFile = bucket.file(
            path.join(firebasePath, fileName).replace(/\\/g, "/")
          ); // Use forward slashes for Firebase
          const [exists] = await firebaseFile.exists();

          // Check if the file exists in Firebase and if it's different
          let remoteLastModified;

          if (exists) {
            const [metadata] = await firebaseFile.getMetadata(); // Fetch metadata
            remoteLastModified = new Date(metadata.updated);

            // Compare modified times
            if (fileStat.mtime <= remoteLastModified) {
              console.log(`No changes for: ${fileName}, skipping.`);
              continue; // Skip if no changes
            }
          }

          // Upload the file
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
                console.log(`Updated: ${path.join(firebasePath, fileName)}`);

                // Make the file publicly accessible
                await firebaseFile.makePublic();

                console.log(
                  `Public URL: https://storage.googleapis.com/${bucket.name}/${firebaseFile.name}`
                );

                resolve();
              })
              .on("error", (error) => {
                console.error(`Error updating file: ${fileName}`, error);
                reject(error);
              });
          });
        }
      }
    };

    // Start the upload process from the local folder
    await uploadFiles(downloadFolderPath, "");

    res
      .status(200)
      .json({ message: "Files updated and made public successfully" });
  } catch (error) {
    console.error("Error updating files: ", error);
    res.status(500).json({ message: "Error updating files", error });
  }
}
