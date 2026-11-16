const nativePackages = [
  'react-native-reanimated',
  'react-native-worklets',
  'react-native-gesture-handler',
  'react-native-safe-area-context',
  'react-native',
  'react',
];

module.exports = {
  preset: '@react-native/jest-preset',
  resolver: 'react-native-reanimated/jest/resolver',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [`node_modules/(?!(@react-native|${nativePackages.join('|')})/)`],
  moduleNameMapper: Object.fromEntries(
    nativePackages.map(packageName => [`^${packageName}$`, `<rootDir>/node_modules/${packageName}`]),
  ),
};
