import { Router } from 'express';
import { indexController } from './components/index.controller';
import { apiController } from './components/api.controller';

class RegisterRoutes {

    public router: Router = Router();

    constructor() {
         this.config();
    }
    config(): void {
        //  Javier Sánchez 10-03-2020 - Filter controllers by params not implemented
        // -----------------------------------
        this.router.get('/', apiController.index);    //  Manage all / requests but need be implemented to mmanage only ?api=api1
        // -----------------------------------
      
        this.router.get('/', indexController.index);
    }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;