// ---- Javier Sánchez 10-03-2020 ----
// -----------------------------------
var fs = require('fs');
const axios = require("axios");
const { parse } = require('json2csv');

// ---- Javier Sánchez 10-03-2020 ----
// -----------------------------------
import { mngApp } from '../core/mngApp';
// -----------------------------------



export class mngData {
  
  
    constructor() {
    }
  
  
  
    //  ----------------------------------------------------
  
    
    /*
        async readDataFromSource( strSourceUrl: string )
        
        Read content from URL.
        
        Notes:
            If it´s need read big files, its possible some other implementation like:
                https://stackoverflow.com/questions/11874096/parse-large-json-file-in-nodejs
                https://www.npmjs.com/package/JSONStream
            Actual implementation loads full file in memory.
        
        Params:
            strSourceUrl: String - Data url to get content.
        Return: Object - JSON Object readed from URL.
    */
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
  
  
    /*
        getLengthData( objData: any )
        
        Get the number of elements in a data object
        
        Params:
            objData: any - Data object with elements.
        Return: Array - Slice of arrLstData array elements.
    */
    getLengthData( objData: any ) {
        return objData.items.length;
    }
  
  
    /*
        sliceData( arrLstData: any, intStartPos: number, intNumRegisters: number )
        
        Slice / subdivide content in chunks with X number of registers.
        
        Params:
            objData: any - Data object with elements.
            intStartPos: number - Starting pos to get a slice
            intNumRegisters: number - Number of elements to put in a slice.
        Return: Array - Slice of arrLstData array elements.
    */
    sliceData( objData: any, intStartPos: number, intNumRegisters: number ) {
        let objRes: any = {};
      
        objRes = {
            items: objData.items.slice( intStartPos, (intStartPos + intNumRegisters) )
        };
      
        return objRes;
    }
  
  
    /*
        async writeDataFromParam( strPathFile: string, objData: any )
        
        Write content to file.
        
        Params:
            strPathFile: String - File path to save content.
            objData: any - Content to save in file.
        Return: any
    */
    async writeJSONDataFromParam( strPathFile: string, objData: any ) {
        let strData = await JSON.stringify( objData );
        await fs.writeFileSync( strPathFile, strData);
    }
  
  
    async writeDataFromParam( strPathFile: string, strData: any ) {
        await fs.writeFileSync( strPathFile, strData);
    }
  
    
    JsonToCsv( arrLstRegs: any, arrLstKeys: any[] ) {
        const opts = { arrLstKeys };
        let strCsv = "";

        try {
            strCsv = parse( arrLstRegs, opts);
            console.log( strCsv );
        } catch (err) {
            console.error(err);
        }
      
        return strCsv;
    }
    
  
    //  ----------------------------------------------------
  
  
    async getSliceAndChangeFormat( strApiV: string ) {
        let objFullData = {};
        var objConfig = mngApp.getEfectiveConfigObject();
        

        let strApiUrl = objConfig.API_MOCS[ strApiV ].url;
        console.log( "API url: " + objConfig.API_MOCS[ strApiV ].url );
        try {
            objFullData = await this.readDataFromSource( strApiUrl );
            //console.log( objFullData );
        } catch (error) {
            console.log("Error: an error occurred while trying to read the data from source service.");
            console.error(error);
            process.exit(-1);
        }


        let numAllDataLength = this.getLengthData( objFullData );
        let numChunksDataLength = 999;
        for( let k = 0, numChuck = 0; k < numAllDataLength; k += numChunksDataLength, numChuck++ ) {
            let objDataSlice = this.sliceData( objFullData, k, numChunksDataLength );
            console.log( objDataSlice );

            //  CREAR DIRECTORIO DENTRO DE DATA SI NO EXISTE
            //  await fs.mkdir(path);


            let strCsvContent = this.JsonToCsv(
                objDataSlice.items,
                ["index", "index_start_at", "integer", "float", "name", "surname", "fullname", "email", "bool"]
            );
            //console.log( strCsvContent );


            let strOutCSVFilePath = mngApp.getProjectFullPath() + `/src/outputs/aaa_${numChuck}.csv`;
            let strOutJSONFilePath = mngApp.getProjectFullPath() + `/src/outputs/aaa_${numChuck}.json`;

            try {
                await this.writeDataFromParam( strOutCSVFilePath, strCsvContent );
                //await this.writeJSONDataFromParam( strOutJSONFilePath, objDataSlice );
            } catch (error) {
                console.log("Error: an error occurred while trying to write the data results.");
                console.error(error);
                process.exit(-1);
            }
        }
      
    }
  
    //  ----------------------------------------------------
    
  
    /*
        async cleanDir( strFullPath: String )
        
        Delete all content of a dir path
        
        Params:
            strFullPath: String - Directory path to clean
        Return: any
    */
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