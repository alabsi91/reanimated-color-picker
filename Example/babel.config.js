module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          'reanimated-color-picker': '../src/index',
          '@sliders': '../src/components/Sliders/',
          '@panels': '../src/components/Panels/',
          '@assets': '../src/assets/',
          '@thumb': '../src/components/Thumb/Thumb',
          '@colorKit': '../src/colorKit/index',
          '@context': '../src/AppContext',
          '@styles': '../src/styles',
          '@utils': '../src/utils',
          '@types': '../src/types',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
