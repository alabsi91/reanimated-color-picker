const nativePackages = [
  'react-native-reanimated',
  'react-native-gesture-handler',
  'react-native-safe-area-context',
  'react-native',
  'react',
];

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [`node_modules/(?!(@react-native|${nativePackages.join('|')})/)`],
  moduleNameMapper: Object.fromEntries(
    nativePackages.map(packageName => [`^${packageName}$`, `<rootDir>/node_modules/${packageName}`])
  ),
};
