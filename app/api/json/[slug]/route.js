import connectToDatabase from "@/lib/db";

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  //   const { slug } = url;
  const slug = (await params).slug;

  try {
    // SQL query to fetch jsonbook details by slug with populated relations
    const query = `
    SELECT
      jsonbooks.id,
      json_build_object(
      'book_name', jsonbooks.book_name,
      'created_at', jsonbooks.created_at,
      'updated_at', jsonbooks.updated_at,
      'unit', (
        SELECT jsonb_agg(
        json_build_object(
          'id', units.id,
          'unit_name', units.unit_name,
          'Lesson', (
          SELECT jsonb_agg(
            json_build_object(
            'id', lessons.id,
            'lesson_name', lessons.lesson_name,
            'lesson_content', lessons.lesson_content,
                          'video_url', (
                            SELECT COALESCE(jsonb_agg(
                              json_build_object(
                                'id', video.id,
                                'video_url', video.video_url
                              )
                            ), '[]'::jsonb)
                            FROM components_jsonbook_video_urls AS video
                            WHERE video.id IN (
                              SELECT component_id
                              FROM components_jsonbook_lessons_components
                              WHERE entity_id = video.id
                              AND field = 'Asked_year'
                            )
                          ),
            'MCQ', (
              SELECT COALESCE(jsonb_agg(
              json_build_object(
                'id', mcqs.id,
                'hardness_level', NULL,
                'category', NULL,
                'qu', mcqs.qu,
                'a', mcqs.a,
                'b', mcqs.b,
                'c', mcqs.c,
                'd', mcqs.d,
                'ans', mcqs.ans,
                'sol', mcqs.sol,
                          'Asked_year', (
                            SELECT COALESCE(jsonb_agg(
                              json_build_object(
                                'id', year.id,
                                'year', year.asked_year
                              )
                            ), '[]'::jsonb)
                            FROM components_jsonbook_asked_years AS year
                            WHERE year.id IN (
                              SELECT component_id
                              FROM components_jsonbook_mcqs_components
                              WHERE entity_id = year.id
                              AND field = 'Asked_year'
                            )
                          )
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
            'Question_answer', (
              SELECT COALESCE(jsonb_agg(
              json_build_object(
                'id', qa.id,
                'Question', qa.question,
                'Asked_year', (
                            SELECT COALESCE(jsonb_agg(
                              json_build_object(
                                'id', qayear.id,
                                'year', qayear.asked_year
                              )
                            ), '[]'::jsonb)
                            FROM components_jsonbook_asked_years AS qayear
                            WHERE qayear.id IN (
                              SELECT component_id
                              FROM components_jsonbook_question_answers_components
                              WHERE entity_id = qayear.id
                              AND field = 'Asked_year'
                            )
                          ),
                'Answer', qa.answer,
                          'Marks', (
                            SELECT COALESCE(jsonb_agg(
                              json_build_object(
                                'id', marks.id,
                                'marks', marks.mark
                              )
                            ), '[]'::jsonb)
                            FROM components_jsonbook_marks AS marks
                            WHERE marks.id IN (
                              SELECT component_id
                              FROM components_jsonbook_question_answers_components
                              WHERE entity_id = qa.id
                              AND field = 'Marks'
                            )
                          )
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
