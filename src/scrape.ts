import { Browser } from "playwright";
import { randEmail, randUserName } from "@ngneat/falso";

export async function scrape(browser: Browser): Promise<Browser> {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://google.com");

  const username = randUserName();
  const email = randEmail();

  console.log({ username, email });

  await page.close();
  await context.close();
  return browser;
}
