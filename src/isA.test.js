'use strict';

const test = require( 'ava' ),
   fs = require( 'fs' ),
   jsdom = require( 'jsdom' ),
   { JSDOM } = jsdom,
   { isA } = require( '../dist' ),
   lib = fs.readFileSync( './dist/index.js', 'utf8' );

test( 'isA', t => {

   const test = `const { isA } = checki; window.test1 = isA([]); window.test2 = isA("");`,
      dom = new JSDOM( `<script>${ lib }${ test }</script>`, { runScripts: 'dangerously' });

   t.deepEqual( isA([]), true );
   t.deepEqual( dom.window.test1, true );
   t.deepEqual( dom.window.test2, false );
});
