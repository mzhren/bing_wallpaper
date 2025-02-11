const fetchWallpapers = require('./fetchWallpapers');
const fs = require('fs-extra');
const path = require('path');

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('Usage: node fetchWallpapersByYear.js <year>');
  process.exit(1);
}

const year = args[0];
const yearDir = path.join(__dirname, 'wallpapers', year);

(async () => {
  await fs.ensureDir(yearDir);

  for (let month = 1; month <= 12; month++) {
    const monthStr = String(month).padStart(2, '0');
    const startDate = new Date(`${year}-${monthStr}-01`);
    const endDate = new Date(year, month, 0);

    await fetchWallpapers(startDate, endDate);
  }

  console.log(`Fetched wallpapers for the year ${year}.`);
})();
