const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV == 'development' || 'test';
const resolve = (sub) => {
  return path.resolve(__dirname, sub)
}
const domains = [
    'openclass.cf'
];
module.exports = {
  entry: {
    main: './src/main.js',
  },
  output:{
    publicPath: '/',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js',
    path: resolve('./dist')
  },
  optimization:{
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: [ 
            'default',
            { discardComments: { removeAll: true } } 
          ],
        }
      }),
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
              warnings: false,
              unused: true
          },
          mangle: true,   
          beautify: false,   
          output: {
            comments: false  
          }
      }
     })
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        },
        styles: {
          test: /\.css$/,
          name: 'styles',
          chunks: 'all',
          enforce: true
        },
        manifest:{
          name:'manifest',
          chunks:'all'
        },
        moment:{
          test:(m) => /node_modules\/(?:moment)/.test(m.context),
          name: 'moment',
          chunks:'all'
        }
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
          use: [
              isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader',
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            test: /\.(sa|sc|c)ss$/,
              use: [
                  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader',
              ],
          }
        },
        include: [ resolve('./src') ]
      },
      {
        test: /\.styl$/,
        loader: ['style-loader', 'css-loader', 'stylus-loader', {
          loader: 'vuetify-loader',
          options: {
            theme: resolve('./node_modules/vuetify/src/stylus/theme.styl')
          }
        }]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env']
        },
        include: [ resolve('src'), resolve('./test') ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'url-loader?name=/fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': isDev ? 'vue/dist/vue.runtime.esm.js' : 'vue/dist/vue.esm.js',
      '@': resolve("./src")
    },
    extensions: ['*', '.js', '.vue', '.json', '.scss' ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      Popper: 'popper.js'
    }),
    new ManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }),
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin()
  ],
  performance: {
    hints: false
  },
  mode : process.env.NODE_ENV ? 'development' : 'production'
}
if (process.env.NODE_ENV === 'test') {
  module.exports.externals = [require('webpack-node-externals')()]
  module.exports.devtool = 'inline-cheap-module-source-map'
  module.exports.resolve = {
    alias: {
      'vue$': isDev ? 'vue/dist/vue.runtime.esm.js' : 'vue/dist/vue.esm.js',
      '@': resolve("./src")
    },
    extensions: ['*', '.js', '.vue', '.json' ]
  }
}
else if(process.env.NODE_ENV === 'development') {
  module.exports.devServer= {
    hot: true, // 서버에서 HMR을 켠다.
    host: '0.0.0.0', 
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    disableHostCheck: true,
    compress: true,
    port: 80,
    stats: {
      color: true
    }
  };
  module.exports.plugins = module.exports.plugins.concat([
    new HtmlWebPackPlugin({
      title: 'Development',
      showErrors: true, // 에러 발생시 메세지가 브라우저 화면에 노출 된다.
      template: './public/index.html',
      filename: './index.html',
      favicon: "./public/favicon.ico"
    }),
    new webpack.NoEmitOnErrorsPlugin(),  //컴파일 도중 오류가 발생한 리소스들은 제외하고 작업을 진행
    new webpack.HotModuleReplacementPlugin(), //recompiling 없이 실행가능
  ]);

  module.exports.devtool = 'inline-source-map';
}
else if (process.env.NODE_ENV === 'production') {
  module.exports.devServer = {
    hot: true, 
    host: '0.0.0.0', 
    compress: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    overlay: true,
    port: 8080,
    stats: {
    normal: true
    }
  },
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins).concat([
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlWebPackPlugin({
      title: 'production',
      template: './public/index.html',
      filename: './index.html',
      favicon: "./public/favicon.ico"
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
