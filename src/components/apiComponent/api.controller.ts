
import { Request, Response } from 'express';

import { mngData } from '../../core/mngData';
import { apiUtils } from './api.utils';



class ApiController {
    private objMngData = new mngData();

    public async index(req: Request, res: Response) {
        let objMngData = new mngData();
        let strApiParam: string = req.query.api.toString();
      
        try {
            await objMngData.getSliceAndChangeFormat( strApiParam );
        } catch( error ) {
            res.json( {strStatus: "Error"} );
        }

        //res.json( req.params.api );
        res.json( req.query );
    }
}

export const apiController = new ApiController(); 
