const fs = require('fs');

module.exports = function (api) {
  api.cache(true);

  const tsconfig = JSON.parse(fs.readFileSync('./tsconfig.json', { encoding: 'utf-8' }));
  const paths = tsconfig.compilerOptions.paths;

  const alias = {};
  for (const key in paths) {
    const aliasName = key.replace(/\/\*$/, ''); // replace '/*' with '' at the end
    const aliasPath = paths[key][0].replace(/\/\*$/, '/'); // replace '/*' with '/' at the end
    alias[aliasName] = aliasPath.startsWith('./') ? aliasPath : './' + aliasPath;
  }

  const browsers = [
    '>1%',
    'last 2 chrome versions',
    'last 2 edge versions',
    'last 2 firefox versions',
    'last 2 safari versions',
    'not dead',
    'not ie <= 11',
    'not op_mini all',
    'not android <= 4.4',
    'not samsung <= 4',
  ];
  const presets = [
    ['@babel/preset-env', { targets: { browsers, node: '16' }, useBuiltIns: false, modules: process.env.MODULES || false }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];
  const plugins = [[require.resolve('babel-plugin-module-resolver'), { alias }]];

  return {
    presets,
    plugins,
  };
};
