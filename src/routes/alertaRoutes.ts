import { Router } from 'express';
import { alertaController } from '../controllers/alertaController';

const routes = Router();

routes.post('/', alertaController.save);       // Criar relacionamento
routes.get('/', alertaController.findAll);     // Listar todos os relacionamentos
routes.get('/tipo-alerta/:tipoAlertaPk', alertaController.findByTipoAlerta);     // Listar por tipo de alerta
routes.get('/valor-capturado/:valorCapturadoPk', alertaController.findByValorCapturado);     // Listar por valor capturado
routes.put('/:tipoAlertaPk/:valorCapturadoPk', alertaController.update);   // Atualizar relacionamento
routes.delete('/:tipoAlertaPk/:valorCapturadoPk', alertaController.delete); // Deletar relacionamento

export default routes;

