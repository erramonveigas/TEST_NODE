/**
 * Class : ReadConfigFile
 * Autor : FGG
 * Fecha : 08/10/2020
 *
 * Responsabilidades de la clase:
 *
 *  leer los ficheros de configuracion segun el enviroement
 */

import path from "path";
//interface de los datos de config - control estructura fichero
import IApiMocs from '../models/iapimocs';


class ReadConfigFile {

  private Api1Url: string;
  private Api2Url: string; 
  
  constructor() {
  }

  getApi1Url(){
    return this.Api1Url;
  }

  getApi2Url(){
    return this.Api2Url;
  }
  
  setApi1Url(pvalue:string){
    this.Api1Url=pvalue;
  }

  setApi2Url(pvalue:string){
    this.Api2Url=pvalue;
  }
  
  // handle error
  handlerror(pErr:string) {
    console.log('ERROR',pErr)
  }

  /** read configuration regarding environnement */
  readConfig(pModeEnv:string):IApiMocs {
    try {
      var vconfig : any;    
      let strFullPath=path.join(__dirname,'../../src/config/');
      let strConfigFile=strFullPath+`${pModeEnv}.json`;
      var vconfig = require(strConfigFile);
      return vconfig;        
    } catch (error) {
      this.handlerror(error);
    }
  }

  /** parse  APIs urls to class properties */
  ParseConfigFile(pApiMocs:IApiMocs){
   this.setApi1Url(pApiMocs.API_MOCS.api1.url);
   this.setApi2Url(pApiMocs.API_MOCS.api2.url);
  }

  getConfigFile(pModeEnv:string){
    this.ParseConfigFile(this.readConfig(pModeEnv));
  }

}

const readConfigFile = new ReadConfigFile();
export default readConfigFile;
