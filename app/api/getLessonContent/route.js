// import { Pool } from "pg";

// let pool;

// async function connectToDatabase() {
//   if (!pool) {
//     pool = new Pool({
//       user: "avnadmin",
//       host: "gamechanger-academy1-gamechanger-academy.a.aivencloud.com",
//       database: "gamechanger_academy",
//       password: "AVNS_nI2zH78Uh-tzJMU1Egl",
//       port: 10459,
//       ssl: {
//         rejectUnauthorized: false, // Disable SSL verification (not recommended for production)
//       },
//     });

//     pool.on("error", (err) => {
//       console.error("Unexpected error on idle client", err);
//       process.exit(-1);
//     });
//   }
//   return pool;
// }

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");

//   if (!id) {
//     return new Response(JSON.stringify({ error: "Lesson ID is required." }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   const pool = await connectToDatabase();
//   try {
//     const query =
//       "SELECT lesson_content FROM components_jsonbook_lessons WHERE id = $1";
//     const result = await pool.query(query, [parseInt(id, 10)]);

//     if (result.rows.length === 0) {
//       return new Response(JSON.stringify({ error: "Lesson not found." }), {
//         status: 404,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     return new Response(
//       JSON.stringify({ lesson_content: result.rows[0].lesson_content }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("Error fetching lesson content:", error);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
