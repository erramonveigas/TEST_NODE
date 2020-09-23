
import { Request, Response } from 'express';

class IndexController {
  public async index(req: Request, res: Response) {
    res.json("Holamundo");
  }
}

export const indexController = new IndexController(); 
