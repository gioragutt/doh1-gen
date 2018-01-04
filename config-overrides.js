const {compose, injectBabelPlugin} = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint')

module.exports = compose(
  config => injectBabelPlugin('emotion', config),
  config => injectBabelPlugin('transform-decorators-legacy', config),
  rewireEslint,
)