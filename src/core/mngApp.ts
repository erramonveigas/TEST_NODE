// ---- Javier Sánchez 10-03-2020 ----
// -----------------------------------



export class mngApp {
  
  
    constructor() {
    }
  
  
  
    //  ----------------------------------------------------
  
    
    static getEnvironmentMode() {
        return process.env.NODE_ENV;
    }
  
  
    static getConfigFileFullPath() {
        let strConfigPath: string = "";
      
        switch( mngApp.getEnvironmentMode() ) {
            case 'pro':
                strConfigPath = "/src/config/pro.json";
                break;

            default:
            case 'dev':
            strConfigPath = "/src/config/pre.json";
                break;
        }
      
        return this.getProjectFullPath() + strConfigPath;
    }
  
  
    static getEfectiveConfigObject() {
        let strConfigFilePath = this.getConfigFileFullPath();
        //  Require config file (In Json format)
        var objConfig = require( strConfigFilePath );
      
        return objConfig;
    }
  
  
    static getProjectFullPath() {
        return process.cwd();
    }
  
  
}

// -----------------------------------