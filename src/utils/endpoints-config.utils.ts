process.env.NODE_CONFIG_DIR = './src/config'
import config from 'config';

class EndpointsConfig {

  getConfig() {
    if (config) {
      return config;
    } else {
      throw Error(`ERROR: No config file found for env ${process.env.NODE_ENV}`);
    }

  }

}

export const endpointsConfig = new EndpointsConfig();

export interface IEndpointsConfig {
  api1: API;
  api2: API;
}

export interface API {
  url: string;
}
