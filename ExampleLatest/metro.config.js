const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const escape = require('escape-string-regexp');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const root = path.resolve(__dirname, '..');

function createRegExp(pkg) {
  return new RegExp(`^${escape(path.join(root, 'node_modules', pkg))}\\/.*$`);
}

function createPkgEntry(pkg) {
  return {
    [pkg]: path.join(__dirname, 'node_modules', pkg),
  };
}

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [root],

  resolver: {
    blacklistRE: exclusionList([
      createRegExp('react-native-reanimated'),
      createRegExp('react-native-gesture-handler'),
      createRegExp('react-native'),
      createRegExp('react'),
    ]),

    extraNodeModules: {
      ...createPkgEntry('react-native-reanimated'),
      ...createPkgEntry('react-native-gesture-handler'),
      ...createPkgEntry('react-native'),
      ...createPkgEntry('react'),
    },
  },

  transformer: {
    getTransformOptions: () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
