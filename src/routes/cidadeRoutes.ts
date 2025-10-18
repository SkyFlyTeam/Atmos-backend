import { Router } from 'express';
import { cidadeController } from '../controllers/cidadeController';

const routes = Router();

routes.get('/', cidadeController.findAll);

export default routes;