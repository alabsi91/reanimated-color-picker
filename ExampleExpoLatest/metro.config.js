const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');
const escape = require('escape-string-regexp');

const root = path.resolve(__dirname, '..');

const list = [/\/__tests__\/.*/];

function escapeRegExp(pattern) {
  if (Object.prototype.toString.call(pattern) === '[object RegExp]') {
    return pattern.source.replace(/\/|\\\//g, '\\' + path.sep);
  }

  if (typeof pattern === 'string') {
    const escaped = pattern.replace(/[\-\[\]\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    return escaped.replaceAll('/', '\\' + path.sep);
  }

  throw new Error('Unexpected exclusion pattern: ' + pattern);
}

function exclusionList(additionalExclusions) {
  return new RegExp('(' + (additionalExclusions || []).concat(list).map(escapeRegExp).join('|') + ')$');
}

function createRegExp(pkg) {
  return new RegExp(`^${escape(path.join(root, 'node_modules', pkg))}\\/.*$`);
}

function createPkgEntry(pkg) {
  return {
    [pkg]: path.join(__dirname, 'node_modules', pkg),
  };
}

const config = getDefaultConfig(__dirname);

config.watchFolders = [root];
config.resolver.blacklistRE = exclusionList([
  createRegExp('react-native-reanimated'),
  createRegExp('react-native-gesture-handler'),
  createRegExp('react-native'),
  createRegExp('react'),
]);
config.resolver.extraNodeModules = {
  ...createPkgEntry('react-native-reanimated'),
  ...createPkgEntry('react-native-gesture-handler'),
  ...createPkgEntry('react-native'),
  ...createPkgEntry('react'),
};
config.transformer.getTransformOptions = () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;
