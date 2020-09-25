import { Request, Response } from 'express';
import axios from 'axios';

import { IEndpointsConfig } from '../../utils/endpoints-config.utils';
import { storeCSVFiles } from './generate-csv.utils';
import { Item, CONSTANT } from './generate-csv.models';

type ApiError = {
    message: string,
    code: string,
    stack?: string
};
class GenerateCSVController {
    
    public async retrieveAndStoreCSV( req : Request, res: Response ) {
        const endpoints: IEndpointsConfig = req.app.get('envConfig').API_MOCS;
        const apiVersion = req.query['api'] as string;
        if (!apiVersion) {
            const errorResponse: ApiError = {
                message: 'ApiVersion is a mandatory query param',
                code: '001'
            }
            res.status(400).json(errorResponse);
        } else if(!endpoints[apiVersion as keyof IEndpointsConfig]) {
            const errorResponse: ApiError = {
                message: `API version ${apiVersion} is not valid`,
                code: '002'
            }
            res.status(404).json(errorResponse);
        } else {
            try {
                const fullOutputDir = `${CONSTANT.OUTPUT_DIR}/${apiVersion}`;
                const response = await axios.get(endpoints[apiVersion as keyof IEndpointsConfig].url);
                const items = response.data?.items;
                if ( !items ) {
                    res.status(500).send();
                } else {
                    storeCSVFiles(items, fullOutputDir);
                }
                res.status(200).json({message: "OK"});
            } catch (err) {
                const errorResponse: ApiError = {
                    message: `Unexpected error happened. Unable to store CSVs`,
                    code: '003',
                    stack: process.env.NODE_ENV === 'pro' ? null : err.stack,
                }
                res.status(500).send(errorResponse);
            }
        }
    }
}

export const generateCSVController = new GenerateCSVController(); 