import { Router, Response, Request, NextFunction } from "express";
import { indexController } from "./components/index.controller";
import { indexapiController } from "./components/indexapi.controller";
import { mocksapi1Controller } from "./components/mocksapi1.controller";
import { mocksapi2Controller } from "./components/mocksapi2.controller";

class RegisterRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  //List endpoints API
  config(): void {
    //endpoint 1: API localhost:3000/?api=api1
    //endpoint 2: API localhost:3000/?api=api2
    this.router.get("/", indexapiController.indexapi);

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

    //endPoint mocks.free.beereceptor recuperation mocks data en src/mocksdata
    this.router.get(
      "https://mocks.free.beeceptor.com/api1",
      mocksapi1Controller.mocksapi1
    );
    this.router.get(
      "https://mocks.free.beeceptor.com/api2",
      mocksapi2Controller.mocksapi2
    );
  }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;
