'use strict';

const Webpack = require( 'webpack' ),
   { CleanWebpackPlugin } = require( 'clean-webpack-plugin' ),
   fs = require( 'fs' ),
   path = require( 'path' ),
   DIST = path.resolve( `${ __dirname }/../dist` ),
   NODE_ENV = process.env.NODE_ENV || 'production',
   config = ! fs.existsSync( './config.js' ) && require( './config' );

module.exports = {

   mode: NODE_ENV,
   optimization: {

      nodeEnv: false,
   },
   entry: {

      index: './src/index.js',
   },
   output: {

      path: DIST,
      filename: '[name].js',
      library: 'check',
      libraryTarget: 'umd',
      globalObject: 'this',
   },
   module: {
      rules: [
         config ? {
            test: /src\/index\.js$/,
            loader: 'imports-loader',
            options: {

               imports: Object.keys( config )
                  .filter( key => config[ key ])
                  .map( name => `named ./${ name } ${ name }` ),
            },
         } : undefined,
         config ? {
            test: /src\/index\.js$/,
            loader: 'exports-loader',
            options: {

               exports: Object.keys( config )
                  .filter( key => config[ key ]),
            },
         } : undefined,
         config ? {

            /* remove imports and exports, will added with 'imports-loader' and 'exports-loader' */
            test: /\/src\/index\.js$/,
            loader: 'string-replace-loader',
            options: {

               search: /(import\s.+|export\s.+)/g,
               replace: ''
            },
         } : undefined,
      ].filter( _=>_ ),
   },
   plugins: [

      new CleanWebpackPlugin(),
      new Webpack.ProgressPlugin(),
   ],
};

