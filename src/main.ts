import { createBrowserPool } from "./pool";
import { scrape } from "./scrape";

const browserPool = createBrowserPool();

const browserCount = 5;
let cnt = 0;
const limit = 1000;

const random = () => Math.random() * 1000;

async function main() {
  const browsers = await Promise.all(
    [...Array(browserCount)].map(() => browserPool.acquire())
  );

  const scrapedBrowsers = await Promise.all(
    browsers.map((browser) => scrape(browser))
  );

  await Promise.all(
    scrapedBrowsers.map((browser) => browserPool.release(browser))
  );

  if (cnt++ < limit) {
    setTimeout(main, random());
  }
}

(async () => {
  await main();
})()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // .finally(() => browserPool.drain());
