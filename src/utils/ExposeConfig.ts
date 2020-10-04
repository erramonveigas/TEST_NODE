// ---- Javier Sánchez 10-03-2020 ----
// -----------------------------------
/*
    tsc && node build/utils/ExposeConfig
*/
import { mngApp } from '../core/mngApp';

const dotenv = require('dotenv').config({path: '.env'});


console.log( `Environment mode: ${ mngApp.getEnvironmentMode() }` );
console.log( `Full path of configuration file: ${ mngApp.getConfigFileFullPath() }` );


//  Require config object
var objConfig = mngApp.getEfectiveConfigObject();

//  Example how to access an element
//console.log( objConfig.API_MOCS['api1'].url );

console.log("\n\nConfiguration file content in JSON format: ");
console.log( objConfig );

console.log("\n\nConfiguration file content in TABLE format: ");
console.table( objConfig.API_MOCS );


// -----------------------------------