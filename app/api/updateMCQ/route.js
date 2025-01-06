// import { NextResponse } from "next/server";
// import connectToDatabase from "../../../lib/db";

// export async function POST(req) {
//   try {
//     // Parse the request body
//     const { lessonId, fileContent } = await req.json();

//     // Validate the request payload
//     if (!lessonId || !fileContent) {
//       return NextResponse.json(
//         { error: "Lesson ID and content are required." },
//         { status: 400 }
//       );
//     }

//     // Connect to the database
//     const { client } = await connectToDatabase();

//     try {
//       // Parse the file content (MCQs data)
//       const mcqs = JSON.parse(fileContent);

//       // Start a transaction
//       await client.query("BEGIN");

//       for (const mcq of mcqs) {
//         const [id, question, optA, optB, optC, optD, ans, sol, askedYears] =
//           mcq;

//         if (id) {
//           // Update existing MCQ if an ID is present
//           await client.query(
//             `UPDATE components_jsonbook_mcqs
//              SET qu = $1, a = $2, b = $3, c = $4, d = $5, ans = $6, sol = $7
//              WHERE id = $8`,
//             [question, optA, optB, optC, optD, ans, sol, id]
//           );
//         } else {
//           // Insert a new MCQ if no ID is present
//           const mcqRes = await client.query(
//             "INSERT INTO components_jsonbook_mcqs (qu, a, b, c, d, ans, sol) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
//             [question, optA, optB, optC, optD, ans, sol]
//           );
//           const newMcqId = mcqRes.rows[0].id;

//           // Insert into the lesson components
//           await client.query(
//             'INSERT INTO components_jsonbook_lessons_components (entity_id, component_id, component_type, field, "order") VALUES ($1, $2, $3, $4, $5)',
//             [lessonId, newMcqId, "jsonbook.mcq", "MCQ", 0] // Adjust order value as needed
//           );

//           // Update the editor with the newly inserted MCQ's ID
//           mcq[0] = newMcqId; // Update the MCQ array with the new ID
//         }

//         // Handle Asked Years for each MCQ
//         const mcqId = id || mcq[0]; // Use the existing ID or the new one

//         const resAskedYearOrder = await client.query(
//           'SELECT COALESCE(MAX("order"), 0) AS start_order FROM components_jsonbook_mcqs_components WHERE entity_id = $1',
//           [mcqId]
//         );
//         let startAskedYearOrder = resAskedYearOrder.rows[0].start_order;

//         for (const year of askedYears) {
//           const yearRes = await client.query(
//             "INSERT INTO components_jsonbook_asked_years (asked_year) VALUES ($1) RETURNING id",
//             [year]
//           );
//           const yearId = yearRes.rows[0].id;

//           startAskedYearOrder += 1;
//           await client.query(
//             'INSERT INTO components_jsonbook_mcqs_components (entity_id, component_id, component_type, field, "order") VALUES ($1, $2, $3, $4, $5)',
//             [
//               mcqId,
//               yearId,
//               "jsonbook.asked-year",
//               "Asked_year",
//               startAskedYearOrder,
//             ]
//           );
//         }
//       }

//       // Commit the transaction
//       await client.query("COMMIT");

//       return NextResponse.json(
//         { message: "MCQs updated successfully", updatedMCQs: mcqs },
//         { status: 200 }
//       );
//     } catch (error) {
//       console.error("Error updating MCQs:", error);
//       // Rollback the transaction in case of an error
//       await client.query("ROLLBACK");
//       return NextResponse.json(
//         { error: "Internal Server Error" },
//         { status: 500 }
//       );
//     } finally {
//       // Ensure the client is released back to the pool
//       client.release();
//     }
//   } catch (error) {
//     console.error("Error handling request:", error);
//     return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
//   }
// }

// import { NextResponse } from "next/server";
// import connectToDatabase from "../../../lib/db";

