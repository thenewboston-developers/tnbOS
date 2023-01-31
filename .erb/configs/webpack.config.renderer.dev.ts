import 'webpack-dev-server';
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import chalk from 'chalk';
import {merge} from 'webpack-merge';
import {execSync, spawn} from 'child_process';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';
import checkNodeEnv from '../scripts/check-node-env';

// When an ESLint server is running, we can't set the NODE_ENV so we'll check if it's
// at the dev webpack config is not accidentally run in a production environment
if (process.env.NODE_ENV === 'production') {
  checkNodeEnv('development');
}

const port = process.env.PORT || 1212;
const manifest = path.resolve(webpackPaths.dllPath, 'renderer.json');

const skipDLLs =
  module.parent?.filename.includes('webpack.config.renderer.dev.dll') ||
  module.parent?.filename.includes('webpack.config.eslint');

/**
 * Warn if the DLL is not built
 */
if (!skipDLLs && !(fs.existsSync(webpackPaths.dllPath) && fs.existsSync(manifest))) {
  console.log(
    chalk.black.bgYellow.bold(
      'The DLL files are missing. Sit back while we build them for you with "npm run build-dll"',
    ),
  );
  execSync('npm run postinstall');
}

const getDllPlugins = (): any[] => {
  if (skipDLLs) return [];

  return [
    new webpack.DllReferencePlugin({
      context: webpackPaths.dllPath,
      manifest: require(manifest),
      sourceType: 'var',
    }),
  ];
};

const configuration: webpack.Configuration = {
  devServer: {
    compress: true,
    headers: {'Access-Control-Allow-Origin': '*'},
    historyApiFallback: {
      verbose: true,
    },
    hot: true,
    port,
    setupMiddlewares(middlewares) {
      console.log('Starting preload.js builder...');
      const preloadProcess = spawn('npm', ['run', 'start:preload'], {
        shell: true,
        stdio: 'inherit',
      })
        .on('close', (code: number) => process.exit(code!))
        .on('error', (spawnError) => console.error(spawnError));

      console.log('Starting Main Process...');
      let args = ['run', 'start:main'];
      if (process.env.MAIN_ARGS) {
        args = args.concat(['--', ...process.env.MAIN_ARGS.matchAll(/"[^"]+"|[^\s"]+/g)].flat());
      }
      spawn('npm', args, {
        shell: true,
        stdio: 'inherit',
      })
        .on('close', (code: number) => {
          preloadProcess.kill();
          process.exit(code!);
        })
        .on('error', (spawnError) => console.error(spawnError));
      return middlewares;
    },
    static: {
      publicPath: '/',
    },
  },
  devtool: 'inline-source-map',
  entry: [
    `webpack-dev-server/client?http://localhost:${port}/dist`,
    'webpack/hot/only-dev-server',
    path.join(webpackPaths.srcRendererPath, 'index.tsx'),
  ],
  mode: 'development',
  module: {
    rules: [
      {
        include: /\.module\.s?(c|a)ss$/,
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        exclude: /\.module\.s?(c|a)ss$/,
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // Images
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // SVG
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              prettier: false,
              ref: true,
              svgo: false,
              svgoConfig: {
                plugins: [{removeViewBox: false}],
              },
              titleProp: true,
            },
          },
          'file-loader',
        ],
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    filename: 'renderer.dev.js',
    library: {
      type: 'umd',
    },
    path: webpackPaths.distRendererPath,
    publicPath: '/',
  },
  plugins: [
    ...getDllPlugins(),

    new webpack.NoEmitOnErrorsPlugin(),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     *
     * By default, use 'development' as NODE_ENV. This can be overriden with
     * 'staging', for example, by changing the ENV variables in the npm scripts
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),

    new ReactRefreshWebpackPlugin(),

    new HtmlWebpackPlugin({
      env: process.env.NODE_ENV,
      filename: path.join('index.html'),
      isBrowser: false,
      isDevelopment: process.env.NODE_ENV !== 'production',
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
      nodeModules: webpackPaths.appNodeModulesPath,
      template: path.join(webpackPaths.srcRendererPath, 'index.ejs'),
    }),
  ],
  target: ['web', 'electron-renderer'],
};

export default merge(baseConfig, configuration);
