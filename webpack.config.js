var path = require('path')
var webpack = require('webpack')
// const TerserJSPlugin = require('terser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const isDev = process.env.NODE_ENV == 'development';

module.exports = {
  entry: {
    js_custom: './src/main.js',
    js_lib: ["jquery"]
  },
  output:{
    publicPath: '/',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js',
    path: path.resolve(__dirname, './dist')
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
        cache: true,
        parallel: true,
        sourceMap: isDev
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
        js_lib:{
          test:function (module) {
            return module.context && module.context.indexOf('node_modules') !== -1;
          },
          name:'js_lib',
          chunks:'all'
        },
        manifest:{
          name:'manifest',
          chunks:'all'
        },
        loadash:{
          test:(m) => /node_modules\/(?:lodash|moment)/.test(m.context),
          name: 'loadash',
          chunks: 'all'
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
        test: /\.css$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
        ]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader', 'less-loader' ]
        })
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.sass$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } }
        ]
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
        include: [ path.resolve(__dirname, './src') ]
      },
      {
        test: /\.styl$/,
        loader: ['style-loader', 'css-loader', 'stylus-loader', {
          loader: 'vuetify-loader',
          options: {
            theme: path.resolve(__dirname, './node_modules/vuetify/src/stylus/theme.styl')
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
        include: [ path.resolve(__dirname, 'src'), path.resolve(__dirname, './test') ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      },
      {
        test: /\.(woff|woff2|ttf|svg|eot)$/,
        loader: 'url-loader?name=/fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': isDev ? 'vue/dist/vue.runtime.esm.js' : 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, "./src")
    },
    extensions: ['*', '.js', '.vue', '.json', '.scss', ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      Popper: 'popper.js'
    }),
    new ExtractTextPlugin('../css/index.css'),
    new ManifestPlugin(),
    
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
   }),
   new webpack.HashedModuleIdsPlugin()
  ],
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  mode : process.env.NODE_ENV ? 'development' : 'production'
}
if(process.env.NODE_ENV === 'development') {
  module.exports.devServer= {
    hot: true, // 서버에서 HMR을 켠다.
    host: 'localhost', // 디폴트로는 "localhost" 로 잡혀있다. 외부에서 개발 서버에 접속해서 테스트하기 위해서는 '0.0.0.0'으로 설정해야 한다.
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    port: 8080,
  };
  module.exports.plugins = [
    new webpack.ProgressPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), // dev
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VuetifyLoaderPlugin()
  ];

  module.exports.devtool = 'inline-source-map';
}
else if (process.env.NODE_ENV === 'production') {
  module.exports.devServer = {
    hot: true, 
    host: '127.0.0.1', 
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
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new VuetifyLoaderPlugin()
  ])
}
