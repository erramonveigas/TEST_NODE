import axios from "axios";
import { json2csvAsync } from "json-2-csv";
import fs from "fs";
import path from "path";

import { api1Mock, api2Mock, api3Mock } from "../mock";
import { EnvVars } from "../utils/validateEnv";

interface Response {
  index: number;
  index_start_at: number;
  integer: number;
  float: number;
  name: string;
  surname: string;
  fullname: string;
  email: string;
  bool: boolean;
}
export const MakeFiles = async (url: string, folder: string) => {
  let data: any[];
  let count = 0;
  let tempArray = [];

  try {
    if (!EnvVars.USEMOCK) {
      const response = await axios.get(url);
      data = response.data.items;
    } else {
      data = api1Mock.items;
    }

    const dir = await prepareFolder(folder);

    for (count = 0; count < data.length; count += EnvVars.FILE_SIZE) {
      tempArray = data.slice(count, count + EnvVars.FILE_SIZE);

      const csv = await json2csvAsync(tempArray, {
        expandArrayObjects: true,
      });
      const file = await prepareFile(`${dir}/fichero${count + 1}.csv`);

      console.log(`Creating file: ${file}`);
      fs.writeFileSync(file, csv, { flag: "w" });
    }
  } catch (error) {
    console.log(error.message || "Not able to process files");
  }
};

const prepareFolder = async (folder: string): Promise<string> => {
  try {
    const dir = path.join(__dirname, "../outputs/" + folder);

    console.log(`Deleting folder ${folder}`);

    fs.rmdirSync(dir, { recursive: true });

    console.log(`Creating folder ${folder}`);
    fs.mkdirSync(dir);

    return dir;
  } catch (error) {
    throw { message: error.message || `not able to make the dir ${folder}` };
  }
};

const prepareFile = async (file: string): Promise<string> => {
  try {
    if (fs.existsSync(file)) {
      console.log(`Deleting file: ${file}`);
      fs.unlinkSync(file);
    }

    return file;
  } catch (error) {
    throw { message: error.message || `not able to make the file ${file}` };
  }
};
