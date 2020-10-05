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
    return this.app.listen(this.app.get('port'), () => {
      console.log('Server on port:', this.app.get('port'));
      console.log(`Enviroment: ${process.env.NODE_ENV}`); 
    });
  }
}

const server = new Server();
module.exports = server.start();
