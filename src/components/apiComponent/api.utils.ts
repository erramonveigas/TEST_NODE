var fs = require('fs');
var rimraf = require('rimraf');

import { Request, Response } from 'express';

import { mngData } from './../../core/mngData';
import { mngApp } from './../../core/mngApp';



class ApiUtils {
    private objMngData = new mngData();


    /*
        getSliceAndChangeFormat( strApiV: string )
        
        Main logic method to slice full data in chunks (blocks of X registers),
        change data format from json to csv and save theese chunks in files.
        
        Parameters: 
            strApiV: string - tag API url to use from configuration activelly.
            
        Returns:
            none
    */
    async getSliceAndChangeFormat( strApiV: string ) {
        let objMngData = new mngData();
        let objFullData = {};
        let objConfig = mngApp.getEfectiveConfigObject();
      
        // Destination path of the files loaded from .env file
        let strOutPath = process.cwd() + "/" + process.env.DATA_PATH + strApiV + "/";
        

        try {
            return await rimraf.sync( strOutPath );
            //file removed
        } catch(err) {
            console.error(err)
        }
      

        try {
            if( !fs.existsSync( strOutPath ) ) {
                await fs.promises.mkdir( strOutPath );
            }
        } catch (error) {
            console.log("Error: an error occurred while trying to create data directory.");
            console.error(error);
            process.exit(-1);
        }
      

        let strApiUrl = objConfig.API_MOCS[ strApiV ].url;
        console.log( "API url: " + objConfig.API_MOCS[ strApiV ].url );
        try {
            objFullData = await objMngData.readDataFromSource( strApiUrl );
            //console.log( objFullData );
        } catch (error) {
            console.log("Error: an error occurred while trying to read the data from source service.");
            console.error(error);
            process.exit(-1);
        }
      

        let numAllDataLength = this.objMngData.getLengthData( objFullData );
        let numChunksDataLength = 999;
        for( let k = 0, numChuck = 0; k < numAllDataLength; k += numChunksDataLength, numChuck++ ) {
            let objDataSlice = objMngData.sliceData( objFullData, k, numChunksDataLength );
            //console.log( objDataSlice );


            let strCsvContent = objMngData.JsonToCsv(
                objDataSlice.items,
                ["index", "index_start_at", "integer", "float", "name", "surname", "fullname", "email", "bool"]
            );
            //console.log( strCsvContent );


            let strOutCSVFilePath = strOutPath + `/aaa_${numChuck}.csv`;
            let strOutJSONFilePath = strOutPath + `/aaa_${numChuck}.json`;

            try {
                await objMngData.writeDataFromParam( strOutCSVFilePath, strCsvContent );
                //await objMngData.writeJSONDataFromParam( strOutJSONFilePath, objDataSlice );
            } catch (error) {
                console.log("Error: an error occurred while trying to write the data results.");
                console.error(error);
                process.exit(-1);
            }
        }
    }
  
  
  
}

export const apiUtils = new ApiUtils(); 
