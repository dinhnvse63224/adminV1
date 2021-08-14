/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  publicPath: process.env.DEPLOY_ENV === 'GH_PAGES'
    ? '/admin-one-vue-tailwind/'
    : '/',

  // Remove moment.js from chart.js
  configureWebpack: config => {
    return {
      externals: {
        moment: 'moment',
        config: {
          apiUrl: 'http://capstone2021-test.ap-southeast-1.elasticbeanstalk.com'
        }
      }
    }
  }
}
