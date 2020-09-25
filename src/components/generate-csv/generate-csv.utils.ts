import * as path from 'path';
import * as fs from 'fs';
import * as converter from 'json-2-csv';


import { CONSTANT, Item } from './generate-csv.models';

function getFormatedCurrentDate() {
    const f  = new Date();
    return `${f.getDate()}-${f.getMonth()}-${f.getFullYear()}`;
}

function createDirectory( dir: string ) {

    fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) throw err;
    });
}

function emptyDirectory( dir: string ) {
    if (fs.existsSync(dir)) {
        fs.readdir( dir, (err: NodeJS.ErrnoException, files: string[]) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join( dir, file), err =>  {
                    if (err) throw err;
                })
            }
        });
    }
}

export function storeCSVFiles(items: Item[], fullOutputDir: string) {
    emptyDirectory(fullOutputDir);
    for (let i = 0; i < items.length; i = i + CONSTANT.MAX_LENGTH) {
        let slice = [];
        if (i + CONSTANT.MAX_LENGTH > items.length) {
            slice = items.slice(i, items.length);
        }
        slice = items.slice(i, i + CONSTANT.MAX_LENGTH);
        converter.json2csv(slice, (err: any, csv: any) => {
            if (err) {
                throw err;
            }
            createDirectory(fullOutputDir);
            const fileName = `${getFormatedCurrentDate()}-${Date.now()}-${i}-${i+slice.length}.csv`
            console.log(`Creating ${fullOutputDir}/${fileName}`);
            fs.writeFileSync(`${fullOutputDir}/${fileName}`, csv);
            
        });
    }
}