var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function(config) {
  config.set({
    client: {
      mocha: {
        timeout: 40000
      }
    },
    // 没有翻墙软件，无法访问到google地图，所以手动开启chrome进行测试，因为chrome上装了插件
    // browsers: ['HeadlessChrome'],
    // customLaunchers: {
    //   HeadlessChrome: {
    //     base: 'ChromeHeadless',
    //     flags: ['--no-sandbox']
    //   }
    // },
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    browserNoActivityTimeout: 20000,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  })
}
