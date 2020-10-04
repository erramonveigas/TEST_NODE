import { writeFile } from 'fs';
import { ApiResponse, Items} from './monthly-dump.models';
import * as fs from 'fs';
import * as json2csv from 'json-2-csv';

const fsExtra = require('fs-extra');
const request = require('request');

export function dump(api: string, url: string) {
    const apiRepsonse: ApiResponse = callApi(url);
    if(!apiRepsonse){
        throw new Error("Error consuming api: " + api);
    } else {
        cleanDir(api);
        sliceAndWrite(api, apiRepsonse);
    }
}

function sliceAndWrite(api: string, apiRepsonse: ApiResponse) {
    for (let i = 0; i < apiRepsonse.items.length; i = i + 998) {
        let sliceEnd = apiRepsonse.items.length < i + 998 ? apiRepsonse.items.length: i + 998;
        let slice = apiRepsonse.items.slice(i, sliceEnd);
        writeFileSlice(slice, api, i);
    }
}

function writeFileSlice(slice: Items[], api: string, i: number) {
    json2csv.json2csv(slice, (err, csv) => {
        if(err){
            throw err;
        }
        let apiDir = './src/outputs/' + api;
        let name = 'MD-' + (i + 1) + '-' + (i + 999);
        let filePath = apiDir + "/" + name + "/" + name + ".csv";
        fsExtra.ensureFileSync(filePath);
        fs.writeFileSync(filePath, csv);
    });
}

function cleanDir(api: string) {
    let apiDir = './src/outputs/' + api;
    fsExtra.ensureDirSync(apiDir);
    fsExtra.emptyDirSync(apiDir);
}

function callApi(endpoint: string) : ApiResponse {
    /* PARA EVITAR MAS LLAMADAS CON 429 HACEMOS UNA RESPUESTA FAKE POR FICHERO
    const apiResponse: ApiResponse = 
    request.get(endpoint, { json: true }, (err: any, res: any, body: any) => {
            if (err) { 
                throw err; 
            }
            return body;
        });
        */
     
    let arJSON = fs.readFileSync('./src/api-response.json', 'utf-8');
    return JSON.parse(arJSON);
}