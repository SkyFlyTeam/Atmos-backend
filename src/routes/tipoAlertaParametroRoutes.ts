import { Router } from 'express';
import { tipoAlertaParametroController } from '../controllers/tipoAlertaParametroController';

const routes = Router();

routes.post('/', tipoAlertaParametroController.save);       // Criar relacionamento
routes.get('/', tipoAlertaParametroController.findAll);     // Listar todos os relacionamentos
routes.get('/tipo-alerta/:tipoAlertaPk', tipoAlertaParametroController.findByTipoAlerta);     // Listar por tipo de alerta
routes.get('/tipo-parametro/:tipoParametroPk', tipoAlertaParametroController.findByTipoParametro);     // Listar por tipo de parâmetro
routes.put('/:tipoAlertaPk/:tipoParametroPk', tipoAlertaParametroController.update);   // Atualizar relacionamento
routes.delete('/:tipoAlertaPk/:tipoParametroPk', tipoAlertaParametroController.delete); // Deletar relacionamento

export default routes;

