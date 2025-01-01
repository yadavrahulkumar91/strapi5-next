import connectToDatabase from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { lessonId, fileContent } = req.body;

    if (!lessonId || !fileContent) {
      return res
        .status(400)
        .json({ error: "Lesson ID and content are required." });
    }

    const { client } = await connectToDatabase();
    try {
      await connectToDatabase();
      const updateQuery = `
        UPDATE components_jsonbook_lessons
        SET lesson_content = $1
        WHERE id = $2
      `;
      await client.query(updateQuery, [fileContent, parseInt(lessonId)]);
      res.status(200).json({ message: "Content updated successfully." });
    } catch (error) {
      console.error("Error updating lesson content:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
