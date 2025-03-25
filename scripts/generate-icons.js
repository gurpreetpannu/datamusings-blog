const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Base SVG for the icon - a simple "DM" text in a circle
const svgIcon = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <circle cx="256" cy="256" r="256" fill="#1a8917"/>
  <text x="256" y="300" font-family="Arial" font-size="200" font-weight="bold" fill="white" text-anchor="middle">DM</text>
</svg>
`;

// Ensure the images directory exists
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Save the SVG file
fs.writeFileSync(path.join(__dirname, '../public/images/icon.svg'), svgIcon);

// Generate PNG files of different sizes
async function generateIcons() {
  const sizes = [16, 32, 48, 64, 192, 512];
  
  for (const size of sizes) {
    await sharp(Buffer.from(svgIcon))
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `../public/images/icon-${size}x${size}.png`));
    
    console.log(`Generated ${size}x${size} icon`);
  }

  // Generate favicon.ico (16x16, 32x32, 48x48)
  const faviconSizes = [16, 32, 48];
  const faviconBuffers = await Promise.all(
    faviconSizes.map(size =>
      sharp(Buffer.from(svgIcon))
        .resize(size, size)
        .png()
        .toBuffer()
    )
  );

  await sharp(faviconBuffers[0])
    .toFile(path.join(__dirname, '../public/favicon.ico'));
  
  console.log('Generated favicon.ico');

  // Copy the 192x192 and 512x512 icons to the required locations
  fs.copyFileSync(
    path.join(__dirname, '../public/images/icon-192x192.png'),
    path.join(__dirname, '../public/logo192.png')
  );
  fs.copyFileSync(
    path.join(__dirname, '../public/images/icon-512x512.png'),
    path.join(__dirname, '../public/logo512.png')
  );
  
  console.log('Copied logo files');
}

generateIcons().catch(console.error); 