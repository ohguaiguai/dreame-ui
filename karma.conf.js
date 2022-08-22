var webpackConfig = require('@vue/cli-service/webpack.config'); // 拿到当前的webpack配置

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: ['tests/**/*.spec.js'], // 查找.spec.js结尾的文件
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },
    autoWatch: true, // 自动观察文件变化
    webpack: webpackConfig,
    reporters: ['spec'],
    browsers: ['ChromeHeadless'] // 启动一个无头浏览器，就是看不到界面的浏览器
  });
};
