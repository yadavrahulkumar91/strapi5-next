import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";

export async function POST(req) {
  try {
    // Parse the request body
    const { lessonId, fileContent } = await req.json();

    // Validate the request payload
    if (!lessonId || !fileContent) {
      return NextResponse.json(
        { error: "Lesson ID and content are required." },
        { status: 400 }
      );
    }

    // Connect to the database
    const { client } = await connectToDatabase();

    try {
      // Prepare and execute the update query
      const updateQuery = `
        UPDATE components_jsonbook_lessons
        SET lesson_content = $1
        WHERE id = $2
      `;
      await client.query(updateQuery, [fileContent, parseInt(lessonId)]);

      return NextResponse.json(
        { message: "Content updated successfully." },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating lesson content:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    } finally {
      // Ensure the client is released back to the pool
      client.release();
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
}
