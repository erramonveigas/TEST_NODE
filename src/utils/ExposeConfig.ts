// ---- Javier Sánchez 10-03-2020 ----
// -----------------------------------
/*
    tsc && node build/utils/ExposeConfig
*/

const dotenv = require('dotenv').config({path: '.env'});



//  Get environment mode and create aplicable config file path.
let strEnvMode = process.env.NODE_ENV
let strConfigRelativePath: string = "";

console.log( `Environment mode: ${strEnvMode}` );

switch( strEnvMode ) {
    case 'pro':
        strConfigRelativePath = "/src/config/pro.json";
        break;
    
    default:
    case 'dev':
    strConfigRelativePath = "/src/config/pre.json";
        break;
    
}

//  Create full path from relative path (project path + relative path)
let strConfigFullPath = process.cwd() + strConfigRelativePath;
console.log(`Full path of configuration file: ${strConfigFullPath}`);

//  Require config file (In Json format)
var objConfig = require( strConfigFullPath );



//  Example how to access an element
//console.log( objConfig.API_MOCS['api1'].url );

console.log("\n\nConfiguration file content in JSON format: ");
console.log( objConfig );

console.log("\n\nConfiguration file content in TABLE format: ");
console.table( objConfig.API_MOCS );


// -----------------------------------