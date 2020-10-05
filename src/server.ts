import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fs from 'fs';
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
    // Destination path of the files loaded from .env file
    var strFullPath = process.cwd() + "/" + process.env.DATA_PATH;
    try {
        await this.objMngData.cleanDir( strFullPath );
    } catch (error) {
        console.log("Error: an error occurred while trying to clean data directory.");
        console.error(error);
        process.exit(-1);
    }
    
    try {
        if( !fs.existsSync( strFullPath ) ) {
            await fs.promises.mkdir( strFullPath );
        }
    } catch (error) {
        console.log("Error: an error occurred while trying to create data directory.");
        console.error(error);
        process.exit(-1);
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
