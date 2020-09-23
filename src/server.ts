import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
const dotenv = require("dotenv");
dotenv.config();

import RegisterRoutes from "./routes";

class Server {
  public app: Application;

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
    switch (process.env.NODE_ENV) {
      case "pro":
        this.app.set("config", require("./config/pro.json"));
      case "pre":
        this.app.set("config", require("./config/pre.json"));
      default:
        this.app.set("config", require("./config/pro.json"));
    }
  }

  routes(): void {
    this.app.use("/", RegisterRoutes);
  }

  start() {
    return this.app.listen(this.app.get("port"), () => {
      console.log("Server on port:", this.app.get("port"));
      console.log(`Enviroment: ${process.env.NODE_ENV}`);
    });
  }
}

const server = new Server();
module.exports = server.start();
