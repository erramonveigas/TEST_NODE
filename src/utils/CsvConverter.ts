import * as converter from 'json-2-csv';
import * as fs from 'fs';
import path from 'path';
import * as util from 'util';

const stat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const readDir = util.promisify(fs.readdir);
const deleteFile = util.promisify(fs.unlink);

interface Data {
  items: [];
}

export class CsvConverter {

  directory = `./src/outputs/${process.env.NODE_ENV}`;

  convert = async (data: Data, api: string) => {
    try {
      await stat(this.directory);
      await this.deleteFiles();
    } catch(_) {
      // el directorio no existe
      await mkdir(this.directory, { recursive: true });
    }
    const totalChunks = Math.floor(data.items.length / 999) + (data.items.length % 999 === 0 ? 0 : 1);
    try {
      for (let chunk = 0; chunk < totalChunks; chunk++) {

        const dataSlice = data.items.slice(chunk*999, (chunk+1)*999);
        const csvData = await converter.json2csvAsync(dataSlice);
        await writeFile(`${this.directory}/${api}-${chunk+1}.csv`, csvData);

        console.log(`Fichero ${api}-${chunk+1}.csv creado correctamente`);
      }

    } catch (err) {
      console.error(err)
    }

  };

  deleteFiles = async () => {
    
    try {
      let files = await readDir(this.directory); 

      if(files) {
          for (const file of files) {
              await deleteFile(path.join(this.directory, file));
          }
          return console.log(`Directorio borrado: ${this.directory}`);
      }
    } catch(err) { 
      return console.log("No se ha podido acceder el directorio: " + err);
    }
  };
}
