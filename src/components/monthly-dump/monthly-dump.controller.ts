import { Request, Response } from 'express';
import { apiMocs} from '../../utils/api-mocs.utils';
import { dump } from './monthly-dump.utils';

class MonthlyDumpController {
    public async index(req: Request, res: Response) {
        try {
            const amProperties = apiMocs.getProperties();
            const api = req.query['api'] as string;
            if(!api || amProperties[api] === undefined){
                throw "Invalid api request parameter";
            }else{
                await dump(api, amProperties[api].url);
            }
            res.status(200).send({success: "Monthly dump done"});
        } catch (err) {
            res.status(500).send({error: err});
        }    
    }
}

export const monthlyDumpController = new MonthlyDumpController(); 