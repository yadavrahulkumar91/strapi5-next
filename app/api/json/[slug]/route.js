import connectToDatabase from "../../../lib/db";

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  //   const { slug } = url;
  const slug = (await params).slug;

  try {
    // const query = `
    // SELECT
    //   jsonbooks.id,
    //   json_build_object(
    //   'book_name', jsonbooks.book_name,
    //   'created_at', jsonbooks.created_at,
    //   'updated_at', jsonbooks.updated_at,
    //   'unit', (
    //     SELECT jsonb_agg(
    //     json_build_object(
    //       'id', units.id,
    //       'unit_name', units.unit_name,
    //       'Lesson', (
    //       SELECT jsonb_agg(
    //         json_build_object(
    //         'id', lessons.id,
    //         'lesson_name', lessons.lesson_name,
    //         'lesson_content', lessons.lesson_content,
    //                       'video_url', (
    //                         SELECT COALESCE(jsonb_agg(
    //                           json_build_object(
    //                             'id', video.id,
    //                             'video_url', video.video_url
    //                           )
    //                         ), '[]'::jsonb)
    //                         FROM components_jsonbook_video_urls AS video
    //                         WHERE video.id IN (
    //                           SELECT component_id
    //                           FROM components_jsonbook_lessons_components
    //                           WHERE entity_id = video.id
    //                           AND field = 'video_url'
    //                         )
    //                       ),
    //         'MCQ', (
    //           SELECT COALESCE(jsonb_agg(
    //           json_build_object(
    //             'id', mcqs.id,
    //             'hardness_level', NULL,
    //             'category', NULL,
    //             'qu', mcqs.qu,
    //             'a', mcqs.a,
    //             'b', mcqs.b,
    //             'c', mcqs.c,
    //             'd', mcqs.d,
    //             'ans', mcqs.ans,
    //             'sol', mcqs.sol,
    //                       'Asked_year', (
    //                         SELECT COALESCE(jsonb_agg(
    //                           json_build_object(
    //                             'id', year.id,
    //                             'year', year.asked_year
    //                           )
    //                         ), '[]'::jsonb)
    //                         FROM components_jsonbook_asked_years AS year
    //                         WHERE year.id IN (
    //                           SELECT component_id
    //                           FROM components_jsonbook_mcqs_components
    //                           WHERE entity_id = year.id
    //                           AND field = 'Asked_year'
    //                         )
    //                       )
    //           )
    //           ), '[]'::jsonb)
    //           FROM components_jsonbook_mcqs AS mcqs
    //           WHERE mcqs.id IN (
    //           SELECT component_id
    //           FROM components_jsonbook_lessons_components
    //           WHERE entity_id = lessons.id
    //           AND field = 'MCQ'
    //           )
    //         ),
    //         'Question_answer', (
    //           SELECT COALESCE(jsonb_agg(
    //           json_build_object(
    //             'id', qa.id,
    //             'Question', qa.question,
    //             'Asked_year', (
    //                         SELECT COALESCE(jsonb_agg(
    //                           json_build_object(
    //                             'id', qayear.id,
    //                             'year', qayear.asked_year
    //                           )
    //                         ), '[]'::jsonb)
    //                         FROM components_jsonbook_asked_years AS qayear
    //                         WHERE qayear.id IN (
    //                           SELECT component_id
    //                           FROM components_jsonbook_question_answers_components
    //                           WHERE entity_id = qayear.id
    //                           AND field = 'Asked_year'
    //                         )
    //                       ),
    //             'Answer', qa.answer,
    //                       'Marks', (
    //                         SELECT COALESCE(jsonb_agg(
    //                           json_build_object(
    //                             'id', marks.id,
    //                             'marks', marks.mark
    //                           )
    //                         ), '[]'::jsonb)
    //                         FROM components_jsonbook_marks AS marks
    //                         WHERE marks.id IN (
    //                           SELECT component_id
    //                           FROM components_jsonbook_question_answers_components
    //                           WHERE entity_id = qa.id
    //                           AND field = 'Marks'
    //                         )
    //                       )
    //           )
    //           ), '[]'::jsonb)
    //           FROM components_jsonbook_question_answers AS qa
    //           WHERE qa.id IN (
    //           SELECT component_id
    //           FROM components_jsonbook_lessons_components
    //           WHERE entity_id = lessons.id
    //           AND field = 'Question_answer'
    //           )
    //         )
    //         )
    //       )
    //       FROM components_jsonbook_lessons AS lessons
    //       WHERE lessons.id IN (
    //         SELECT component_id
    //         FROM components_jsonbook_units_components
    //         WHERE entity_id = units.id
    //         AND field = 'Lesson'
    //       )
    //       )
    //     )
    //     )
    //     FROM components_jsonbook_units AS units
    //     WHERE units.id IN (
    //     SELECT component_id
    //     FROM jsonbooks_components
    //     WHERE entity_id = jsonbooks.id
    //     AND field = 'unit'
    //     )

    //   )
    //   ) AS attributes
    // FROM jsonbooks
    // WHERE jsonbooks.id = $1;
    //   `;

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
                    'Unit_name', units.unit_name,
                    'Lesson', (
                        SELECT jsonb_agg(
                            json_build_object(
                                'id', lessons.id,
                                'Lesson_name', lessons.lesson_name,
                                'lesson_content', lessons.lesson_content,
                                'video_url', (
                                    SELECT COALESCE(jsonb_agg(
                                        json_build_object(
                                            'id', video.id,
                                            'video_url', video.video_url
                                        )
                                    ORDER BY vc.order ASC), '[]'::jsonb)
                                    FROM components_jsonbook_video_urls AS video
                                    JOIN components_jsonbook_lessons_components AS vc
                                    ON vc.component_id = video.id
                                    WHERE vc.entity_id = lessons.id
                                    AND vc.field = 'video_url'
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
                                                        'Asked_year', year.asked_year
                                                    )
                                                ORDER BY yc.order ASC), '[]'::jsonb)
                                                FROM components_jsonbook_asked_years AS year
                                                JOIN components_jsonbook_mcqs_components AS yc
                                                ON yc.component_id = year.id
                                                WHERE yc.entity_id = mcqs.id
                                                AND yc.field = 'Asked_year'
                                            )
                                        )
                                    ORDER BY mc.order ASC), '[]'::jsonb)
                                    FROM components_jsonbook_mcqs AS mcqs
                                    JOIN components_jsonbook_lessons_components AS mc
                                    ON mc.component_id = mcqs.id
                                    WHERE mc.entity_id = lessons.id
                                    AND mc.field = 'MCQ'
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
                                                        'Asked_year', qayear.asked_year
                                                    )
                                                ORDER BY qac.order ASC), '[]'::jsonb)
                                                FROM components_jsonbook_asked_years AS qayear
                                                JOIN components_jsonbook_question_answers_components AS qac
                                                ON qac.component_id = qayear.id
                                                WHERE qac.entity_id = qa.id
                                                AND qac.field = 'Asked_year'
                                            ),
                                            'Answer', qa.answer,
                                            'Marks', (
                                                SELECT COALESCE(jsonb_agg(
                                                    json_build_object(
                                                        'id', marks.id,
                                                        'Mark', marks.mark
                                                    )
                                                ORDER BY mq.order ASC), '[]'::jsonb)
                                                FROM components_jsonbook_marks AS marks
                                                JOIN components_jsonbook_question_answers_components AS mq
                                                ON mq.component_id = marks.id
                                                WHERE mq.entity_id = qa.id
                                                AND mq.field = 'Marks'
                                            )
                                        )
                                    ORDER BY q.order ASC), '[]'::jsonb)
                                    FROM components_jsonbook_question_answers AS qa
                                    JOIN components_jsonbook_lessons_components AS q
                                    ON q.component_id = qa.id
                                    WHERE q.entity_id = lessons.id
                                    AND q.field = 'Question_answer'
                                )
                            )
                        ORDER BY lc.order ASC)
                        FROM components_jsonbook_lessons AS lessons
                        JOIN components_jsonbook_units_components AS lc
                        ON lc.component_id = lessons.id
                        WHERE lc.entity_id = units.id
                        AND lc.field = 'Lesson'
                    )
                )
            ORDER BY uc.order ASC)
            FROM components_jsonbook_units AS units
            JOIN jsonbooks_components AS uc
            ON uc.component_id = units.id
            WHERE uc.entity_id = jsonbooks.id
            AND uc.field = 'unit'
        )
    ) AS attributes
FROM jsonbooks
WHERE jsonbooks.id = $1;
        `;

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
