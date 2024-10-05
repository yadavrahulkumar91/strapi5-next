// import { Diagram, SaveFileFormat } from "aspose.diagram"; // Correct import for SaveFileFormat
// import fs from "fs";
// import path from "path";
// import axios from "axios";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const { fileUrl } = req.body;

//       // Fetch the .vsdx file from the provided URL
//       const response = await axios.get(fileUrl, {
//         responseType: "arraybuffer",
//       });

//       // Save the fetched .vsdx file to a temporary location
//       const tempVsdxPath = path.join(process.cwd(), "temp", "temp.vsdx");
//       if (!fs.existsSync(path.join(process.cwd(), "temp"))) {
//         fs.mkdirSync(path.join(process.cwd(), "temp"), { recursive: true });
//       }
//       fs.writeFileSync(tempVsdxPath, response.data);

//       // Load the diagram from the downloaded file
//       const diagram = new Diagram(tempVsdxPath);

//       // Prepare the output directory and filename
//       const outputDir = path.join(process.cwd(), "public", "converted");
//       if (!fs.existsSync(outputDir)) {
//         fs.mkdirSync(outputDir, { recursive: true });
//       }
//       const outputFileName = `output-${Date.now()}.png`;
//       const outputFilePath = path.join(outputDir, outputFileName);

//       // Convert and save the diagram as PNG
//       diagram.save(outputFilePath, SaveFileFormat.PNG); // Corrected format reference

//       // Delete the temporary .vsdx file
//       fs.unlinkSync(tempVsdxPath);

//       // Return the public URL of the saved image
//       res
//         .status(200)
//         .json({ success: true, imageUrl: `/converted/${outputFileName}` });
//     } catch (error) {
//       console.error("Error during conversion:", error);
//       res
//         .status(500)
//         .json({ success: false, error: "Failed to convert .vsdx file" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }

// import libreOfficeConvert from "libreoffice-convert";
// import fs from "fs";
// import path from "path";
// import axios from "axios";

// export default async function handler(req, res) {
//   try {
//     const { fileUrl } = req.body;

//     // Fetch the .vsdx file from the URL
//     const fileResponse = await axios.get(fileUrl, {
//       responseType: "arraybuffer",
//     });
//     const inputPath = path.join(process.cwd(), "temp", "input.vsdx");
//     fs.writeFileSync(inputPath, fileResponse.data);

//     // Read the input file
//     const input = fs.readFileSync(inputPath);

//     // Specify the output format (e.g., PNG)
//     const outputFormat = ".png";

//     // Convert the file
//     libreOfficeConvert.convert(input, outputFormat, undefined, (err, done) => {
//       if (err) {
//         console.error(`Error converting file: ${err.message}`);
//         return res
//           .status(500)
//           .json({ success: false, error: "Failed to convert file" });
//       }

//       // Save the converted file to public folder
//       const outputPath = path.join(
//         process.cwd(),
//         "public",
//         `converted-image.png`
//       );
//       fs.writeFileSync(outputPath, done);

//       return res
//         .status(200)
//         .json({ success: true, imageUrl: `/converted-image.png` });
//     });
//   } catch (error) {
//     console.error("Error during conversion:", error);
//     res
//       .status(500)
//       .json({ success: false, error: "Failed to process request" });
//   }
// }

// import libreOfficeConvert from "libreoffice-convert";
// import fs from "fs";
// import path from "path";

// export default async function handler(req, res) {
//   try {
//     const { filePath } = req.body; // Expecting local .vsdx file path in request body

//     // Ensure the file exists
//     if (!fs.existsSync(filePath)) {
//       return res
//         .status(400)
//         .json({ success: false, error: "File does not exist" });
//     }

//     // Check if it's a .vsdx file
//     if (path.extname(filePath).toLowerCase() !== ".vsdx") {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid file format. Only .vsdx files are supported",
//       });
//     }

//     // Read the input file
//     const input = fs.readFileSync(filePath);

//     // Specify the output format (e.g., PNG)
//     const outputFormat = ".png";

//     // Convert the file
//     libreOfficeConvert.convert(input, outputFormat, undefined, (err, done) => {
//       if (err) {
//         console.error(`Error converting file: ${err.message}`);
//         return res
//           .status(500)
//           .json({ success: false, error: "Failed to convert file" });
//       }

//       // Get the directory and filename from the input path
//       const dir = path.dirname(filePath);
//       const fileNameWithoutExt = path.basename(
//         filePath,
//         path.extname(filePath)
//       );

//       // Set the output file path in the same directory, with the same name but .png extension
//       const outputPath = path.join(dir, `${fileNameWithoutExt}.png`);

//       // Save the converted file
//       fs.writeFileSync(outputPath, done);

//       return res.status(200).json({ success: true, imageUrl: outputPath });
//     });
//   } catch (error) {
//     console.error("Error during conversion:", error);
//     res
//       .status(500)
//       .json({ success: false, error: "Failed to process request" });
//   }
// }

import libreOfficeConvert from "libreoffice-convert";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const { filePath } = req.body;
    console.log(filePath);
    // Ensure the file exists
    if (!fs.existsSync(filePath)) {
      return res
        .status(400)
        .json({ success: false, error: "File does not exist" });
    }

    // Read the input file
    const input = fs.readFileSync(filePath);

    // Specify the output format (PNG)
    const outputFormat = ".png";
    const outputPath = path.join(
      path.dirname(filePath),
      `${path.basename(filePath, ".vsdx")}.png`
    );

    // Convert the file using LibreOffice
    libreOfficeConvert.convert(input, outputFormat, undefined, (err, done) => {
      if (err) {
        console.error(`Error converting file: ${err.message}`);
        return res
          .status(500)
          .json({ success: false, error: "Failed to convert file" });
      }

      // Write the converted file to the same directory
      fs.writeFileSync(outputPath, done);

      return res.status(200).json({
        success: true,
        message: "File converted successfully",
        outputPath: outputPath,
      });
    });
  } catch (error) {
    console.error("Error during conversion:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to process request" });
  }
}
