/**
 * Class : GenApiFileDashboard
 * Autor : FGG
 * Fecha : 08/10/2020
 *
 * Responsabilidades de la clase:
 *
 *  Vacia el directorio src/outputs
 *  Lee los datos MocksData por streaming (Local o acceso servicio externo)
 *  Transforma los datos leidos en un fichero CSV
 *  Graba los ficheros CSV en el directorio src/outputs
 * 
 * Carpeta src/MOCKSDATA: ficheros temporales y mocks de los datos
 * los ficheros temprolas no permite de tenr una trazabilidad del proceso en caso de fallo deterinar con más facilidad
 * el possible error
 * mocksapi?.temp  : FICHERO CON LOS DATOS RECUPERATDO DEL SERVCISO EXTERNOS Y GUARDADO
 * csvapi?.temp : FICHERO RESULTADO (CON TODOS LOS DATOS) DEL CAMBIO DE FORMATO json -> CSV
 * CUANDO SE PASE A PRODUCCION LOS BORRARMOS EN EL BATCH DE EJECUCION 
 * 
 * MODIFY:
 */

import { createReadStream, createWriteStream, writeFileSync } from "fs";
import { Transform } from "stream";
import axios from "axios";
import path from "path";
import fs from "fs";
import rmdir from "../utils/rmdir";
import ReadConfigFile from "../utils/readconfigfile";

class GenApiFileDashboard {

  //maximu line autorized by generated file
  MAX_LINES = 999;

  constructor() {
  }

  // handle error try catch
  handleError(pError:string) {
    console.error('ERROR',pError);
  } 

  /*read mocksdata from url mocks.data.free
  pUrlExt : url REST service externe, by example https://mocks.free.beeceptor.com/api1 */
  async readDataFromUrlExt(pUrlExt : string) {

    try {
      let pdata = [];
      const resp = await axios.get( pUrlExt);
      pdata =resp.data;
      return pdata;        

    } catch (error) {
      this.handleError(error);
    }
  }

  /*save data in temporal file to track process
  pUrlExt : url REST service externe, by example https://mocks.free.beeceptor.com/api1 
  pPath : Path temporal created file with data readed*/
  async getMocksDataFile (pUrlExt: string, pPath :string) {
    
    try {
      const cData = await this.readDataFromUrlExt(pUrlExt);
      let vDataStr = JSON.stringify(cData);
      const fs = writeFileSync(pPath,vDataStr);     
    } catch (error) {
      this.handleError(error);
    }

  }

    

  /*split file csv to files with maximun Max_lines = 999
    pathfile: orgin file to split
    pmaxline: maximun of lines by file created
    raizPathfileout: path file created
  */ 
  controlLengthFile1(
    pathfile: string,
    pmaxline: number,
    raizPathfileout: string
  ) {

    try {
      var numfile = 1;
      var count = 0;
      var pathfileoutnew = raizPathfileout + "_file_" + numfile.toString() + ".csv";
  
      if (fs.existsSync(pathfile)) {
        var filetemp = fs.readFileSync(pathfile, "utf-8").toString().split("\n");
        var lines = filetemp.length - 1;
  
        for (let i = 1; i <= lines; i++) {
          let buffer = filetemp[i] + "\n";
  
          //change name file due to maximun lines acheived
          if (count >= pmaxline) {
            count = 0;
            numfile++;
            pathfileoutnew =
              raizPathfileout + "_file_" + numfile.toString() + ".csv";
          }
  
          if (fs.existsSync(pathfileoutnew)) {
            fs.appendFileSync(pathfileoutnew, buffer);
            count++;
          } else {
            console.log(" Hecho -> ","creacion ficheros CSV: ",pathfileoutnew);
            fs.writeFileSync(pathfileoutnew, buffer);
            count++;
          }
        }
      } else {
        console.log("fichero Data NO existe");
      }        
    } catch (error) {
      this.handleError(error);      
    }
  }

  /** Create promises for generate dashboard files, 
   *  read by stream file with data to transform 
   *  each chunck is transformed in format csv with regular expression
   *  and write by stream in a result file
   *  buffer  : buffer for trnasforming by chunck 
   *  pathin  : path source JSON file
   *  pathout : path result csv file  
   * */
  jsonTOcvs( buffer:any[], pathin: string, 
              pathout: string) {

    try {
      return new Promise((resolve) => {
    
        const read = createReadStream(pathin, {
          encoding: "utf-8",
        });
  
        const transform = new Transform();
  
        transform._transform = (chunk, _, done) => {
          const rows = chunk
            .toString()
            .replace(/("\w{1,}":)|[\r\n\s{[\]]/g, "")
            .replace(/},|}/g, "\n");
  
          done(null, rows);
        };
  
        const writer = createWriteStream(pathout);
  
        writer.on("open", () => writer.write(buffer.join(",") + "\n"));
        writer.on("close", () => resolve());
  
        read.pipe(transform).pipe(writer);
      });
        
    } catch (error) {
      this.handleError(error);                    
    }            
  }


  /** Generate files for dashboard regarding requested API from data local or external rest Url (promise process)     
   * papi   : requested API
   * pflagDownload  : boolean what source data we use:  true = local data / false download data from external rest Url 
   * pUrlDataSource : url external service mock data 
  */
  createCSVFromData(papi:string,pFlagDownload:boolean) {

      try {
      let formatcsv: any[] = []; 
      
      let filestogenerate: [Promise<any>]; 

      const  cPathData = path.join(__dirname, `../../src/mocksdata/mocks${papi}.temp`);
      const  cPathCsv =  path.join(__dirname, `../../src/mocksdata/csv${papi}.temp`);
      const  CPathOutputs = path.join(__dirname, `../../src/outputs/data${papi}.csv`);
      
      //vaciado directorio outputs
      rmdir.emptyDir(path.join(__dirname, "../../src/outputs"), false);
      console.log("--- ","Vaciado del directorio destino src/outputs de los ficheros CSV");


      /*read config.json according NODE_ENV to determine URL DATA MOCS*/
      const cConfig = ReadConfigFile.getConfigFile(process.env.NODE_ENV);
      let cUrlMocksData = "";
      switch (papi) {
        case "api1":
            cUrlMocksData = ReadConfigFile.getApi1Url();       
        break;
        case "api2":
            cUrlMocksData = ReadConfigFile.getApi2Url();               
        break;
      }
      
      // retreive data from extrenal URL
      if (pFlagDownload) {this.getMocksDataFile(cUrlMocksData,cPathData)};
      //if (pFlagDownload) {this.getMocksDataFile("https://mocks.free.beeceptor.com/api1",cPathData)};

      filestogenerate = [this.jsonTOcvs(formatcsv,cPathData,cPathCsv)];

      Promise.all(filestogenerate)
        .then(() => {
          console.log("--- Recuperacion de datos MOCKS DATA correcta");

          console.log("--- Creation Ficheros AP1");
          this.controlLengthFile1(cPathCsv,this.MAX_LINES,CPathOutputs);

          console.log("--------------------------------------------");
          console.log("--- PROCESO TERMINADO SATISFACTORIAMENTE ---");
          console.log("--------------------------------------------");

          })
        .catch((err) => console.log(err.message));
    

    } catch (error) {
      this.handleError(error);            
    }
  }

}


const transformToCvs = new GenApiFileDashboard();
export default transformToCvs;
