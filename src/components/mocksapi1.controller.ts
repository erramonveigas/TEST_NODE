/**
 * Class : Mocksapi1Controller
 * Autor : FGG
 * Fecha : 08/10/2020
 *
 * Responsabilidades de la clase:
 *
 *  controlar las peticiones del endpoint de recuperaciond de los
 * datos https://mocks.free.api1 * 
 */
import {NextFunction, Router} from "express";
import { Request, Response } from 'express';
import fs from 'fs';

class Mocksapi1Controller {
  
  router = Router();

  public async mocksapi1(req: Request, res: Response) 
  {
    const strcontent = JSON.stringify(res);
    fs.writeFileSync("src/mocksdata/mocksapi1.json",strcontent,"utf-8");
    res.end();
  }

}

export const mocksapi1Controller = new Mocksapi1Controller(); 