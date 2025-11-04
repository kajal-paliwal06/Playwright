import { test, expect } from "@playwright/test";
import { getDBConnection } from "../page-objects/utils/db";
import { RowDataPacket } from "mysql2";

test("Verify user exists in database", async () => {
  const connection = await getDBConnection();

  const [rows] = await connection.execute<RowDataPacket[]>(
    "SELECT * FROM employees WHERE first_name = ?",
    ["Kajal"]
  );

  console.log(rows);
  expect(rows.length).toBeGreaterThan(0);

  await connection.end();
});
