// import multer from "multer";
// import bucket from "../../lib/firebaseAdmin";

// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js body parser to handle file uploads
//   },
// };

// // Configure Multer to handle file uploads
// const upload = multer();

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   // Wrap Multer's `any` method to handle file uploads
//   const uploadMiddleware = upload.single("file");
//   const runMiddleware = (req, res, fn) =>
//     new Promise((resolve, reject) => {
//       fn(req, res, (err) => {
//         if (err) reject(err);
//         resolve();
//       });
//     });

//   try {
//     // Run the upload middleware
//     await runMiddleware(req, res, uploadMiddleware);

//     const folderId = req.body.folder_id;
//     if (!folderId || !req.file) {
//       return res
//         .status(400)
//         .json({ message: "Folder ID and file are required." });
//     }

//     const fileName = `lesson/${folderId}/${req.file.originalname}`;
//     const file = bucket.file(fileName);

//     // Save the file to Firebase Storage
//     await file.save(req.file.buffer, {
//       contentType: req.file.mimetype,
//       public: true, // Make file publicly accessible
//     });

//     const publicUrl = `https://storage.googleapis.com/${process.env.FIREBASE_BUCKET_NAME}/${fileName}`;

//     res.status(200).json({
//       message: "File uploaded successfully.",
//       fileName: req.file.originalname,
//       publicUrl,
//     });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to upload file.", error: error.message });
//   }
// }

import multer from "multer";
import bucket from "../../lib/firebaseAdmin";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parser to handle file uploads
  },
};

// Configure Multer to handle file uploads
const upload = multer();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Wrap Multer's `any` method to handle file uploads
  const uploadMiddleware = upload.single("file");
  const runMiddleware = (req, res, fn) =>
    new Promise((resolve, reject) => {
      fn(req, res, (err) => {
        if (err) reject(err);
        resolve();
      });
    });

  try {
    // Run the upload middleware
    await runMiddleware(req, res, uploadMiddleware);

    const folderId = req.body.folder_id;
    if (!folderId || !req.file) {
      return res
        .status(400)
        .json({ message: "Folder ID and file are required." });
    }

    const fileName = `lesson/${folderId}/${req.file.originalname}`;
    const file = bucket.file(fileName);

    // Save the file to Firebase Storage
    await file.save(req.file.buffer, {
      contentType: req.file.mimetype,
    });

    // Make the file public
    await file.makePublic();

    const publicUrl = `https://storage.googleapis.com/${process.env.FIREBASE_BUCKET_NAME}/${fileName}`;

    res.status(200).json({
      message: "File uploaded successfully.",
      fileName: req.file.originalname,
      publicUrl,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res
      .status(500)
      .json({ message: "Failed to upload file.", error: error.message });
  }
}
