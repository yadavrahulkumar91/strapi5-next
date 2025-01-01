import connectToDatabase from "../../lib/db";

// import connectToDatabase from "./chokidar";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Lesson ID is required." });
    }
    const { client } = await connectToDatabase();
    try {
      await connectToDatabase();
      const query =
        "SELECT lesson_content FROM components_jsonbook_lessons WHERE id = $1";
      const result = await client.query(query, [parseInt(id)]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Lesson not found." });
      }
      res.status(200).json({ lesson_content: result.rows[0].lesson_content });
    } catch (error) {
      console.error("Error fetching lesson content:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
