
import { Request, Response } from 'express';

class ApiController {
  public async index(req: Request, res: Response) {
    //res.json("API component");
    res.json( req.params );
  }
}

export const apiController = new ApiController(); 
