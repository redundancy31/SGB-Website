import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { safePortalDestination } from "../lib/auth/redirects.ts";
import { calculateTenure } from "../lib/tenure.ts";

test("redirects accept only known local portal paths", () => {
  assert.equal(safePortalDestination("/management/employees"), "/management/employees");
  assert.equal(safePortalDestination("https://evil.example"), "/dashboard");
  assert.equal(safePortalDestination("//evil.example"), "/dashboard");
  assert.equal(safePortalDestination("/\\\\evil.example"), "/dashboard");
  assert.equal(safePortalDestination("/management/employees?next=https://evil.example"), "/management/employees");
  assert.equal(safePortalDestination("/management/employees/export"), "/dashboard");
});

test("tenure is computed at the requested date and rejects invalid future dates", () => {
  assert.equal(calculateTenure("2020-10-27", new Date("2026-10-26T12:00:00Z")), "5 years, 11 months");
  assert.equal(calculateTenure("2025-02-28", new Date("2025-02-28T00:00:00Z")), "0 years, 0 months");
  assert.equal(calculateTenure("2026-02-31", new Date("2026-10-26T00:00:00Z")), "Not available");
  assert.equal(calculateTenure("2027-01-01", new Date("2026-10-26T00:00:00Z")), "Not available");
});

test("Supabase local auth configuration disables public registration", async () => {
  const config = await readFile(new URL("../supabase/config.toml", import.meta.url), "utf8");
  assert.match(config, /\[auth\][\s\S]*?enable_signup\s*=\s*false/);
  assert.match(config, /\[auth\.email\][\s\S]*?enable_signup\s*=\s*false/);
});

test("public marketing routes remain present", async () => {
  const routes = ["../../app/page.tsx", "../../app/contact/page.tsx", "../../app/about/page.tsx", "../../app/privacy-policy/page.tsx"];
  for (const route of routes) await readFile(new URL(route, import.meta.url), "utf8");
});
