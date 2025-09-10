import { Router } from 'express';
import { usuarioController } from '../controllers/usuarioController';

const routes = Router();

routes.post('/', usuarioController.save);       // Criar
routes.get('/', usuarioController.findAll);     // Listar
routes.get('/:pk', usuarioController.findById);     // Listar
routes.put('/:pk', usuarioController.update);   // Atualizar
routes.delete('/:pk', usuarioController.delete); // Deletar

export default routes;