import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import CleanPlugin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import DashboardPlugin from 'webpack-dashboard/plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import childProcess from 'child_process'

process.env.BABEL_ENV = process.env.NODE_ENV

const isProduction = process.env.NODE_ENV === 'production'

const paths = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  html: path.resolve(__dirname, 'src/index.html'),
  icon: path.resolve(__dirname, 'src/favicon.ico'),
  node_modules: path.resolve(__dirname, 'node_modules'),
}

function getEnvVars(...extraVars) {
  const commitHash = childProcess.execSync('git rev-parse --short HEAD').toString()

  const envVars = [
    'NODE_ENV',
    'ASSETS_BASE_URL',
    'API_BASE_URL',
    'INTERCOM_APPID',
    'RECATPTCHA',
    'GA_APPID',
    'npm_package_name',
    'npm_package_version',
    'npm_lifecycle_event',
    ...extraVars,
  ]

  return envVars.reduce(
    (e, v) => {
      e[`process.env.${v}`] = JSON.stringify(process.env[v])
      return e
    },
    {
      'process.env.COMMIT_HASH': JSON.stringify(commitHash),
      'process.env.BUILD_DATE': JSON.stringify(new Date().toUTCString()),
    }
  )
}

function common() {
  return {
    devtool: 'source-map',
    output: {
      path: paths.dist,
      publicPath: '/',
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [paths.src, paths.node_modules],
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          use: [{loader: 'babel-loader'}, {loader: 'eslint-loader', options: {emitWarning: true || !isProduction}}],
          exclude: paths.node_modules,
        },
        // {
        //   test: /\.svg$/,
        //   use: 'raw-loader',
        //   exclude: paths.node_modules,
        // },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader',
        },
        {
          test: /\.(png|jpg|gif)(\?.*)?$/,
          use: 'url-loader?limit=100000',
          exclude: paths.node_modules,
        },
        {
          test: /\.(eot|otf|woff|ttf)?$/,
          use: 'url-loader',
          exclude: paths.node_modules,
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(getEnvVars()),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // new webpack.IgnorePlugin(/^\.\/lang$/, /validatorjs/),
      new HtmlWebpackPlugin({
        template: paths.html,
        favicon: paths.icon,
      }),
    ],
  }
}

function production() {
  return {
    bail: true,
    entry: {
      app: ['babel-polyfill', paths.src],
    },
    output: {
      path: paths.dist,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js',
    },
    module: {
      loaders: [
        {
          test: /\.css/,
          use: ExtractTextPlugin.extract({use: ['css-loader']}),
          // exclude: paths.node_modules,
        },
      ],
    },
    // module: {
    //   loaders: [
    //     {
    //       test: /\.css/,
    //       use: [{loader: ExtractTextPlugin.extract({loader: ['css-loader']})}],
    //       // exclude: paths.node_modules,
    //     },
    //   ],
    // },
    plugins: [
      new CleanPlugin([paths.dist]),
      new webpack.NoEmitOnErrorsPlugin(),
      new ExtractTextPlugin('[name].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks(module) {
          return module.context && module.context.indexOf('node_modules') !== -1
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          drop_console: true,
          drop_debugger: true,
        },
      }),
    ],
  }
}

function development() {
  return {
    entry: ['react-hot-loader/patch', 'babel-polyfill', paths.src],
    devServer: {
      // contentBase: paths.src,
      noInfo: true,
      hot: true,
      historyApiFallback: true,
      port: process.env.PORT || '3770',
      proxy: {
        '/api/v1': {
          target: 'http://localhost:3000',
          secure: false,
          changeOrigin: true,
        },
      },
    },
    module: {
      loaders: [
        {
          test: /\.css/,
          use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
          // exclude: paths.node_modules,
        },
      ],
    },
    performance: {
      hints: false,
    },
    plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin(), new DashboardPlugin()],
  }
}

module.exports = process.env.NODE_ENV === 'production' ? merge(common(), production()) : merge(common(), development())
