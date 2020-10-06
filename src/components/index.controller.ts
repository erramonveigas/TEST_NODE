
import { Request, Response } from 'express';
import { CsvConverter } from '../utils/CsvConverter';
import  Fetch  from 'node-fetch';

class IndexController {
  public async index(req: Request, res: Response) {
    res.status(200).json("CSV Generator REST API");
  }

  public async converter(req: Request, res: Response) {
    let api = req.query.api;
    const converter = new CsvConverter();
    
    if (api) {
        const apiNumer = api.toString();

        const url = req.app.get("config").API_MOCS[apiNumer].url;
      
        let data = await Fetch(url);
        let json = await data.json();

        await converter.convert(json, api.toString());
        res.status(200).json("Ficheros descargados");
      
    }
    else {
      res.status(400).json("Parámetro no encontrado");
    }
  }
}

export const indexController = new IndexController(); 