// export async function POST(req) {
//   try {
//     // Parse the request body
//     const { lessonId, fileContent } = await req.json();

//     // Validate the request payload
//     if (!lessonId || !fileContent) {
//       return NextResponse.json(
//         { error: "Lesson ID and content are required." },
//         { status: 400 }
//       );
//     }

//     // Connect to the database
//     const { client } = await connectToDatabase();

//     try {
//       // Parse the file content (MCQs data)
//       const mcqs = JSON.parse(fileContent);

//       // Start a transaction
//       await client.query("BEGIN");

//       for (const mcq of mcqs) {
//         const [id, question, optA, optB, optC, optD, ans, sol, askedYears] =
//           mcq;

//         if (id) {
//           // Update existing MCQ if an ID is present
//           await client.query(
//             `UPDATE components_jsonbook_mcqs
//              SET qu = $1, a = $2, b = $3, c = $4, d = $5, ans = $6, sol = $7
//              WHERE id = $8`,
//             [question, optA, optB, optC, optD, ans, sol, id]
//           );
//         } else {
//           // Insert a new MCQ if no ID is present
//           const mcqRes = await client.query(
//             "INSERT INTO components_jsonbook_mcqs (qu, a, b, c, d, ans, sol) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
//             [question, optA, optB, optC, optD, ans, sol]
//           );
//           const newMcqId = mcqRes.rows[0].id;

//           // Insert into the lesson components
//           await client.query(
//             'INSERT INTO components_jsonbook_lessons_components (entity_id, component_id, component_type, field, "order") VALUES ($1, $2, $3, $4, $5)',
//             [lessonId, newMcqId, "jsonbook.mcq", "MCQ", 0] // Adjust order value as needed
//           );

//           // Update the editor with the newly inserted MCQ's ID
//           mcq[0] = newMcqId; // Update the MCQ array with the new ID
//         }

//         // Handle Asked Years for each MCQ
//         const mcqId = id || mcq[0]; // Use the existing ID or the new one

//         // Fetch the existing asked years for this MCQ
//         const existingAskedYearsRes = await client.query(
//           `SELECT ay.asked_year
//            FROM components_jsonbook_asked_years ay
//            INNER JOIN components_jsonbook_mcqs_components mcc
//            ON ay.id = mcc.component_id
//            WHERE mcc.entity_id = $1 AND mcc.component_type = 'jsonbook.asked-year'`,
//           [mcqId]
//         );

//         const existingAskedYears = new Set(
//           existingAskedYearsRes.rows.map((row) => row.asked_year)
//         );

//         for (const year of askedYears) {
//           if (!existingAskedYears.has(year)) {
//             // Insert only if the asked year doesn't already exist
//             const yearRes = await client.query(
//               "INSERT INTO components_jsonbook_asked_years (asked_year) VALUES ($1) RETURNING id",
//               [year]
//             );
//             const yearId = yearRes.rows[0].id;

//             await client.query(
//               'INSERT INTO components_jsonbook_mcqs_components (entity_id, component_id, component_type, field, "order") VALUES ($1, $2, $3, $4, $5)',
//               [mcqId, yearId, "jsonbook.asked-year", "Asked_year", 0] // Adjust order if needed
//             );
//           }
//         }
//       }

//       // Commit the transaction
//       await client.query("COMMIT");

//       return NextResponse.json(
//         { message: "MCQs updated successfully", updatedMCQs: mcqs },
//         { status: 200 }
//       );
//     } catch (error) {
//       console.error("Error updating MCQs:", error);
//       // Rollback the transaction in case of an error
//       await client.query("ROLLBACK");
//       return NextResponse.json(
//         { error: "Internal Server Error" },
//         { status: 500 }
//       );
//     } finally {
//       // Ensure the client is released back to the pool
//       client.release();
//     }
//   } catch (error) {
//     console.error("Error handling request:", error);
//     return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
//   }
// }
