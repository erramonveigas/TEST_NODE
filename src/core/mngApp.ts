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
        return this.getProjectFullPath() + `/src/config/${ mngApp.getEnvironmentMode() }.json`;
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