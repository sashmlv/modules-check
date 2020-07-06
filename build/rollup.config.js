'use strict';

import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';

const NODE_ENV = process.env.NODE_ENV || 'production';

export default [{

   input: './src/index.js',
   output: {

      file: 'dist/index.js',
      name: 'check',
      format: 'umd'
   },
   plugins: [

      NODE_ENV === 'production' ? terser() : undefined,
      cleaner({

         targets: [

            './dist/'
         ]
      }),
   ].map( v => v ),
}];