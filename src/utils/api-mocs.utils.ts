import * as fs from 'fs';
let rawdata = fs.readFileSync('./src/config/' + process.env.NODE_ENV + '.json', 'utf-8');
let envConfig = JSON.parse(rawdata);
class ApiMocs {
    getProperties(){
        if(envConfig){
            return envConfig.API_MOCS;
        } else {
            throw new Error("Configuration file not found for NODE_ENV: " + process.env.NODE_ENV);
        }
    }
}

export const apiMocs = new ApiMocs();