'use strict';

const Webpack = require( 'webpack' ),
   { CleanWebpackPlugin } = require( 'clean-webpack-plugin' ),
   path = require( 'path' ),
   config = require( './config' ),
   DIST = path.resolve( `${ __dirname }/../dist` ),
   NODE_ENV = process.env.NODE_ENV || 'production';

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
         {
            test: /src\/index\.js$/,
            loader: 'imports-loader',
            options: {

               imports: Object.keys( config )
                  .filter( key => config[ key ])
                  .map( name => `named ./${ name } ${ name }` ),
            },
         },
         {
            test: /src\/index\.js$/,
            loader: 'exports-loader',
            options: {

               exports: Object.keys( config )
                  .filter( key => config[ key ]),
            },
         },
      ],
   },

   plugins: [

      new CleanWebpackPlugin(),
      new Webpack.ProgressPlugin(),
   ],
};
