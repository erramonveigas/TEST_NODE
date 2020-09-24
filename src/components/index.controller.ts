import { Request, Response } from 'express';
import axios from 'axios';

require('dotenv').config();

// Entornos de Desarrollo
import * as dev from '../config/dev.json';
import * as pre from '../config/pre.json';
import * as pro from '../config/pro.json';

// Datos estaticos
import * as data from '../db/data.json';

// importar json-2-csv module
const converter = require('json-2-csv');
import { API_MOCS } from '../config/dev.json';

// Importamos la libreria
import fs from 'fs';
const readline = require('readline');

class IndexController {
  public async index(req: Request, res: Response) {

    var urlApi1:any;
    var urlApi2:any;

    // Verificamos el entorno en el que nos encontramos
    if (process.env.NODE_ENV === 'dev') {
        var entornoDesa:[] = (dev as any).default;
        //urlApi1 = API_MOCS.api1.url;
        //urlApi2 = API_MOCS.api2.url;
        //console.log(process.env.NODE_ENV);
        //console.log(entornoDesa);
    } else if(process.env.NODE_ENV === 'pre'){
        var entornoPre:[] = (pre as any).default;
        //urlApi1 = API_MOCS.api1.url;
        //urlApi2 = API_MOCS.api2.url;        
        //console.log(process.env.NODE_ENV);
        //console.log(entornoPre);
    } else if(process.env.NODE_ENV === 'pro'){
        var entornoPro:[] = (pro as any).default;
        //urlApi1 = API_MOCS.api1.url;
        //urlApi2 = API_MOCS.api2.url;        
        //console.log(process.env.NODE_ENV);
        //console.log(entornoPro);
    }

    // Datos estaticos
    var DataJson:[] = (data as any).default;

    // Fichero  api1
    //if(urlApi1){
    //  if(urlApi1.indexOf('api1')){
    //    axios.get(urlApi1)
     //     .then(resp => {
    //        res.json(resp.data);

            // Convertir JSON a CSV
            converter.json2csv(DataJson, (err:any, csv:any) => {
              if (err) {
                  throw err;
              }

              // Log de Seguimiento
              //console.log(csv);

              // Abrimos el directorio de salida
              fs.opendir( 
                // Directorio
                "src/outputs/", 
                // Opciones de codificacion
                { encoding: "utf8", bufferSize: 64 },
                 
                (err, dir) => { 
                  if (err){
                    console.log("Error:", err); 
                  } 
                  else { 
                    console.log("Directorio", dir.path); 
                    // Escribir CSV a fichero
                    //fs.writeFileSync(dir.path + 'todos.csv', csv);
                    // Cerramos el directorio
                    dir.closeSync(); 
                  } 
                } 
              ); 

            });

       //   })
      //    .catch(err => {
              // Handle Error Here
     //        console.error(err);
     //     });
      // }
    //}

  }
}

export const indexController = new IndexController(); 