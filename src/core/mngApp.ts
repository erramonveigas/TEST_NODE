// ---- Javier Sánchez 10-03-2020 ----
// -----------------------------------



export class mngApp {
  
  
    constructor() {
    }
  
  
  
    //  ----------------------------------------------------
  
    
    /*
        getEnvironmentMode()
        
        Returns the environment mode:
            dev - Development
            pre -
            pro - Production
            
    */
    static getEnvironmentMode() {
        return process.env.NODE_ENV;
    }
  
  
    /*
        getConfigFileFullPath()
        
        Returns efective configuration file path.
    */
    static getConfigFileFullPath() {
        return this.getProjectFullPath() + `/src/config/${ mngApp.getEnvironmentMode() }.json`;
    }
  
  
    /*
        getEfectiveConfigObject()
        
        Returns efective configuration object.
    */
    static getEfectiveConfigObject() {
        let strConfigFilePath = this.getConfigFileFullPath();
        //  Require config file (In Json format)
        var objConfig = require( strConfigFilePath );
      
        return objConfig;
    }
  
  
    /*
        getProjectFullPath()
        
        Returns project full path.
    */
    static getProjectFullPath() {
        return process.cwd();
    }
  
  
}

// -----------------------------------