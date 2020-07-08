'use strict';

const test = require( 'ava' ),
   fs = require( 'fs' ),
   jsdom = require( 'jsdom' ),
   { JSDOM } = jsdom,
   check = require( '../dist' ),
   { cls } = check,
   lib = fs.readFileSync( './dist/index.js', 'utf8' );

test( 'cls', t => {

   const test = `
const { cls } = check;
window.test = [

   cls([]),
   cls( '' ),
   cls( 1 ),
];`;

   const dom = new JSDOM( `<script>${ lib }${ test }</script>`, { runScripts: 'dangerously' });

   t.deepEqual( cls([]), 'array' );
   t.deepEqual( cls( '' ), 'string' );
   t.deepEqual( cls( 1 ), 'number' );

   t.deepEqual( dom.window.test, [

      'array',
      'string',
      'number',
   ]);
});
