import { Request, Response } from "express";

import { GetEndPoint } from "../utils/getEndPoints";
import { MakeFiles } from "../utils/makeFiles";

class IndexController {
  public async index(req: Request, res: Response) {
    try {
      const apiUrl = GetEndPoint(req.api);
      MakeFiles(apiUrl, req.api);
      res.status(200).json({
        message: "Files will be processed in the outputs folder",
        message2: "Check the console if files are not processed",
      });
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
