import { Router } from 'express';
import { monthlyDumpController } from './components/monthly-dump/monthly-dump.controller';

class RegisterRoutes {

    public router: Router = Router();

    constructor() {
         this.config();
    }
    //Modificar el routing
    config(): void {
        this.router.get('/', monthlyDumpController.index);
    }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;