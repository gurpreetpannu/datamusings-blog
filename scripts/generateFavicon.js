const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const sharp = require('sharp');

// Create the scripts directory if it doesn't exist
const scriptsDir = path.join(__dirname);
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

// Function to draw the robot logo
function drawRobotLogo(ctx, size) {
  // Set background
  ctx.fillStyle = '#1a8917';
  ctx.fillRect(0, 0, size, size);

  const scale = size / 40;
  ctx.scale(scale, scale);

  // Robot Head
  ctx.fillStyle = '#1a8917';
  ctx.beginPath();
  ctx.roundRect(8, 8, 24, 24, 4);
  ctx.fill();

  // Eyes
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(16, 18, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(24, 18, 3, 0, Math.PI * 2);
  ctx.fill();

  // Antenna
  ctx.strokeStyle = '#1a8917';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(20, 8);
  ctx.lineTo(20, 4);
  ctx.stroke();

  ctx.fillStyle = '#1a8917';
  ctx.beginPath();
  ctx.arc(20, 4, 2, 0, Math.PI * 2);
  ctx.fill();

  // Smile
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(14, 24);
  ctx.quadraticCurveTo(20, 28, 26, 24);
  ctx.stroke();
}

// Generate PNG files
[16, 32, 192, 512].forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  drawRobotLogo(ctx, size);

  const buffer = canvas.toBuffer('image/png');
  const fileName = size === 16 || size === 32 ? `favicon-${size}x${size}.png` : `logo${size}.png`;
  fs.writeFileSync(path.join(__dirname, '..', 'public', fileName), buffer);
});

// Generate ICO file from 16x16 and 32x32 PNGs
Promise.all([16, 32].map(size => 
  sharp(path.join(__dirname, '..', 'public', `favicon-${size}x${size}.png`))
    .toBuffer()
)).then(buffers => {
  // Use sharp to create ICO file
  sharp(buffers[0])
    .toFile(path.join(__dirname, '..', 'public', 'favicon.ico'))
    .then(() => {
      // Clean up temporary PNG files
      [16, 32].forEach(size => {
        fs.unlinkSync(path.join(__dirname, '..', 'public', `favicon-${size}x${size}.png`));
      });
      console.log('Favicon and logo files generated successfully!');
    });
}); 