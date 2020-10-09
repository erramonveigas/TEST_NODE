import express from "express";
import morgan from "morgan";
import cors from "cors";
const dotenv = require("dotenv");
dotenv.config();

import RegisterRoutes from "./routes";
import ReadConfigFile from "./utils/readconfigfile";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    //read config.json according NODE_ENV to determine URL DaTA MOCS
    ReadConfigFile.getConfigFile(process.env.NODE_ENV);

    //Set API URL in 
    this.app.set("API1", ReadConfigFile.getApi1Url() || "config file not find");
    this.app.set("API2", ReadConfigFile.getApi2Url() || "config file not find");

  }

  routes(): void {
    this.app.use("/", RegisterRoutes);
  }

  start() {
    
    return this.app.listen(this.app.get("port"), () => {
      console.log("Server on port:", this.app.get("port"));
      console.log(`Enviroment: ${process.env.NODE_ENV}`);

      //REQ1 - render urls API 1 and API 2 from config
      console.log("------------------------------------------------------------------------");
      console.log("TEST NODE.JS :  render urls API 1 and API 2 from config según enviroment");
      console.log("------------------------------------------------------------------------");
      console.log("FGG - Url API 1:", this.app.get("API1"));
      console.log("FGG - Url API 2:", this.app.get("API2"));
    });
  }
}

const server = new Server();
module.exports = server.start();
