// import fs from "fs";
// import path from "path";
// import { promisify } from "util";
// import { Client } from "pg";

// const mkdir = promisify(fs.mkdir);
// const writeFile = promisify(fs.writeFile);

// export default async function handler(req, res) {
//   const client = new Client({
//     user: "avnadmin",
//     host: "gamechanger-academy1-gamechanger-academy.a.aivencloud.com",
//     database: "gamechanger_academy",
//     password: "AVNS_nI2zH78Uh-tzJMU1Egl",
//     port: 10459,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   });

//   await client.connect();

//   const booksQuery = `SELECT * FROM jsonbooks`;
//   const books = await client.query(booksQuery);

//   const baseDir = path.join(process.cwd(), "content");

//   if (!fs.existsSync(baseDir)) {
//     await mkdir(baseDir);
//   }

//   for (let book of books.rows) {
//     const bookDir = path.join(baseDir, book.book_name_id);

//     if (!fs.existsSync(bookDir)) {
//       await mkdir(bookDir);
//     }

//     const unitsQuery = `
//       SELECT u.*
//       FROM components_jsonbook_units u
//       JOIN jsonbooks_components bc ON bc.component_id = u.id
//       WHERE bc.entity_id = $1`;
//     const units = await client.query(unitsQuery, [book.id]);
//     console.log(units);

//     for (let unit of units.rows) {
//       const unitDir = path.join(bookDir, unit.unit_name);

//       if (!fs.existsSync(unitDir)) {
//         await mkdir(unitDir);
//       }

//       const lessonsQuery = `
//         SELECT l.*
//         FROM components_jsonbook_lessons l
//         JOIN components_jsonbook_units_components uc ON uc.component_id = l.id
//         WHERE uc.entity_id = $1`;
//       const lessons = await client.query(lessonsQuery, [unit.id]);

//       for (let lesson of lessons.rows) {
//         const filePath = path.join(
//           unitDir,
//           `${lesson.id}_${lesson.lesson_name}.json`
//         );

//         let contentToWrite;
//         let lessonContent = lesson.lesson_content;
//         if (lessonContent === null || lessonContent === undefined) {
//           contentToWrite = "";
//         } else {
//           contentToWrite = lessonContent;
//         }

//         await writeFile(filePath, contentToWrite);
//       }
//     }
//   }

//   await client.end();

//   res.status(200).json({ message: "Files generated successfully" });
// }

import fs from "fs";
import path from "path";
import { promisify } from "util";
import { Client } from "pg";

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

export default async function handler(req, res) {
  const client = new Client({
    user: "avnadmin",
    host: "gamechanger-academy1-gamechanger-academy.a.aivencloud.com",
    database: "gamechanger_academy",
    password: "AVNS_nI2zH78Uh-tzJMU1Egl",
    port: 10459,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();

  const baseDir = path.join(process.cwd(), "content");

  if (!fs.existsSync(baseDir)) {
    await mkdir(baseDir);
  }

  // Step 1: Get all sections
  const sectionsQuery = `SELECT * FROM sections`;
  const sections = await client.query(sectionsQuery);

  for (let section of sections.rows) {
    const sectionDir = path.join(baseDir, section.section_name);

    if (!fs.existsSync(sectionDir)) {
      await mkdir(sectionDir);
    }

    // Step 2: Get all classes linked to the section
    const classesQuery = `
      SELECT c.*
      FROM classes c
      JOIN classes_section_links cl ON cl.class_id = c.id
      WHERE cl.section_id = $1`;
    const classes = await client.query(classesQuery, [section.id]);

    for (let classItem of classes.rows) {
      const classDir = path.join(sectionDir, classItem.class_name);

      if (!fs.existsSync(classDir)) {
        await mkdir(classDir);
      }

      // Step 3: Get all books linked to the class
      const booksQuery = `
        SELECT b.*
        FROM jsonbooks b
        JOIN jsonbooks_class_links bc ON bc.jsonbook_id = b.id
        WHERE bc.class_id = $1`;
      const books = await client.query(booksQuery, [classItem.id]);

      for (let book of books.rows) {
        const bookDir = path.join(classDir, book.book_name_id);

        if (!fs.existsSync(bookDir)) {
          await mkdir(bookDir);
        }

        // Step 4: Get all units linked to the book
        const unitsQuery = `
          SELECT u.*
          FROM components_jsonbook_units u
          JOIN jsonbooks_components bc ON bc.component_id = u.id
          WHERE bc.entity_id = $1`;
        const units = await client.query(unitsQuery, [book.id]);

        for (let unit of units.rows) {
          const unitDir = path.join(bookDir, unit.unit_name);

          if (!fs.existsSync(unitDir)) {
            await mkdir(unitDir);
          }

          // Step 5: Get all lessons linked to the unit
          const lessonsQuery = `
            SELECT l.*
            FROM components_jsonbook_lessons l
            JOIN components_jsonbook_units_components uc ON uc.component_id = l.id
            WHERE uc.entity_id = $1`;
          const lessons = await client.query(lessonsQuery, [unit.id]);

          for (let lesson of lessons.rows) {
            const lessonDir = path.join(
              unitDir,
              `${lesson.id}_${lesson.lesson_name}`
            );

            if (!fs.existsSync(lessonDir)) {
              await mkdir(lessonDir);
            }

            const filePath = path.join(
              lessonDir,
              `${lesson.id}_${lesson.lesson_name}.json`
            );

            let contentToWrite = lesson.lesson_content || "";

            await writeFile(filePath, contentToWrite);
          }
        }
      }
    }
  }

  await client.end();

  res.status(200).json({ message: "Folders and files generated successfully" });
}
