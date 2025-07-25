module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Remove unused imports
      ['babel-plugin-transform-remove-unused-imports'],
      // Enable Reanimated plugin for better performance
      'react-native-reanimated/plugin',
      // Optimize lodash imports
      [
        'babel-plugin-transform-imports',
        {
          'lodash': {
            transform: 'lodash/${member}',
            preventFullImport: true,
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: [
          // Remove console.log statements in production
          ['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }],
          // Dead code elimination
          ['babel-plugin-minify-dead-code-elimination'],
        ],
      },
    },
  };
};