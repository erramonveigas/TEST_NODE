import { EnvVars } from "../utils/validateEnv";
import * as config from "../config";

interface EndPoints {
  api1: { url: string };
  api2: { url: string };
}

export const GetEndPoints = (): EndPoints => {
  const env: config.EnvTypes = EnvVars.NODE_ENV as config.EnvTypes;

  return config[env].API_MOCS;
};
