import { Request, Response } from "express";

import { GetEndPoints } from "../utils/getEndPoints";

class IndexController {
  public async index(req: Request, res: Response) {
    try {
      const endPoints = GetEndPoints();
      console.log("Working#######", endPoints);

      res.status(200).json("Holamundo");
    } catch (error) {
      res
        .status(500)
        .json(
          `opppssss not able to execute the files: ${
            error.message || "error not known"
          }`
        );
    }
  }
}

export const indexController = new IndexController();
