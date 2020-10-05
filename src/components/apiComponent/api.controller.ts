import { Request, Response } from 'express';
import fs from 'fs';

import { apiUtils } from './api.utils';



class ApiController {

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
