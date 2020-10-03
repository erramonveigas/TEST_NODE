import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
const dotenv = require('dotenv');
dotenv.config();  

// ---- Javier Sánchez 10-03-2020 ----
// -----------------------------------
var fs = require('fs');
// -----------------------------------


import RegisterRoutes from './routes';

class Server {
  public app: Application;

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

  start() {
    
    return this.app.listen(this.app.get('port'), () => {
      console.log('Server on port:', this.app.get('port'));
      console.log(`Enviroment: ${process.env.NODE_ENV}`); 
    });
  }
}

const server = new Server();
module.exports = server.start();
  


// ---- Javier Sánchez 10-03-2020 ----
// -----------------------------------
// Destination path of the files loaded from .env file
  
////////////////////////////////////////////////////////////////////////////////
/*  OJO Cada bloque de ficheros generado tiene que quedarse en una carpeta fija e independiente
    para que la herramienta de dashboarding las recupere de una ruta concreta.
    
    Al ser un proceso mensual, cada vez que se inicie el proceso se ha de vaciar la carpeta.
*/
var strFullPath = process.cwd() + "/" + process.env.DATA_PATH;
 
fs.readdir( strFullPath, function( err: any, arrLstFiles: any ) {
    for (var i=0; i < arrLstFiles.length; i++) {
        let strFilePath: string = strFullPath + arrLstFiles[i];
      
        console.log( "Deleting file: " + strFilePath );

        try {
            fs.unlinkSync( strFilePath );
            //file removed
        } catch(err) {
            console.error(err)
        }
    }
});
// -----------------------------------
 