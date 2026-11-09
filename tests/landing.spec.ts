import { test, expect } from "@playwright/test";
import { mockApi } from "./fixtures";
test("landing explains the simulation and shows real API-shaped catalog data", async ({
  page,
}) => {
  await mockApi(page);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A little browsing",
  );
  await expect(page.getByText("Fixture Tea", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Browse demo catalog", exact: true }),
  ).toHaveAttribute("href", "/store/");
  await expect(
    page.getByText(/No real payments or transactions/),
  ).toBeVisible();
});
test("privacy provides a working analytics opt-out", async ({ page }) => {
  await mockApi(page);
  await page.goto("/privacy/");
  await page
    .getByRole("button", { name: "Disable optional analytics on this browser" })
    .click();
  await expect(page.getByRole("alert")).toContainText("disabled");
});
