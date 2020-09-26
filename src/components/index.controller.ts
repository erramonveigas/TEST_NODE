import { Request, Response } from "express";

import { GetEndPoint } from "../utils/getEndPoints";
import { GetData } from "../utils/getData";

class IndexController {
  public async index(req: Request, res: Response) {
    try {
      const apiUrl = GetEndPoint(req.api);
      GetData(apiUrl);
      res.status(200).json("Holamundo");
    } catch (error) {
      res.status(500).json({
        message: `opppssss not able to execute the files: ${
          error.message || "error not known"
        }`,
      });
    }
  }
}

export const indexController = new IndexController();
