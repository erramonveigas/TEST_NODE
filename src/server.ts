import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
const dotenv = require('dotenv');
dotenv.config();  

// ---- Javier Sánchez 10-03-2020 ----
// -----------------------------------
  import { mngData } from './core/mngData';
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
    // Destination path of the files loaded from .env file
    var strFullPath = process.cwd() + "/" + process.env.DATA_PATH;
    await this.objMngData.cleanDir( strFullPath );
    
    let objFullData = await this.objMngData.readDataFromSource( "https://mocks.free.beeceptor.com/api1" );
    //console.log( objFullData );
    
    let numAllDataLength = this.objMngData.getLengthData( objFullData );
    let numChunksDataLength = 999;
    for( let k = 0; k < numAllDataLength; k += numChunksDataLength ) {
        let objDataSlice = this.objMngData.sliceData( objFullData, k, numChunksDataLength );
        console.log( objDataSlice );
      
        await this.objMngData.writeDataFromParam( "./data/aaa.json", objDataSlice );
    }
    // -----------------------------------
    
    
    return this.app.listen(this.app.get('port'), () => {
      console.log('Server on port:', this.app.get('port'));
      console.log(`Enviroment: ${process.env.NODE_ENV}`); 
    });
  }
}

const server = new Server();
module.exports = server.start();







/*
const request = require('request');

let url = "https://mocks.free.beeceptor.com/api1";

let options = {json: true};



request(url, options, (error: any, res: any, body: any) => {
    if (error) {
        return  console.log(error)
    };

    if (!error && res.statusCode == 200) {
        // do something with JSON, using the 'body' variable
      console.log( res );
    };
});
*/