const { imageSize } = require('image-size');
const path = require('path');
const fs = require('fs');

const icons = [
  { name: 'icon-192.png', width: 192, height: 192 },
  { name: 'icon-512.png', width: 512, height: 512 },
  { name: 'opengraph-image.png', width: 1200, height: 630 }
];

console.log('🚀 Checking PWA Icons and Social Assets...\n');

icons.forEach(icon => {
  const filePath = path.join(process.cwd(), 'public', icon.name);
  console.log(`🔍 Checking: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ NOT FOUND: ${icon.name} is missing from /public\n`);
    return;
  }

  try {
    const dimensions = imageSize(filePath);
    if (dimensions.width === icon.width && dimensions.height === icon.height) {
      console.log(`✅ ${icon.name}: Correct (${dimensions.width}x${dimensions.height})\n`);
    } else {
      console.log(`❌ ${icon.name}: WRONG SIZE! Expected ${icon.width}x${icon.height}, found ${dimensions.width}x${dimensions.height}\n`);
    }
  } catch (err) {
    console.log(`❌ ${icon.name}: Corrupt file or wrong format.\n`);
  }
});