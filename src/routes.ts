import { Router } from 'express';
import { indexController } from './components/index.controller';
import { generateCSVController } from './components/generate-csv/generate-csv.controller';
class RegisterRoutes {

    public router: Router = Router();

    constructor() {
         this.config();
    }
    config(): void {
        this.router.get('/', generateCSVController.retrieveAndStoreCSV);
        this.router.get('/', indexController.index);
    }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;