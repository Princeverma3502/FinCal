const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);

const generate = async () => {
  console.log('🎨 Generating Brand Assets (Fixed XML & Maskable)...');

  // Standard Logo SVG
  const svgLogo = (size, padding = 0.2) => `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" rx="${size * padding}" fill="#4f46e5"/>
      <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" 
        fill="white" font-family="Arial, sans-serif" font-weight="900" font-size="${size * 0.6}">F</text>
    </svg>
  `;

  // Maskable Logo (Icons for Android need more padding/safe-zone)
  const svgMaskable = (size) => `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#4f46e5"/>
      <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" 
        fill="white" font-family="Arial, sans-serif" font-weight="900" font-size="${size * 0.4}">F</text>
    </svg>
  `;

  // Social Preview SVG
  const ogSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#F8FAFC"/>
      <rect width="1200" height="10" fill="#4f46e5"/>
      <circle cx="600" cy="250" r="80" fill="#4f46e5"/>
      <text x="600" y="265" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-weight="900" font-size="90">F</text>
      <text x="600" y="420" dominant-baseline="middle" text-anchor="middle" fill="#0F172A" font-family="sans-serif" font-weight="900" font-size="70">FinCal Mortgage Pro</text>
      <text x="600" y="480" dominant-baseline="middle" text-anchor="middle" fill="#64748B" font-family="sans-serif" font-weight="500" font-size="30">Advanced Equity &amp; Loan Tracking</text>
    </svg>
  `;

  // Generate Files
  await sharp(Buffer.from(svgLogo(192))).png().toFile(path.join(PUBLIC_DIR, 'icon-192.png'));
  await sharp(Buffer.from(svgMaskable(192))).png().toFile(path.join(PUBLIC_DIR, 'icon-maskable-192.png'));
  await sharp(Buffer.from(svgLogo(512))).png().toFile(path.join(PUBLIC_DIR, 'icon-512.png'));
  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(PUBLIC_DIR, 'opengraph-image.png'));

  console.log('✨ All assets generated successfully in /public!');
};

generate().catch(console.error);