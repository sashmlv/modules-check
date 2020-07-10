import { cls } from './cls';

/**
 * Check is variable has value
 * @param {*} source
 * @param {string} [path]
 * @param {*} value
 * @return {boolean}
 **/
export function has( source, path, value ){

   let result = undefined;

   if( arguments.length === 2 ){

      value = path;
      path = undefined;
   }
   else if( arguments.length < 2 ){

      result = undefined;
   };

   switch( arguments.length > 1 ){

      case cls( source ) === 'array':

         result = source.includes( value );
         break;

      case cls( source ) === 'object':

         if( cls( value ) === 'object' ){
         }
         else {

            result = false;
         }
         break;
   };

   return result;
};
