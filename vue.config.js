module.exports = {
  pages: {
    index: './src/main.ts'
  },
  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.json']
    }
  }
};
