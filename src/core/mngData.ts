// ---- Javier Sánchez 10-03-2020 ----
// -----------------------------------
var fs = require('fs');
const axios = require("axios");
const { parse } = require('json2csv');
var rimraf = require('rimraf');


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
        async writeJSONDataFromParam( strPathFile: string, objData: any )
        
        Write JSON content to file.
        
        Params:
            strPathFile: String - File path to save content.
            objData: any - Content to save in file.
        Return: any
    */
    async writeJSONDataFromParam( strPathFile: string, objData: any ) {
        let strData = await JSON.stringify( objData );
        await fs.writeFileSync( strPathFile, strData);
    }
  
  
    /*
        async writeDataFromParam( strPathFile: string, objData: any )
        
        Write text content to file.
        
        Params:
            strPathFile: String - File path to save content.
            strData: string - Content to save in file.
        Return: any
    */
    async writeDataFromParam( strPathFile: string, strData: string ) {
        await fs.writeFileSync( strPathFile, strData);
    }
  
    
    /*
        JsonToCsv( arrLstRegs: any, arrLstKeys: any[] )
        
        Convert JSON array to CSV data format
        
        Parameters:
            arrLstRegs: any[] - Array of registers.
            arrLstKeys: any[] - Array of fields to create CSV. (CSV columns)
    */
    JsonToCsv( arrLstRegs: any[], arrLstKeys: any[] ) {
        const opts = { arrLstKeys };
        let strCsv = "";

        try {
            strCsv = parse( arrLstRegs, opts);
            //console.log( strCsv );
        } catch (err) {
            console.error(err);
        }
      
        return strCsv;
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

                console.log( "Deleting: " + strFilePath );

                try {
                    return await rimraf.sync( strFilePath );
                    //file removed
                } catch(err) {
                    console.error(err)
                }
            }
        });
    }
  
  
}