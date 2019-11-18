import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import path from 'path';

// Webpack plugins:
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin/lib';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

// Misc imports:
const safePostCssParser = require('postcss-safe-parser');
const isWsl = require('is-wsl');

// Params
const isProduction: boolean = process.env.NODE_ENV === 'production';
const baseHref = process.env.BASE_HREF || '/';
const longTitle = process.env.SITE_LONG_TITLE || 'My Long Title';
const shortTitle = process.env.SITE_SHORT_TITLE || 'My Short Title';
const devPort = process.env.DEV_PORT || '3000';
interface Configuration extends WebpackConfiguration {
  devServer: WebpackDevServerConfiguration;
}

// Delete env var pointing to `tsconfig.webpack.json` so that `ts-loader`
// will use default file `tsconfig.json` instead
delete process.env.TS_NODE_PROJECT;

//=================================//
// Build Webpack Config For Client //
//=================================//

const clientWebpackConfig: Configuration = {
  entry: isProduction
    ? [path.resolve(__dirname, 'index.tsx')]
    : [
        'webpack-dev-server/client?http://localhost:' + devPort,
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, 'index.tsx')
      ],

  output: {
    filename: isProduction ? '[name].[contenthash].js' : '[name].[hash].js',
    path: path.resolve(__dirname, '..', '..', 'dist-client'),
    publicPath: ''
  },

  target: 'web', // See: https://webpack.js.org/concepts/targets/

  devServer: {
    watchOptions: {
      poll: false
    },
    inline: true,
    hot: true,
    contentBase: [
      path.resolve(__dirname, '..', '..', 'dist-client'),
      path.resolve(__dirname, 'Public')
    ],
    publicPath: `http://localhost:${devPort}/`,
    historyApiFallback: {
      disableDotRule: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.svg'],

    alias: !!isProduction ? {} : { 'react-dom': '@hot-loader/react-dom' },

    plugins: [
      // Lets you use `paths` in tsconfig.json to generate aliases here in webpack
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.json')
      })
    ]
  },

  module: {
    rules: [
      // MAJOR FILE LOADER:
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // Don't complain about ts errors, just transpile
              happyPackMode: true
            }
          },
          !isProduction && {
            loader: 'react-hot-loader/webpack'
          }
        ].filter(Boolean) as webpack.RuleSetUse,
        exclude: [/node_modules/]
      },

      // MINOR FILE LOADERS:
      { test: /\.html$/, loader: 'html-loader', exclude: /node_modules/ },
      { test: /\.txt$/, loader: 'raw-loader', exclude: /node_modules/ },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader' },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      },

      //GLOBAL STYLES (modules: false)
      {
        test: /global\.css$/,
        use: getCSSLoaderArray('css', false)
      },
      {
        test: /global\.less$/,
        use: getCSSLoaderArray('less', false)
      },
      {
        test: /global\.scss$/,
        use: getCSSLoaderArray('scss', false)
      },

      // LOCAL STYLES (modules: true)
      {
        test: /\.css$/,
        exclude: /global\.css$/,
        use: getCSSLoaderArray('css', true)
      },
      {
        test: /\.less$/,
        exclude: /global\.less$/,
        use: getCSSLoaderArray('less', true)
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /global\.(sass|scss)$/,
        use: getCSSLoaderArray('scss', true)
      }
    ]
  },

  plugins: [
    // Prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Extract CSS from bundle and place in external .css file
    new MiniCssExtractPlugin({
      //
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css'
    }),

    // Process index.html file
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: path.resolve(__dirname, 'index.html')
        },
        isProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
              }
            }
          : undefined
      )
    ),

    // Replace %___% patterns within index.html
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, { PUBLIC_URL: baseHref }),

    new webpack.DefinePlugin({
      __BASE_HREF__: `"${baseHref}"`,
      __SITE_LONG_TITLE__: `"${longTitle}"`,
      __SITE_SHORT_TITLE__: `"${shortTitle}"`
    })
  ].filter(Boolean) as webpack.Plugin[],

  optimization: {
    minimize: isProduction, // Apply minimizer[] only in prod
    minimizer: [
      // Taken (mostly) from ejected `create-react-app --typescript` (v3.0.0)
      new TerserPlugin({
        terserOptions: {
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8
          },
          compress: {
            ecma: 5, // mb added
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2
          } as any,
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true
          }
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        // Disabled on WSL (Windows Subsystem for Linux) due to an issue with Terser
        // https://github.com/webpack-contrib/terser-webpack-plugin/issues/21
        parallel: !isWsl,
        // Enable file caching
        cache: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: true
            ? {
                // `inline: false` forces the sourcemap to be output into a
                // separate file
                inline: false,
                // `annotation: true` appends the sourceMappingURL to the end of
                // the css file, helping the browser find the sourcemap
                annotation: true
              }
            : false
        }
      })
    ],
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 20
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendors'
        }
      }
    }
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    // runtimeChunk: true,
    //
    // splitChunks: {
    //   name: true,
    //   chunks: "all",
    //   minChunks: 2,
    //   minSize: 0
    // }
  }
};

export default clientWebpackConfig;

function getCSSLoaderArray(styleType: 'css' | 'scss' | 'less', isModule: boolean) {
  const config = [
    !isProduction && 'css-hot-loader',
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      query: {
        modules: !!isModule && {
          localIdentName: '[local]__[hash:base64:5]'
        },
        sourceMap: !isProduction,
        importLoaders: styleType === 'css' ? 0 : 1
      }
    },
    styleType === 'scss' && 'sass-loader',
    styleType === 'less' && 'less-loader'
  ].filter(Boolean) as webpack.RuleSetUse;

  return config;
}
