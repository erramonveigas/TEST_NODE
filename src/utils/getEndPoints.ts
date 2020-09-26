import { EnvVars } from "../utils/validateEnv";
import * as config from "../config";

export const GetEndPoint = (data: string): string => {
  const env = EnvVars.NODE_ENV as config.EnvTypes;
  const api = data as config.ApiTypes;

  if (config[env].API_MOCS[api]?.url) {
    return config[env].API_MOCS[api].url;
  } else {
    throw { message: `cannot find ${api} param in the config file` };
  }
};
