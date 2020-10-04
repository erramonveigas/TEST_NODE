import { writeFile } from 'fs';
import { ApiResponse, Items} from './monthly-dump.models';
import * as fs from 'fs';
import * as json2csv from 'json-2-csv';

const fsExtra = require('fs-extra');
const request = require('request');

export function dump(api: string, url: string) {
    //Llamar al api para recuperar datos
    const apiRepsonse: ApiResponse = callApi(url);
    if(!apiRepsonse){
        throw new Error("Error consuming api: " + api);
    } else {
        //Limpio el directorio del api
        cleanDir(api);
        //Dividimos el json en bloques de 999        
        //Guardamos los bloques en csv (Con carpeta individiual)
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
        let apiDir = '.src/outputs/' + api;
        let name = 'MD-' + (i + 1) + '-' + (i + 999);
        let filePath = apiDir + "/" + name + "/" + name + ".csv";
        fs.writeFileSync(filePath, csv);
    });
}

function cleanDir(api: string) {
    let apiDir = '.src/outputs/' + api;
    fsExtra.ensureDirSync(apiDir);
    fsExtra.emptyDirSync(apiDir);
}

function callApi(url: string) : ApiResponse {
    //TODO
    console.log(url);
    request(url, { json: true }, (err: any, res: any, body: { url: any; explanation: any; }) => {
        if (err) { return console.log(err); }
            console.log(res);
            console.log("BODY URL");
            console.log(body.url);
            console.log("BODY EXPLANATION");
            console.log(body.explanation);
        });
    return ;
}