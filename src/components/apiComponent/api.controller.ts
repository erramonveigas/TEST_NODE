
import { Request, Response } from 'express';

import { mngData } from '../../core/mngData';
import { apiUtils } from './api.utils';



class ApiController {
    private objMngData = new mngData();

    public async index(req: Request, res: Response) {
        let strApiParam: string = req.query.api.toString();
      
        try {
            await apiUtils.getSliceAndChangeFormat( strApiParam );
        } catch( error ) {
            res.json( {strStatus: "Error"} );
        }

        //res.json( req.params.api );
        res.json( req.query );
    }
}

export const apiController = new ApiController(); 
