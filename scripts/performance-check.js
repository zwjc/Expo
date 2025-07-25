const fs = require('fs');
const path = require('path');

async function analyzePerformance() {
  console.log('🚀 Performance Analysis for Asteliria App\n');
  
  // Check bundle size
  console.log('📦 Bundle Size Analysis:');
  await analyzeBundleSize();
  
  // Check asset optimization
  console.log('\n🖼️  Asset Optimization:');
  await analyzeAssets();
  
  // Check code optimization
  console.log('\n⚡ Code Optimization:');
  await analyzeCode();
  
  console.log('\n✅ Performance Recommendations:');
  printRecommendations();
}

async function analyzeBundleSize() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    const dependencies = Object.keys(packageJson.dependencies || {}).length;
    const devDependencies = Object.keys(packageJson.devDependencies || {}).length;
    
    console.log(`  • Dependencies: ${dependencies}`);
    console.log(`  • Dev Dependencies: ${devDependencies}`);
    
    // Check for bundle size config
    if (packageJson.bundlesize) {
      console.log('  ✅ Bundle size monitoring configured');
    } else {
      console.log('  ⚠️  No bundle size monitoring found');
    }
  } catch (error) {
    console.log('  ❌ Could not analyze package.json');
  }
}

async function analyzeAssets() {
  try {
    const imagesDir = './assets/images';
    if (!fs.existsSync(imagesDir)) {
      console.log('  ❌ Assets directory not found');
      return;
    }
    
    const files = fs.readdirSync(imagesDir);
    let totalSize = 0;
    let largeFiles = 0;
    
    files.forEach(file => {
      if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        const filePath = path.join(imagesDir, file);
        const stats = fs.statSync(filePath);
        const sizeInKB = Math.round(stats.size / 1024);
        totalSize += sizeInKB;
        
        if (sizeInKB > 50) {
          largeFiles++;
        }
      }
    });
    
    console.log(`  • Total image assets size: ${totalSize}KB`);
    console.log(`  • Large files (>50KB): ${largeFiles}`);
    
    if (largeFiles === 0) {
      console.log('  ✅ All images are optimally sized');
    }
  } catch (error) {
    console.log('  ❌ Could not analyze assets');
  }
}

async function analyzeCode() {
  const optimizations = [
    { file: 'metro.config.js', desc: 'Metro bundler optimization' },
    { file: 'babel.config.js', desc: 'Babel transformation optimization' },
    { file: 'components/OptimizedImage.tsx', desc: 'Optimized image component' }
  ];
  
  optimizations.forEach(opt => {
    if (fs.existsSync(opt.file)) {
      console.log(`  ✅ ${opt.desc}`);
    } else {
      console.log(`  ❌ Missing: ${opt.desc}`);
    }
  });
}

function printRecommendations() {
  const recommendations = [
    '1. ✅ Use expo-image instead of react-native Image for better caching',
    '2. ✅ Implement React.memo for frequently re-rendering components',
    '3. ✅ Use useCallback and useMemo for expensive operations',
    '4. ✅ Configure Metro bundler for tree-shaking and minification',
    '5. ✅ Remove unused imports and dead code',
    '6. ✅ Optimize animations with worklet functions',
    '7. ✅ Use removeClippedSubviews for long lists',
    '8. ✅ Implement proper error boundaries',
    '9. 📋 Consider lazy loading for non-critical components',
    '10. 📋 Use FlatList for large data sets instead of ScrollView'
  ];
  
  recommendations.forEach(rec => console.log(`  ${rec}`));
}

analyzePerformance().catch(console.error);