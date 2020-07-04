'use strict';

import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';

export default [{

   input: './src/index.js',
   output: {

      file: 'dist/index.js',
      name: 'checki',
      format: 'umd'
   },
   plugins: [

      terser(),
      cleaner({

         targets: [

            './dist/'
         ]
      })
   ],
}];