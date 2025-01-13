import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";

export async function POST(req) {
  try {
    // Parse the request body
    const { lessonId, mcqs } = await req.json();
    const mcqsData = JSON.parse(mcqs);
    // Validate the request payload
    console.log("Received payload:", lessonId, mcqsData);
    if (!lessonId || !mcqsData || !Array.isArray(mcqsData)) {
      return NextResponse.json(
        { error: "Lesson ID and an array of MCQs are required." },
        { status: 400 }
      );
    }

    // Connect to the database
    const { client } = await connectToDatabase();

    try {
      // Start a transaction
      await client.query("BEGIN");

      // Get the start order for the lesson
      const resOrder = await client.query(
        'SELECT COALESCE(MAX("order"), 0) AS start_order FROM components_jsonbook_lessons_components WHERE entity_id = $1',
        [lessonId]
      );
      let startOrder = resOrder.rows[0].start_order;

      for (const mcq of mcqsData) {
        const [question, optA, optB, optC, optD, ans, sol, askedYears] = mcq;

        // Insert the MCQ into the database
        const mcqRes = await client.query(
          "INSERT INTO components_jsonbook_mcqs (qu, a, b, c, d, ans, sol) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
          [question, optA, optB, optC, optD, ans, sol]
        );
        const mcqId = mcqRes.rows[0].id;

        // Update the lesson components table
        startOrder += 1;
        await client.query(
          'INSERT INTO components_jsonbook_lessons_components (entity_id, component_id, component_type, field, "order") VALUES ($1, $2, $3, $4, $5)',
          [lessonId, mcqId, "jsonbook.mcq", "MCQ", startOrder]
        );

        // Insert the asked years and their relationships
        const resAskedYearOrder = await client.query(
          'SELECT COALESCE(MAX("order"), 0) AS start_order FROM components_jsonbook_mcqs_components WHERE entity_id = $1',
          [mcqId]
        );
        let startAskedYearOrder = resAskedYearOrder.rows[0].start_order;

        for (const year of askedYears) {
          const yearRes = await client.query(
            "INSERT INTO components_jsonbook_asked_years (asked_year) VALUES ($1) RETURNING id",
            [year]
          );
          const yearId = yearRes.rows[0].id;

          startAskedYearOrder += 1;
          await client.query(
            'INSERT INTO components_jsonbook_mcqs_components (entity_id, component_id, component_type, field, "order") VALUES ($1, $2, $3, $4, $5)',
            [
              mcqId,
              yearId,
              "jsonbook.asked-year",
              "Asked_year",
              startAskedYearOrder,
            ]
          );
        }
      }

      // Commit the transaction
      await client.query("COMMIT");

      return NextResponse.json(
        { message: "MCQs inserted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error inserting MCQs:", error);
      // Rollback the transaction in case of an error
      await client.query("ROLLBACK");
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
