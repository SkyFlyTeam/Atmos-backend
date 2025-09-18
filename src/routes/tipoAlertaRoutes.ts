import { Router } from 'express';
import { tipoAlertaController } from '../controllers/tipoAlertaController';

const routes = Router();

routes.post('/', tipoAlertaController.save);       // Criar
routes.get('/', tipoAlertaController.findAll);     // Listar
routes.get('/:pk', tipoAlertaController.findById);     // Listar por ID
routes.put('/:pk', tipoAlertaController.update);   // Atualizar
routes.delete('/:pk', tipoAlertaController.delete); // Deletar

export default routes;

