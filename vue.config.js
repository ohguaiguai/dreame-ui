const path = require('path');

module.exports = {
  pages: {
    index: './src/main.ts',
  },
  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.json', '.vue', '.d.ts'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
};
