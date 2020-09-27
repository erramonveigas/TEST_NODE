import axios from "axios";
import { json2csvAsync } from "json-2-csv";
import fs from "fs";
import path from "path";

import { api3Mock } from "../mock";
import { EnvVars } from "../utils/validateEnv";

export const MakeFiles = async (url: string, folder: string) => {
  let data: any[];
  let count = 0;
  let tempArray = [];

  try {
    if (!EnvVars.USEMOCK) {
      console.log(`Using the real api ${url}`);
      const response = await axios.get(url);
      data = response.data.items;
    } else {
      console.log(`Using the mock`);
      data = api3Mock.items;
    }

    const dir = await prepareFolder(folder);

    for (count = 0; count < data.length; count += EnvVars.FILE_SIZE) {
      tempArray = data.slice(count, count + EnvVars.FILE_SIZE);

      const csv = await json2csvAsync(tempArray, {
        expandArrayObjects: true,
      });
      const file = `${dir}/fichero${count + 1}.csv`;

      console.log(`Creating file: ${file}`);
      fs.writeFileSync(file, csv, { flag: "w" });
    }

    console.log("Done creating the files");
  } catch (error) {
    console.log(error.message || "Not able to process files");
  }
};

const prepareFolder = async (folder: string): Promise<string> => {
  try {
    const dirOutputs = path.join(__dirname, "../outputs/");
    const dirFile = dirOutputs + folder;

    // Create the outputs folder if it does not exists
    if (!fs.existsSync(dirOutputs)) {
      console.log(`Creating folder ${dirOutputs}`);
      fs.mkdirSync(dirOutputs);
    }

    // Delete the api folder if it exists to start clean
    if (fs.existsSync(dirFile)) {
      console.log(`Deleting folder ${dirFile}`);
      fs.rmdirSync(dirFile, { recursive: true });
    }

    // create a brand new empty api folder
    console.log(`Creating folder ${dirFile}`);
    fs.mkdirSync(dirFile);

    return dirFile;
  } catch (error) {
    throw { message: error.message || `not able to make the dir ${folder}` };
  }
};
