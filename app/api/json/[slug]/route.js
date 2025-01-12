import connectToDatabase from "@/lib/db";

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  //   const { slug } = url;
  const slug = (await params).slug;
  console.log(slug);
  try {
    // SQL query to fetch jsonbook details by slug with populated relations
    const query = `
    SELECT
      jsonbooks.id,
      jsonb_build_object(
      'book_name', jsonbooks.book_name,
      'created_at', jsonbooks.created_at,
      'updated_at', jsonbooks.updated_at,
      'units', (
        SELECT jsonb_agg(
        jsonb_build_object(
          'id', units.id,
          'unit_name', units.unit_name,
          'lessons', (
          SELECT jsonb_agg(
            jsonb_build_object(
            'id', lessons.id,
            'lesson_name', lessons.lesson_name,
            'lesson_content', lessons.lesson_content,
            'mcqs', (
              SELECT COALESCE(jsonb_agg(
              jsonb_build_object(
                'id', mcqs.id,
                'hardness_level', NULL,
                'category', NULL,
                'qu', mcqs.qu,
                'a', mcqs.a,
                'b', mcqs.b,
                'c', mcqs.c,
                'd', mcqs.d,
                'ans', mcqs.ans,
                'sol', mcqs.sol
              )
              ), '[]'::jsonb)
              FROM components_jsonbook_mcqs AS mcqs
              WHERE mcqs.id IN (
              SELECT component_id
              FROM components_jsonbook_lessons_components
              WHERE entity_id = lessons.id
              AND field = 'MCQ'
              )
            ),
            'question_answers', (
              SELECT COALESCE(jsonb_agg(
              jsonb_build_object(
                'id', qa.id,
                'question', qa.question,
                'answer', qa.answer
              )
              ), '[]'::jsonb)
              FROM components_jsonbook_question_answers AS qa
              WHERE qa.id IN (
              SELECT component_id
              FROM components_jsonbook_lessons_components
              WHERE entity_id = lessons.id
              AND field = 'Question_answer'
              )
            )
            )
          )
          FROM components_jsonbook_lessons AS lessons
          WHERE lessons.id IN (
            SELECT component_id
            FROM components_jsonbook_units_components
            WHERE entity_id = units.id
            AND field = 'Lesson'
          )
          )
        )
        )
        FROM components_jsonbook_units AS units
        WHERE units.id IN (
        SELECT component_id
        FROM jsonbooks_components
        WHERE entity_id = jsonbooks.id
        AND field = 'unit'
        )
      )
      ) AS attributes
    FROM jsonbooks
    WHERE jsonbooks.id = $1;
      `;
    // const query = `
    //   SELECT
    //     jsonbooks.id AS jsonbook_id,
    //     jsonbooks.book_name
    //   FROM jsonbooks
    //   WHERE jsonbooks.id = $1;
    // `;

    const { client } = await connectToDatabase();
    // Execute the query with the slug parameter
    const { rows } = await client.query(query, [slug]);

    // Check if there are rows and return the first one, otherwise return null
    const data = rows.length > 0 ? rows[0] : null;

    // Respond with the fetched data
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching jsonbook data by slug:", error);

    // Return an error response
    return new Response(
      JSON.stringify({ error: "Failed to fetch jsonbook data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
