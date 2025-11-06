import { test, expect } from "@playwright/test";
import { LoginPageMosaic } from "../page-objects/loginPageMosaic";
import { CafesPageMosaic } from "../page-objects/cafesPageMosaicWithDBTesting";
import { getDBConnection } from "../page-objects/utils/db";
import { RowDataPacket } from "mysql2";

test("cafes Page", async ({ page }) => {
  const loginPageMosaic = new LoginPageMosaic(page);
  const cafeModule = new CafesPageMosaic(page);

  // Step 1: Login into Mosaic
  await loginPageMosaic.goto();
  await loginPageMosaic.login("kajal@newput.com", "bamco123");

  // Add new cafe and verify all the fields
  await cafeModule.cafeModuleClick();
  await cafeModule.addNewCafe("New Newput Cafe 11");

  // 🕒 Access the EST time captured during creation
  const estDate = cafeModule.createdESTTime;
  console.log("EST Time captured when creating café:", estDate);
  const cafeName = "New Newput Cafe 11";

  // Connect Cafebonappetit DB and fetch new created cafe
  const connection = await getDBConnection();

  const [rows] = await connection.execute<RowDataPacket[]>(
    "SELECT * FROM cafes WHERE name = ?",
    [cafeName]
  );

  //Verify each DB field
  expect(rows.length).toBeGreaterThan(0);
  expect(rows[0].name).toBe(cafeName);
  expect(rows[0].account_id).toBe(529);
  expect(rows[0].location_id).toBe(774);
  expect(rows[0].cc_id ?? null).toBe(null);
  expect(rows[0].description ?? null).toBe(null);
  expect(rows[0].catering ?? null).toBe(null); // Going to depricate
  expect(rows[0].blog_url ?? null).toBe(null);
  expect(rows[0].opening_times ?? null).toBe(null);
  expect(rows[0].address_line1 ?? null).toBe(null);
  expect(rows[0].address_line2 ?? null).toBe(null); // Going to depricate
  expect(rows[0].city ?? null).toBe(null);
  expect(rows[0].state ?? null).toBe(null);
  expect(rows[0].zip ?? null).toBe(null);
  //expect(rows[0].latitude).toBe(0.00000);
  //expect(rows[0].longitude).toBe(0.00000);
  expect(rows[0].contact_information ?? null).toBe(null); // Going to depricate
  expect(rows[0].image ?? null).toBe(null); // Going to depricate
  expect(rows[0].username ?? null).toBe(null); // Going to depricate
  expect(rows[0].password ?? null).toBe(null); // Going to depricate
  expect(rows[0].passwd_changed).toBe(0); // Going to depricate
  //expect(rows[0].can_log_in).toBe("N"); // Going to depricate
  expect(rows[0].status).toBe(0);
  //expect(rows[0].email_required).toBe("N"); // Going to depricate
  expect(rows[0].access).toBe(2);
  expect(rows[0].is_default).toBe(0);
  expect(rows[0].feedback_form_email_to ?? null).toBe(null); // Going to depricate
  expect(rows[0].feedback_form_email_cc ?? null).toBe(null); // Going to depricate
  expect(rows[0].feedback_form_email_bcc ?? null).toBe(null); // Going to depricate
  expect(rows[0].hide_price).toBe("N"); // Going to depricate
  //expect(rows[0].full_access).toBe(1); Some Issue
  //expect(rows[0].cafes_access ?? null).toBe(null); Some Issue
  //expect(rows[0].pages_access ?? null).toBe(null); Some Issue
  //expect(rows[0].menus_access ?? null).toBe(null); Some Issue
  //expect(rows[0].events_access ?? null).toBe(null); Some Issue
  //expect(rows[0].station_id_optout).toBe("16798"); // Going to depricate
  expect(rows[0].position).toBe(1);
  expect(rows[0].menu_type).toBe(1); // Going to depricate
  //expect(rows[0].updated_at ?? null).toBe(null);
  expect(rows[0].updated_by).toBe(117);
  //expect(rows[0].created_at ?? null).toBe(null);
  expect(rows[0].created_by).toBe(117);
  expect(rows[0].locked).toBe("N"); // Going to depricate
  //expect(rows[0].locked_date).toBe(1); // Going to depricate
  //expect(rows[0].locked_by).toBe(0); // Going to depricate
  expect(rows[0].eni_display_slider_image).toBe(0);
  expect(rows[0].eni_display_calories).toBe(0);
  expect(rows[0].display_wbi_on_signage).toBe(0); // Not in Uplate doc
  expect(rows[0].display_calories_on_signage).toBe(0); // Not in Uplate doc
  expect(rows[0].display_wbi_on_cba).toBe(0); // Not in Uplate doc
  expect(rows[0].display_calories_on_cba).toBe(0); // Not in Uplate doc
  expect(rows[0].price_required).toBe(0);
  expect(rows[0].signage_filters ?? null).toBe(null); // Going to depricate
  expect(rows[0].cost_center).toBe(0);
  expect(rows[0].breakfast_percentage ?? null).toBe(null);
  expect(rows[0].is_admin_cafe).toBe(0);
  expect(rows[0].static_menu_builder).toBe(0); // Going to depricate
  expect(rows[0].basecamp_menu).toBe(0); // Going to depricate
  expect(rows[0].item_image_static).toBe(0);
  expect(rows[0].item_image_special).toBe(0);
  expect(rows[0].item_image_go).toBe(0);
  expect(rows[0].fda_static_menu).toBe(1);
  expect(rows[0].static_menu_v2).toBe(1);
  //expect(rows[0].type_recipe).toBe("local"); // Going to depricate
  expect(rows[0].eni_enabled_cafe).toBe(0);
  expect(rows[0].color_printing_cafe).toBe(0);
  expect(rows[0].enable_go_menu).toBe(0);
  expect(rows[0].multiple_addresses).toBe(0);
  expect(rows[0].multiple_addresses_ids ?? null).toBe(null);
  expect(rows[0].facts_panel_cafe).toBe(0);
  expect(rows[0].is_facts_panel_cafe).toBe(0);
  expect(rows[0].ingredient_enabled_cafe).toBe(0);
  expect(rows[0].ingredient_enabled_cafe_cba).toBe(0);
  expect(rows[0].enable_signage_scaling).toBe(0);
  expect(rows[0].substation_in_specials_cafe).toBe(0); // Going to depricate
  expect(rows[0].enable_signage_generator).toBe(0);
  expect(rows[0].reload_ingredients_on_clone_cafe).toBe(0);
  expect(rows[0].nextep_id).toBe(0);
  expect(rows[0].orderable_items).toBe(0);
  expect(rows[0].orderable_goitems).toBe(0);
  expect(rows[0].exempt_waste).toBe(0);
  expect(rows[0].location_detail ?? null).toBe(null);
  expect(rows[0].apply_ingredient).toBe(0); // Going to depricate
  expect(rows[0].quarantine).toBe(0); // Going to depricate
  //expect(rows[0].enable_modifiers).toBe("Y"); // Going to depricate
  expect(rows[0].custom_bop).toBe(0);
  expect(rows[0].custom_bop_txt ?? null).toBe(null);
  expect(rows[0].station_image_cafe).toBe(0);
  expect(rows[0].dash_operator).toBe(0);
  expect(rows[0].pipe_operator).toBe(0);
  expect(rows[0].is_proposal).toBe(0);
  expect(rows[0].is_local).toBe(0);
  expect(rows[0].is_eurest).toBe(0);
  //expect(rows[0].default_wn_costcenter).toBe("N"); // Going to depricate
  expect(rows[0].display_foodstandard).toBe(1);
  expect(rows[0].details ?? null).toBe(null);
  expect(rows[0].sap_data ?? null).toBe(null);
  expect(rows[0].ps_market ?? null).toBe(null);
  expect(rows[0].ps_unitname ?? null).toBe(null);
  expect(rows[0].ps_dcn ?? null).toBe(null);
  expect(rows[0].ps_rdm ?? null).toBe(null);
  expect(rows[0].ps_rm ?? null).toBe(null);
  expect(rows[0].ps_line_business).toBe("");
  expect(rows[0].is_bamco_eurest).toBe(0);
  expect(rows[0].include_contains_statement).toBe(0);
  expect(rows[0].custom_qr_code_url ?? null).toBe(null);
  expect(rows[0].is_flik).toBe(0); // Not in Uplate doc
  expect(rows[0].is_commissary).toBe(0); // Not in Uplate doc
  //expect(rows[0].multiple_stationsl).toBe(0); // Not in Uplate doc

  console.log("Café verified in DB:", rows[0]);
});
