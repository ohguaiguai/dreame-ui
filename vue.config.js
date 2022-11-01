const path = require('path');

module.exports = {
  pages: {
    index: './src/main.js',
  },
  css: {
    sourceMap: true,
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src'),
        '@packages': path.resolve(__dirname, './packages/'),
        'dream-ui': path.resolve(__dirname, './'),
      },
    },
  },
  transpileDependencies: ['element-ui'],
};
