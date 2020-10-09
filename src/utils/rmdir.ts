/**
 * Class : RmDir
 * Autor : FGG
 * Fecha : 08/10/2020
 *
 * Responsabilidades de la clase:
 *
 *  vaciar un directorio con path:  pdirPath con o sin supresion de el mismo
 */
import fs from "fs";

 class RmDir {

    constructor() {

    }

    emptyDir (pdirPath : string, premoveSelf :boolean) {
      if (premoveSelf === undefined)
        premoveSelf = true;
      try { var files = fs.readdirSync(pdirPath); }
      catch(e) { return; }
      
      if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
          var filePath = pdirPath + '/' + files[i];
      
          if (fs.statSync(filePath).isFile())
            fs.unlinkSync(filePath);
          else
            this.emptyDir(filePath,false);
        }
      
        if (premoveSelf) fs.rmdirSync(pdirPath);
    };

}

const rmdir = new RmDir();
export default rmdir;
