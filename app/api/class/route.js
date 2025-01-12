import connectToDatabase from "@/lib/db";

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // SQL query to fetch classes and their related jsonbooks and cover pictures
    const query = `
      SELECT 
        classes.id AS class_id,
        classes.class_name,
        jsonbooks.id AS jsonbook_id,
        jsonbooks.book_name,
        files.provider_metadata AS cover_provider_metadata,
        files.folder_path AS cover_folder_path
      FROM classes
      LEFT JOIN jsonbooks_classes_links 
        ON classes.id = jsonbooks_classes_links.class_id
      LEFT JOIN jsonbooks 
        ON jsonbooks_classes_links.jsonbook_id = jsonbooks.id
      LEFT JOIN files_related_morphs 
        ON jsonbooks.id = files_related_morphs.related_id
           AND files_related_morphs.related_type = 'api::jsonbook.jsonbook'
      LEFT JOIN files 
        ON files_related_morphs.file_id = files.id
      ORDER BY classes.id ASC;
    `;
    const { client } = await connectToDatabase();

    // Execute the query
    const { rows } = await client.query(query);

    // Respond with the fetched data
    return new Response(JSON.stringify({ data: rows }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching classes data:", error);

    // Return an error response
    return new Response(
      JSON.stringify({ error: "Failed to fetch classes data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
