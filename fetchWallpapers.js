const { chromium } = require('playwright');
const fs = require('fs-extra');
const path = require('path');

async function fetchWallpapers(startDate, endDate) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const wallpapers = [];
  const today = new Date();

  for (let date = new Date(startDate); date <= endDate && date <= today; date.setDate(date.getDate() + 1)) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const pageUrl = `https://bing.wdbyte.com/day/${year}${month}/${day}`;
    console.log(`Fetching ${pageUrl}...`);

    await page.goto(pageUrl);

    const pageWallpapers = await page.evaluate(() => {
      const h1 = document.querySelector('h1')?.innerText;
      const description = document.querySelector('p.w3-large')?.innerText;
      const link4k = Array.from(document.querySelectorAll('a')).find(a => a.innerText?.includes('4K'))?.href;
      const link1080p = Array.from(document.querySelectorAll('a')).find(a => a.innerText?.includes('1080P'))?.href;

      return {
        id: h1,
        description: description,
        '4k': link4k,
        '1080P': link1080p
      };
    });

    wallpapers.push(pageWallpapers);
  }

  await browser.close();

  const year = startDate.getFullYear();
  const month = String(startDate.getMonth() + 1).padStart(2, '0');
  const dir = path.join(__dirname, 'wallpapers', `${year}`);

  await fs.ensureDir(dir);
  await fs.writeJson(path.join(dir, `${year}${month}.json`), wallpapers, { spaces: 2 });

  console.log(`Fetched ${wallpapers.length} wallpapers for ${year}-${month}.`);
}

module.exports = fetchWallpapers;
