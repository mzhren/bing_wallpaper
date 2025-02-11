const fetchWallpapers = require('./fetchWallpapers');
const path = require('path');

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Usage: node fetchWallpapersByMonth.js <year> <month>');
  process.exit(1);
}

const year = args[0];
const month = args[1].padStart(2, '0');

const startDate = new Date(`${year}-${month}-01`);
const endDate = new Date(year, month, 0);

fetchWallpapers(startDate, endDate)
  .then(() => console.log(`Fetched wallpapers for ${year}-${month}.`))
  .catch(error => console.error(`Error: ${error.message}`));
