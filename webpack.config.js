const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv !== 'production';
const ASSET_PATH = process.env.ASSET_PATH || '/';
const ANALYZER = process.env.ANALYZER || false;
// 环境
const PORT_ENV = process.env.PORT || 8080;
const HOST_ENV = process.env.HOST || '';
const APIPORT_ENV = process.env.APIPORT || 18081;

const isAutoDll = false; // 是否开启 autodll
const eslint = true;
const stylelint = false;

const vendor = [
  'react',
  'react-dom',
  'mockjs',
  'redbox-react',
  'axios'
];

console.log(isDev ? `开发模式: ${HOST_ENV}:${PORT_ENV}` : `发布模式: ${HOST_ENV}:${PORT_ENV}`);

// 设置插件环境 development/prodcution
const getPlugins = () => {
  // Common
  const plugins = [
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'webpack-antd',
      template: path.join(process.cwd(), '/public/index.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new StyleLintPlugin({ failOnError: stylelint }),
    new webpack.EnvironmentPlugin({ NODE_ENV: JSON.stringify(nodeEnv) }),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
      __DEV__: isDev,
      __PORT__: PORT_ENV,
      __HOST__: JSON.stringify(HOST_ENV),
      __APIPORT__: JSON.stringify(APIPORT_ENV),
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ];
  // 分析构建库
  if (ANALYZER) {
    plugins.push(
      new BundleAnalyzerPlugin(),
    );
  }
  if (isDev) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    );
  } else {
    plugins.push(
      new CleanWebpackPlugin(['public/dist']),
      new webpack.HashedModuleIdsPlugin(),
      new ParallelUglifyPlugin({
        cacheDir: '.cache/', // 开启缓存功能
        uglifyJS: {
          output: {
            comments: false
          },
          compress: {
            warnings: false
          }
        }
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new CopyWebpackPlugin([{ 
        from: 'assets/*', context: 'public/'
      }])
    );
  }
  if (isAutoDll) {
    plugins.push(
      new AutoDllPlugin({
        context: path.resolve(process.cwd()),
        inject: true,
        filename: '[name].dll.js',
        entry: {
          vendor
        }
      })
    )
  }
  return plugins;
};

// 使用 happypack 时不能携带query.
// https://github.com/amireh/happypack/issues/145
const getBabelLoaders = () => {
  return {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      cacheDirectory: isDev
    }
  };
};
module.exports = {
  name: 'client',
  target: 'web',
  cache: isDev,
  profile: isDev, // 是否捕捉 Webpack 构建的性能信息
  context: path.resolve(process.cwd()),
  entry: {
    index: './src/index.js',
    vendor
  },
  devtool: isDev ? 'inline-source-map' : 'hidden-source-map',
  output: {
    path: path.join(__dirname, 'public/dist'),
    publicPath: ASSET_PATH,
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
    pathinfo: isDev
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: false,
    overlay: true,
    port: PORT_ENV,
    stats: {
      modules: false,
      colors: true
    },
    headers: {
      'maby': 'demo'
    }
  },
  plugins: getPlugins(),
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      getBabelLoaders(),
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use:['css-loader', 'postcss-loader']
          },
        )
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use:['css-loader', 'postcss-loader']
          },
        )
      }, {
        test: /\.less$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract(
          [
            'css-loader', 'postcss-loader', 
              {
                loader: 'less-loader',
                options: {
                  javascriptEnabled: true
                }
              }
          ]
        )
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract(
          [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                import: true,
                importLoaders: 1,
                localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
                sourceMap: true
              }
            },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            {
              loader: 'less-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                javascriptEnabled: true,
                sourceMapContents: !isDev
              }
            }
          ]
        )
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src/'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  }
};