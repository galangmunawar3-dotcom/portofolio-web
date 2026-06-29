const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const input = path.join(__dirname, 'assets/images/profile/ini-galang-2.jpeg');

sharp(input)
  .metadata()
  .then(meta => {
    console.log(`Original: ${meta.width}x${meta.height}`);
    return sharp(input)
      .resize(400, 400, { fit: 'cover', position: 'center', kernel: 'lanczos3' })
      .jpeg({ quality: 92 })
      .toFile(input + '.tmp')
      .then(() => {
        fs.unlinkSync(input);
        fs.renameSync(input + '.tmp', input);
        console.log('✅ Resized to 400x400 cover (full frame, no black bars)');
      });
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
