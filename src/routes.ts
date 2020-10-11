/**
 * Modify by FGUZMAN 07/10/2020 to do NODE_TEST
 * 
 */

import { Router, Response, Request, NextFunction } from "express";
import { indexController } from "./components/index.controller";
import { genapifiledashboard} from "./components/genapifiledasboard.controller";

class RegisterRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  //List endpoints API
  config(): void {
    //endpoint 1: API localhost:3000/?api=api1
    //endpoint 2: API localhost:3000/?api=api2
    this.router.get("/", genapifiledashboard.indexapi);

    //endpoint ayuda usuario recordatorio como llamar endpoints API
    this.router.get("/api", (req: Request, res: Response) => {
      res
        .status(200)
        .send(
          "Ojo, para llamar la API (falta el caracter ?), usar /?api= api1 or api2"
        );
      return;
    });

    //endpoint hello mundo
    this.router.get("/hello", indexController.index);

  }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;
