
import { Request, Response } from 'express';

import { mngData } from '../core/mngData';



class ApiController {
    private objMngData = new mngData();

    public async index(req: Request, res: Response) {
        let objMngData = new mngData();
        await objMngData.getSliceAndChangeFormat( req.params.api );

        res.json( req.params.api );
    }
}

export const apiController = new ApiController(); 
