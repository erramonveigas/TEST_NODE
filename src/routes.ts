import { Router } from 'express';
import { indexController } from './components/index.controller';
import { apiController } from './components/api.controller';

class RegisterRoutes {

    public router: Router = Router();

    constructor() {
         this.config();
    }
    config(): void {
        this.router.get('/', indexController.index);
        this.router.get('/?api=:api', apiController.index);
    }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;