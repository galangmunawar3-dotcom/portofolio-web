const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const input = path.join(__dirname, 'assets/images/profile/ini-galang.jpeg');
const tmp = path.join(__dirname, 'assets/images/profile/ini-galang-tmp.jpeg');

sharp(input)
  .metadata()
  .then(meta => {
    const { width, height } = meta;
    console.log(`Original: ${width}x${height}`);

    return sharp(input)
      .resize(400, 400, {
        fit: 'contain',
        background: { r: 10, g: 10, b: 10, alpha: 1 },
        kernel: 'lanczos3',
      })
      .jpeg({ quality: 92 })
      .toFile(tmp)
      .then(() => {
        fs.unlinkSync(input);
        fs.renameSync(tmp, input);
        console.log('✅ Image resized: full body fits in 400x400');
      });
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
