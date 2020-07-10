/**
 * Get variable class
 * @param {*} any
 * @return {string} Return class
 **/
export function cls( any ) {

   return {}.toString.call( any ).slice( 8, -1 ).toLowerCase();
};
