import { Request, Response } from "express";
import { FileWorker } from "../utils/json-to-csv";
import fetch from "node-fetch";

class IndexController {
  public async api(req: Request, res: Response) {
    let api = req.query.api;
    const fileWorker = new FileWorker();

    if (api) {
      if (api == "api1") {
        const api1Url = req.app.get("config").API_MOCS.api1.url;

        let response = await fetch(api1Url);
        let data = await response.json();

        fileWorker.removeFiles;
        fileWorker.parser(data, "api1");

        res.status(200).json("files saved");
      }

      if (api == "api2") {
        const api1Url = req.app.get("config").API_MOCS.api2.url;

        let response = await fetch(api1Url);
        let data = await response.json();

        fileWorker.removeFiles;
        fileWorker.parser(data, "api2");

        res.send("files saved");
      }
    } else {
      res.status(400).json("Querry params missing");
    }
  }

  public async download(req: Request, res: Response) {
    var filePath = "/my/file/path/..."; // Or format the path using the `id` rest param
    var fileName = "report.pdf"; // The default name the browser will use

    res.download(filePath, fileName);
  }
}

export const indexController = new IndexController();
