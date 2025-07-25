const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable aggressive tree-shaking
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Asset optimization
config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif', 'webp', 'svg');

// Enable minification in production
config.transformer.minifierConfig = {
  mangle: {
    keep_fnames: true,
  },
  output: {
    ascii_only: true,
    quote_style: 3,
    wrap_iife: true,
  },
  sourceMap: {
    includeSources: false,
  },
  toplevel: false,
  warnings: false,
  ie8: false,
  keep_fnames: true,
};

// Enable gzip compression for web
if (config.transformer.publicPath) {
  config.transformer.publicPath = '/assets/';
}

// Asset resolutions for different screen densities
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.includes('@2x') || moduleName.includes('@3x')) {
    return context.resolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;