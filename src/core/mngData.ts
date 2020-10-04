// ---- Javier Sánchez 10-03-2020 ----
// -----------------------------------
var fs = require('fs');
const axios = require("axios");


export class mngData {
  
  
    constructor() {
    }
  
  
  
    //  ----------------------------------------------------
  
    
    async readDataFromSource( strSourceUrl: string ) {      
        let arrLstData = [];
      
        try {
            const response = await axios.get( strSourceUrl );
            arrLstData = response.data;
        } catch (error) {
            console.log(error);
        }
      
        return arrLstData;
    }
  
  
    sliceData( arrLstData: any, intStartPos: number, intNumRegisters: number ) {
        let arrLstRes = [];
      
        for( let k = 0; (k < intNumRegisters)&&(k < arrLstData.length); k++) {
            arrLstRes[ k ] = arrLstData[ (k + intStartPos) ];
        }
      
        return arrLstRes;
    }
  
  
    async writeDataFromParam( strPathFile: string, objData: any ) {
        let data = await JSON.stringify( objData );
        await fs.writeFileSync( strPathFile, data);
    }
  
    //  ----------------------------------------------------
    
  
    async cleanDir( strFullPath: String ) {
        fs.readdir( strFullPath, async function( err: any, arrLstFiles: any ) {
            for (var i=0; i < arrLstFiles.length; i++) {
                let strFilePath: string = strFullPath + arrLstFiles[i];

                console.log( "Deleting file: " + strFilePath );

                try {
                    await fs.unlinkSync( strFilePath );
                    //file removed
                } catch(err) {
                    console.error(err)
                }
            }
        });
    }
  
  
}