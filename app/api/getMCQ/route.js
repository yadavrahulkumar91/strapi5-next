// getMCQ API route
import connectToDatabase from "../../../lib/db";

export async function GET(req) {
  // Parse search parameters
  const { searchParams } = new URL(req.url);
  const lessonId = searchParams.get("lessonId");

  if (!lessonId) {
    return new Response(
      JSON.stringify({ message: "Missing lessonId parameter" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  let client;

  try {
    // Connect to the database
    const db = await connectToDatabase();
    client = db.client;

    const mcqQuery = `
      SELECT mcqs.id AS mcq_id, mcqs.qu AS question, mcqs.a AS option_a, mcqs.b AS option_b, 
             mcqs.c AS option_c, mcqs.d AS option_d, mcqs.ans AS answer, mcqs.sol AS solution,
             array_agg(ay.asked_year) AS asked_years
      FROM components_jsonbook_lessons_components AS lc
      INNER JOIN components_jsonbook_mcqs AS mcqs ON lc.component_id = mcqs.id
      LEFT JOIN components_jsonbook_mcqs_components AS mcc ON mcqs.id = mcc.entity_id
      LEFT JOIN components_jsonbook_asked_years AS ay ON mcc.component_id = ay.id
      WHERE lc.entity_id = $1 AND lc.component_type = 'jsonbook.mcq'
      GROUP BY mcqs.id, lc."order"
      ORDER BY lc."order";
    `;

    const result = await client.query(mcqQuery, [lessonId]);

    const mcqs = result.rows.map((row) => ({
      id: row.mcq_id,
      question: row.question,
      options: {
        A: row.option_a,
        B: row.option_b,
        C: row.option_c,
        D: row.option_d,
      },
      answer: row.answer,
      solution: row.solution,
      askedYears: row.asked_years || [],
    }));

    return new Response(JSON.stringify({ mcqs }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching MCQs:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching MCQs", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    if (client) {
      client.release();
    }
  }
}
