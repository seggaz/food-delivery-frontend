module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: '3.8',
        forceAllTransforms: false,
        ignoreBrowserslistConfig: false,
        debug: true,
      },
    ],
    [
      '@babel/preset-react',
      {
        development: process.env.BABEL_ENV === 'development',
      },
    ],
  ],
  plugins:
    process.env.BABEL_ENV === 'development'
      ? ['react-refresh/babel', '@babel/plugin-syntax-jsx']
      : ['@babel/plugin-syntax-jsx'],
};
