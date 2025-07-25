const fs = require('fs');
const path = require('path');

// Simple image optimization script
async function optimizeImages() {
  const imagesDir = path.join(__dirname, '../assets/images');
  const files = fs.readdirSync(imagesDir);
  
  console.log('🖼️  Analyzing image assets...\n');
  
  files.forEach(file => {
    if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
      const filePath = path.join(imagesDir, file);
      const stats = fs.statSync(filePath);
      const sizeInKB = Math.round(stats.size / 1024);
      
      console.log(`📄 ${file}: ${sizeInKB}KB`);
      
      if (sizeInKB > 100) {
        console.log(`⚠️  ${file} is large (${sizeInKB}KB) - consider optimizing`);
      }
    }
  });
  
  console.log('\n💡 Optimization recommendations:');
  console.log('1. Use WebP format for better compression');
  console.log('2. Resize images to actual display dimensions');
  console.log('3. Use different resolutions (@1x, @2x, @3x) for responsive images');
  console.log('4. Consider removing unused images');
  console.log('5. Use expo-image for automatic optimization');
}

optimizeImages().catch(console.error);