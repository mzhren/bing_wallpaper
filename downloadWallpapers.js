const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

const args = process.argv.slice(2);

if (args.length < 2 || (args[0] !== '-d' && args[0] !== '-f')) {
  console.error('Usage: node downloadWallpapers.js -d <folder> | -f <file>');
  process.exit(1);
}

const mode = args[0];
const targetPath = args[1];

async function downloadImage(url, filepath) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  await fs.writeFile(filepath, response.data);
  console.log(`Downloaded ${filepath}`);
}

async function processJsonFile(filePath) {
  const data = await fs.readJson(filePath);
  const dir = path.dirname(filePath);
  const month = path.basename(filePath, '.json').slice(0, 6);

  for (const item of data) {
    const imageDir = path.join(dir, month);
    if (!item['4k']) {
      console.error(`No 4K image for ${item.id}`);
      continue;
    }
    await fs.ensureDir(imageDir);
    const imagePath = path.join(imageDir, `${item.id}.jpg`);
    if (await fs.pathExists(imagePath)) {
      console.log(`Image already exists: ${imagePath}`);
      continue;
    }
    await downloadImage(item['4k'], imagePath);
  }
}

(async () => {
  if (mode === '-d') {
    const files = await fs.readdir(targetPath);
    for (const file of files) {
      if (file.endsWith('.json')) {
        await processJsonFile(path.join(targetPath, file));
      }
    }
  } else if (mode === '-f') {
    await processJsonFile(targetPath);
  }
})();
