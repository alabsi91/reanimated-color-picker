const path = require('path');
const escape = require('escape-string-regexp');
const { getDefaultConfig } = require('@expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const root = path.resolve(__dirname, '..');

const defaultConfig = getDefaultConfig(__dirname);

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
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  ...defaultConfig,

  projectRoot: __dirname,
  watchFolders: [root],

  resolver: {
    ...defaultConfig.resolver,

    blacklistRE: exclusionList([
      createRegExp('react-native-reanimated'),
      createRegExp('react-native-gesture-handler'),
      createRegExp('react-native'),
      createRegExp('react'),
      createRegExp('expo'),
    ]),

    extraNodeModules: {
      ...createPkgEntry('react-native-reanimated'),
      ...createPkgEntry('react-native-gesture-handler'),
      ...createPkgEntry('react-native'),
      ...createPkgEntry('react'),
      ...createPkgEntry('expo'),
    },
  },
};

module.exports = config;
