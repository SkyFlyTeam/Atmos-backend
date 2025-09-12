import { Router } from 'express';
import { tipoParametroController } from '../controllers/tipoParametroController';

const routes = Router();

routes.post('/', tipoParametroController.save);       // Criar
routes.get('/', tipoParametroController.findAll);     // Listar
routes.get('/:pk', tipoParametroController.findById);     // Listar
routes.put('/:pk', tipoParametroController.update);   // Atualizar
routes.delete('/:pk', tipoParametroController.delete); // Deletar

export default routes;
