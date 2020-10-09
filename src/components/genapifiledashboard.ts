/**
 * Class : GenApiFileDashboard
 * Autor : FGG
 * Fecha : 08/10/2020
 *
 * Responsabilidades de la clase:
 *
 *  Vacia el directorio src/outputs
 *  Lee los datos MocksData por streaming
 *  Transforma los datos leidos en ficheros CSV
 *  Graba los ficheros CSV en el directorio src/outputs
 */

import { createReadStream, createWriteStream } from "fs";
import { Transform } from "stream";
import path from "path";
import fs from "fs";
import rmdir from "../utils/rmdir";

class GenApiFileDashboard {

  constructor() {

    rmdir.emptyDir(path.join(__dirname, "../../src/outputs"), false);
    console.log("--- ","Vaciado del directorio destino src/outputs de los ficheros CSV");
  }

  //split file csv to files with maximun Max_lines = 999
  controlLengthFile1(
    pathfile: string,
    pmaxline: number,
    raizPathfileout: string
  ) {
    var numfile = 1;
    var count = 0;
    var pathfileoutnew = raizPathfileout + "_file_" + numfile.toString() + ".csv";
    if (fs.existsSync(pathfile)) {
      var filetemp = fs.readFileSync(pathfile, "utf-8").toString().split("\n");
      var lines = filetemp.length - 1;

      for (let i = 1; i <= lines; i++) {
        let buffer = filetemp[i] + "\n";

        //change name file due to maximun lines acheived
        if (count >= pmaxline) {
          count = 0;
          numfile++;
          pathfileoutnew =
            raizPathfileout + "_file_" + numfile.toString() + ".csv";
        }

        if (fs.existsSync(pathfileoutnew)) {
          fs.appendFileSync(pathfileoutnew, buffer);
          count++;
        } else {
          console.log(
            " Hecho -> ",
            "creacion ficheros CSV: ",pathfileoutnew);
          fs.writeFileSync(pathfileoutnew, buffer);
          count++;
        }
      }
    } else {
      console.log(
        " warning -> ",
        "Vaciado del directorio destino src/outputs de los ficheros CSV"
      );
      console.log("fichero  entrada NO existe");
    }
  }

  /**genera las promises asociados a los procesos:
   * lectura, transformacion y escritura des ficheros CSV
   * */
  jsonTOcvs(header: any[], pathin: string, pathout: string) {
    return new Promise((resolve) => {
      const read = createReadStream(pathin, {
        encoding: "utf-8",
      });

      const transform = new Transform();

      transform._transform = (chunk, _, done) => {
        const rows = chunk
          .toString()
          .replace(/("\w{1,}":)|[\r\n\s{[\]]/g, "")
          .replace(/},|}/g, "\n");

        done(null, rows);
      };

      const writer = createWriteStream(pathout);

      writer.on("open", () => writer.write(header.join(",") + "\n"));
      writer.on("close", () => resolve());

      read.pipe(transform).pipe(writer);
    });
  }

  /**FUNCION MOCKS Ejecuta las promises de gerentacion de los ficheros formato CSV TEMP */
  createCSVFromMocks(papi:string) {
    const MAX_LINES = 999;

    let formatcsv: any[] = [];
    let filestogenerate: [Promise<any>]; 

    switch (papi) {
      case "api1":
        filestogenerate = [
          this.jsonTOcvs(
            formatcsv,
            path.join(__dirname, "../../src/mocksdata/mocksapi1.json"),
            path.join(__dirname, "../../src/outputs/DataApi1.temp")
          )];
        break;
        case "api2":
          filestogenerate = [
            this.jsonTOcvs(
              formatcsv,
              path.join(__dirname, "../../src/mocksdata/mocksapi2.json"),
              path.join(__dirname, "../../src/outputs/DataApi2.temp")
            )];
          break;
    } 


    Promise.all(filestogenerate)
      .then(() => {
        console.log("--- Recuperacion de datos MOCKS DATA correcta");

        if (papi=="api1") {
        console.log("--- Creation Ficheros AP1");
          //split temporal file regarding max lines per file 99
        this.controlLengthFile1(
          path.join(__dirname, "../../src/outputs/DataApi1.temp"),
          MAX_LINES,
          path.join(__dirname, "../../src/outputs/DataApi1_OK")
        );
        }

        if (papi=="api2") {
        console.log("--- Creation Ficheros AP2");
        //split temporal file regarding max lines per file 99
        this.controlLengthFile1(
            path.join(__dirname, "../../src/outputs/DataApi2.temp"),
            MAX_LINES,
            path.join(__dirname, "../../src/outputs/DataApi2_OK")
          );
        }

          console.log("--------------------------------------------");
          console.log("--- PROCESO TERMINADO SATISFACTORIAMENTE ---");
          console.log("--------------------------------------------");
        })
      .catch((err) => console.log(err.message));
  }
}


const transformToCvs = new GenApiFileDashboard();
export default transformToCvs;
