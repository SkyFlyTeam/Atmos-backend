import { Router } from 'express';
import { estacaoTipoParametroController } from '../controllers/estacaoTipoParametroController';

const routes = Router();

routes.post('/', estacaoTipoParametroController.save);       // Criar relação
routes.get('/', estacaoTipoParametroController.findAll);     // Listar todas as relações
routes.get('/:pk', estacaoTipoParametroController.findById); // Buscar relação por ID
routes.get('/estacao/:estacao_pk', estacaoTipoParametroController.findByEstacao); // Buscar relações por estação
routes.get('/tipo-parametro/:tipo_parametro_pk', estacaoTipoParametroController.findByTipoParametro); // Buscar relações por tipo de parâmetro
routes.put('/:pk', estacaoTipoParametroController.update);   // Atualizar relação
routes.delete('/:pk', estacaoTipoParametroController.delete); // Deletar relação por ID
routes.delete('/estacao/:estacao_pk/tipo-parametro/:tipo_parametro_pk', estacaoTipoParametroController.deleteByEstacaoAndTipoParametro); // Deletar relação específica

export default routes;
