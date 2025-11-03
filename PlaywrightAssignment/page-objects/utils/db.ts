import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export async function getDBConnection() {
  console.log("ENV loaded:", {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  });

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
  });

  console.log("Connected and using DB:", process.env.DB_NAME);

  return connection;
}
