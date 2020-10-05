import { ApiResponse, Items} from './monthly-dump.models';
import * as json2csv from 'json-2-csv';

const fsExtra = require('fs-extra');

export async function dump(api: string, url: string) {
    try {
        const apiRepsonse: ApiResponse = await callApi(url);
        if(!apiRepsonse){
            throw new Error("Error consuming api: " + api);
        } else {
            await cleanDir(api);
            await sliceAndWrite(api, apiRepsonse);
        }        
    } catch (err) {
        throw err;
    }
}

async function sliceAndWrite(api: string, apiRepsonse: ApiResponse) {
    try {
        for (let i = 0; i < apiRepsonse.items.length; i = i + 998) {
            let sliceEnd = apiRepsonse.items.length < i + 998 ? apiRepsonse.items.length: i + 998;
            let slice = apiRepsonse.items.slice(i, sliceEnd);
            await writeFileSlice(slice, api, i);
        }        
    } catch (err) {
        throw err;
    }
}

async function writeFileSlice(slice: Items[], api: string, i: number) {
     json2csv.json2csv(slice, async (err, csv) => {
        if(err){
            throw err;
        }
        let apiDir = './src/outputs/' + api;
        let name = 'MD-' + (i + 1) + '-' + (i + 999);
        let filePath = apiDir + "/" + name + "/" + name + ".csv";
        await fsExtra.outputFile(filePath, csv);
    });
}


async function cleanDir(api: string) {
    try {
        let apiDir = './src/outputs/' + api;
        await fsExtra.ensureDir(apiDir);
        await fsExtra.emptyDir(apiDir);        
    } catch (err) {
        throw err;
    }
}

async function callApi(endpoint: string) : Promise<ApiResponse> {
    // PARA EVITAR MAS LLAMADAS CON 429 HACEMOS UNA RESPUESTA FAKE POR FICHERO 
    try {
        const packageObj = await fsExtra.readJson('./src/api-response.json');
        return packageObj;
    } catch (err) {
        throw err;
    }
}