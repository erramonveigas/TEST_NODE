import * as converter from "json-2-csv";
import fs from "fs";

interface Data {
  items: [];
}

export class FileWorker {
  csvPath = `${process.cwd()}/src/outputs/`;

  parser = (data: Data, api: string) => {
    return converter.json2csv(data.items, (err, csv) => {
      if (err) {
        throw err;
      }

      const files = [];

      const data = csv.split(/\r\n|\r|\n/);
      const headLine = data[0];
      const linesNumber = data.length;
      // una columna meno para a;adir cavecera a casa file
      const filesToWrite = Math.ceil(linesNumber / 998);

      for (let i = 1; i <= filesToWrite; i++) {
        const element = data.slice(0, 998);
        element.unshift(headLine);

        fs.writeFile(
          `${this.csvPath + api}-file${i}.csv`,
          element.toString(),
          (err) => {
            if (err) return console.log(err);
          }
        );
      }
    });
  };

  private redDirectory = fs.readdir(this.csvPath, (err, files) => {
    //handling error

    if (err) {
      return console.log("Unable to scan directory: " + err);
    }

    const links = files.map((el) => {
      return { el: `/download/${el}` };
    });

    return links;
  });

  removeFiles = fs.readdir(this.csvPath, (err, files) => {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    files.forEach((file) => {
      // Do whatever you want to do with the file
      try {
        fs.unlinkSync(this.csvPath + file);
        //file removed
      } catch (err) {
        console.error(err);
      }
    });
  });
}
