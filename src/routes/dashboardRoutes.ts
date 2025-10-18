import { Router } from 'express';
import { dashboardController } from '../controllers/dashboardController';

const routes = Router();

routes.post('/parametros-graficos', dashboardController.getCapturedValuesFromParameters);     
routes.post('/parametros-card', dashboardController.getLastCapturedValues);  

export default routes;