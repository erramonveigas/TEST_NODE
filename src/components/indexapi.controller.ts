/**
 * Class : IndexapiController
 * Autor : FGG
 * Fecha : 08/10/2020
 *
 * Responsabilidades de la clase:
 *
 *  controlar las peticiones del endpoint /?api=api1 o api2
 * 
 */

import {Router} from "express";
import {Request, Response } from 'express';
import TransformToCsv from './genapifiledashboard';

class IndexapiController {
  
  router = Router();

  public async indexapi(req: Request, res: Response) {
    
    console.log("---------------------------------------------------------------------------");
    console.log("TEST NODE.JS :  Creacion de ficheros DASHBOARD ( 999 lineas por fichero)");
    console.log("   parametro :  const MAX_LINES = 999 en createCSVFromMocks");
    console.log("---------------------------------------------------------------------------");

    let api=req.query.api;
    console.log("---------------------------------------------------------------------------");
    console.log("-- API pedida: ",api);
    console.log("---------------------------------------------------------------------------");

    //call compomente generate 
    TransformToCsv.createCSVFromMocks(api.toString());

    res.send(" --- PROCESO CREACION DE FICHEROS en src/outputs PARA DASHBOARD API= "+api);
    res.end();
    
  }
}

export const indexapiController = new IndexapiController(); 