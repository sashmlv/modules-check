'use strict';

const test = require( 'ava' ),
   fs = require( 'fs' ),
   jsdom = require( 'jsdom' ),
   { JSDOM } = jsdom,
   { has } = require( '../dist' ),
   lib = fs.readFileSync( './dist/index.js', 'utf8' );

test.skip( 'has', t => {

   t.deepEqual( has(), undefined );
   t.deepEqual( has([ 123 ]), undefined );
   t.deepEqual( has([ 123 ], 123 ), true );
   t.deepEqual( has([ 321 ], 123 ), false );
   t.deepEqual( has([], 123 ), false );
   t.deepEqual( has({ a: 1, b: 2 }, { a: 1 }), true );
   t.deepEqual( has({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 }), true );
   t.deepEqual( has({ a: 1, b: 2, c: 3 }, { a: 1, b: 3 }), false );
   t.deepEqual( has({ a: 1, b: 2 }, { a: 0 }), false );
   t.deepEqual( has({ a: 1, b: 2 }, { c: 1 }), false );
   t.deepEqual( has({ a: 1, b: 2 }, 1 ), false );

   const test = `
const { has } = check;
window.test = [

   has(),
   has([ 123 ]),
   has([ 123 ], 123 ),
   has([ 321 ], 123 ),
   has([], 123 ),
   has({ a: 1, b: 2 }, { a: 1 }),
   has({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 }),
   has({ a: 1, b: 2, c: 3 }, { a: 1, b: 3 }),
   has({ a: 1, b: 2 }, { a: 0 }),
   has({ a: 1, b: 2 }, { c: 1 }),
   has({ a: 1, b: 2 }, 1 ),
];`;

   const dom = new JSDOM( `<script>${ lib }${ test }</script>`, { runScripts: 'dangerously' });

   t.deepEqual( dom.window.test, [

      undefined,
      undefined,
      true,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
   ]);
});
