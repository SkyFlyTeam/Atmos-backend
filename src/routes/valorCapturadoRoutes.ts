import { Router } from 'express';
import { valorCapturadoController } from '../controllers/valorCapturadoController';

const routes = Router();

routes.post('/', valorCapturadoController.save);       // Criar valor capturado
routes.get('/', valorCapturadoController.findAll);     // Listar todos os valores
routes.get('/:pk', valorCapturadoController.findById); // Buscar valor por ID
routes.get('/parametro/:parametro_pk', valorCapturadoController.findByParametro); // Buscar valores por parâmetro
routes.get('/estacao/:estacao_id', valorCapturadoController.findByEstacao); // Buscar valores por estação
routes.get('/filtros/periodo', valorCapturadoController.findByDateRange); // Buscar valores por período e filtros
routes.put('/:pk', valorCapturadoController.update);   // Atualizar valor
routes.delete('/:pk', valorCapturadoController.delete); // Deletar valor

export default routes;
