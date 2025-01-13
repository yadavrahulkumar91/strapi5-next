//lib/db.js

import { Pool } from "pg";

let pool;

export default async function connectToDatabase() {
  if (!pool) {
    pool = new Pool({
      user: "avnadmin",
      host: "gamechanger-academy1-gamechanger-academy.a.aivencloud.com",
      database: "gamechanger_academy",
      password: "AVNS_nI2zH78Uh-tzJMU1Egl",
      port: 10459,
      ssl: {
        rejectUnauthorized: false, // Disable SSL verification (not recommended for production)
      },
    });

    pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
      process.exit(-1);
    });
  }

  try {
    const client = await pool.connect();
    return { client, pool };
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
}
