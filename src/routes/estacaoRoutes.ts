import { Router } from 'express';
import { estacaoController } from '../controllers/estacaoController';

const routes = Router();

routes.post('/', estacaoController.save);       // Criar
routes.get('/', estacaoController.findAll);     // Listar
routes.get('/:pk', estacaoController.findById);     // Listar
routes.put('/:pk', estacaoController.update);   // Atualizar
routes.delete('/:pk', estacaoController.delete); // Deletar

export default routes;