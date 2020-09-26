// if a new json file is created, please add it below so we can dinamically use it in the app
import * as dev from "./dev.json";
import * as pre from "./pre.json";
import * as pro from "./pro.json";

const EnvironmentsArray = ["dev", "pre", "pro"]; // to check .env file
type EnvTypes = "dev" | "pre" | "pro"; // strong type for the environments

export { dev, pre, pro, EnvironmentsArray, EnvTypes };
