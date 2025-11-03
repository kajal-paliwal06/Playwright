import { test } from "@playwright/test";

test("login through api testing", async ({ page, request }) => {
  // Step 1: Login
  const response = await request.post(
    "https://cafemanager.dev.bamcotest.com/cafemanager/login",
    {
      data: {
        username: "99304153",
        password: "123bamco",
      },
    }
  );
  console.log(response.status());
  console.log(response.body());

  await request.post(
    "https://cafemanager.dev.bamcotest.com/ajax/cafemanager/delete_menu_item",
    {
      data: {
        item_id_to_delete: "31569810",
        delete_item: "one",
      },
    }
  );
});
