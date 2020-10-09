/**
 * Class : Mocksapi2Controller
 * Autor : FGG
 * Fecha : 08/10/2020
 *
 * Responsabilidades de la clase:
 *
 *  controlar las peticiones del endpoint de recuperaciond de los
 * datos https://mocks.free.api2 * 
 */
import {NextFunction, Router} from "express";
import { Request, Response } from 'express';
import fs from 'fs';

class Mocksapi2Controller {
  
  router = Router();

  public async mocksapi2(req: Request, res: Response) 
  {
    const strcontent = JSON.stringify(res);
    fs.writeFileSync("src/mocksdata/mocksapi1.json",strcontent,"utf-8");
    res.end();
  }

}

export const mocksapi2Controller = new Mocksapi2Controller(); 