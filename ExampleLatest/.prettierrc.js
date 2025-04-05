module.exports = {
  arrowParens: 'avoid',
  printWidth: 130,
  jsxSingleQuote: true,
  semi: true,
  bracketSpacing: true,
  bracketSameLine: false,
  endOfLine: 'auto',
  singleQuote: true,
  overrides: [
    {
      files: '*.map',
      options: {parser: 'json'},
    },
  ],
};

