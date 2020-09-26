import { cleanEnv, str, num, makeValidator } from "envalid";
import * as config from "../config";

interface EnvObject {
  PORT: number;
  NODE_ENV: string;
}

const validateEnvVars = makeValidator((env: string) => {
  const isEnvValid = config.EnvironmentsArray.includes(env);

  if (isEnvValid) {
    return env;
  } else {
    throw new Error(
      `ooopppsss,value ${env} in .env is not valid. Make sure the configs are right`
    );
  }
});

const getEnvVars = (): EnvObject => {
  const EnvVars = cleanEnv(process.env, {
    NODE_ENV: validateEnvVars(),
    PORT: num({ default: 3000 }),
  });

  return EnvVars as EnvObject;
};

export const EnvVars = getEnvVars();
