import { Router } from "express";
import { indexController } from "./components/index.controller";
import { CheckQueryParams } from "./middleware";
class RegisterRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config(): void {
    this.router.get("/", CheckQueryParams, indexController.index);
  }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;
