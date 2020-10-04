import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
const dotenv = require('dotenv');
dotenv.config();  


// ---- Javier Sánchez 10-03-2020 ----
// -----------------------------------
import { mngData } from './core/mngData';
import { mngApp } from './core/mngApp';
// -----------------------------------


import RegisterRoutes from './routes';

class Server {
  public app: Application;
  private objMngData = new mngData();
  

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes(): void {
    this.app.use('/', RegisterRoutes);
  }

  
  async start() {
    // ---- Javier Sánchez 10-03-2020 ----
    // -----------------------------------
    let objFullData = {};
    
    
    // Destination path of the files loaded from .env file
    var strFullPath = process.cwd() + "/" + process.env.DATA_PATH;
    try {
        await this.objMngData.cleanDir( strFullPath );
    } catch (error) {
        console.log("Error: an error occurred while trying to clean data directory.");
        console.error(error);
        process.exit(-1);
    }
    
    
    
    
/*
    var objConfig = mngApp.getEfectiveConfigObject();
    console.log( objConfig.API_MOCS['api1'].url );
    
    
    try {
        objFullData = await this.objMngData.readDataFromSource( "https://mocks.free.beeceptor.com/api1" );
        //console.log( objFullData );
    } catch (error) {
        console.log("Error: an error occurred while trying to read the data from source service.");
        console.error(error);
        process.exit(-1);
    }
    
    
    let numAllDataLength = this.objMngData.getLengthData( objFullData );
    let numChunksDataLength = 999;
    for( let k = 0, numChuck = 0; k < numAllDataLength; k += numChunksDataLength, numChuck++ ) {
        let objDataSlice = this.objMngData.sliceData( objFullData, k, numChunksDataLength );
        //console.log( objDataSlice );
      
        //  CREAR DIRECTORIO DENTRO DE DATA SI NO EXISTE
      
      
      
      
      
        let strCsvContent = this.objMngData.JsonToCsv(
            objDataSlice.rows,
            ['field1', 'field2', 'field3']
        );
        //console.log( strCsvContent );
      
      
      
        let strOutCSVFilePath = `./src/outputs/aaa_${numChuck}.csv`;
        let strOutJSONFilePath = `./src/outputs/aaa_${numChuck}.json`;
        try {
            await this.objMngData.writeDataFromParam( strOutCSVFilePath, strCsvContent );
            //await this.objMngData.writeJSONDataFromParam( strOutJSONFilePath, objDataSlice );
        } catch (error) {
            console.log("Error: an error occurred while trying to write the data results.");
            console.error(error);
            process.exit(-1);
        }
    }
*/
    
    
   
    
    
    // -----------------------------------
    
    
    return this.app.listen(this.app.get('port'), () => {
      console.log('Server on port:', this.app.get('port'));
      console.log(`Enviroment: ${process.env.NODE_ENV}`); 
    });
  }
}

const server = new Server();
module.exports = server.start();
