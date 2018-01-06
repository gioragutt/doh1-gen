const path = require('path')
const {compose, injectBabelPlugin} = require('react-app-rewired')
const rewireEslint = require('react-app-rewire-eslint')
const rewirePolyfills = require('react-app-rewire-polyfills')
const rewireHMR = require('react-app-rewire-hot-loader')

const paths = {
  src: path.resolve(__dirname, 'src'),
  node_modules: path.resolve(__dirname, 'node_modules'),
}

const rewireBabelPlugin = plugin => conf => injectBabelPlugin(plugin, conf)

const importsOptions = {
  'lodash': {
    'transform': 'lodash/${member}',
    'preventFullImport': true,
  },
  'lodash/fp': {
    'transform': 'lodash/fp/${member}',
    'preventFullImport': true,
  },
  'XXXredux-form': {
    'transform': 'redux-form/lib/${member}',
    'preventFullImport': true,
  },
  'antd': {
    'transform': 'antd/lib/${member}',
    'preventFullImport': true,
    'kebabCase': true,
  },
  'recompose': {
    'transform': 'recompose/${member}',
    'preventFullImport': true,
  },
  'rxjs/operator': {
    'transform': 'rxjs/operator/${member}',
    'preventFullImport': true,
    'camelCase': true,
    'skipDefaultConversion': true,
  },
  'rxjs/observable': {
    'transform': 'rxjs/observable/${member}',
    'camelCase': true,
    'preventFullImport': true,
    'skipDefaultConversion': true,
  },
}

const rewireBabelPlugins = [
  'emotion',
  'transform-class-properties',
  'transform-decorators-legacy',
  'transform-function-bind',
  'transform-runtime',
  ['transform-imports', importsOptions],
].map(rewireBabelPlugin)

const setBaseToSrc = config => {
  config.resolve.modules = [paths.src, paths.node_modules]
  return config
}

module.exports = compose(
  ...rewireBabelPlugins,
  rewireEslint,
  rewirePolyfills,
  rewireHMR,
  setBaseToSrc,
)