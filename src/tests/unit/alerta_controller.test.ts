import { alertaController } from '../../controllers/alertaController';
import Alerta from '../../models/Alerta';
import TipoAlerta from '../../models/TipoAlerta';
import ValorCapturado from '../../models/ValorCapturado';
import { Request, Response } from 'express';

jest.mock('../../models/Alerta');
jest.mock('../../models/TipoAlerta');
jest.mock('../../models/ValorCapturado');

describe('alertaController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('deve criar um novo alerta com sucesso', async () => {
      const mockAlerta = {
        tipo_alerta_pk: 1,
        valor_capturado_pk: 2,
        data: '2025-11-05T12:00:00Z',
      };

      req.body = mockAlerta;
      (Alerta.create as jest.Mock).mockResolvedValue(mockAlerta);

      await alertaController.save(req as Request, res as Response);

      expect(Alerta.create).toHaveBeenCalledWith(mockAlerta);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockAlerta);
    });

    it('deve retornar erro 400 ao falhar na criação', async () => {
      req.body = {};
      (Alerta.create as jest.Mock).mockRejectedValue(new Error('Erro de validação'));

      await alertaController.save(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Erro ao salvar alerta',
        detalhes: 'Erro de validação',
      });
    });
  });

  describe('findAll', () => {
    it('deve retornar uma lista de alertas com sucesso', async () => {
      const mockAlertas = [
        {
          tipo_alerta_pk: 1,
          valor_capturado_pk: 2,
          data: '2025-11-05T12:00:00Z',
          tipoAlerta: { pk: 1, tipo: "alarme 1", descricao: "descricao alarme 1", tipo_alarme: 1, publica: true, p1: 10.5, p2: 20.5 },
          valorCapturado: { pk: 2, valor: 12.34, Parametros_pk: 1, estacao_id: 1, unixtime: '2025-11-05T12:00:00Z' }
        }
      ];

      (Alerta.findAll as jest.Mock).mockResolvedValue(mockAlertas);

      await alertaController.findAll(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAlertas);
    });

    it('deve retornar 404 quando não houver registros', async () => {
      (Alerta.findAll as jest.Mock).mockResolvedValue([]);

      await alertaController.findAll(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Registros não encontrados' });
    });

    it('deve retornar 500 em caso de erro ao buscar os registros', async () => {
      (Alerta.findAll as jest.Mock).mockRejectedValue(new Error('Erro ao buscar registros'));

      await alertaController.findAll(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Erro ao buscar registros',
        detalhes: 'Erro ao buscar registros',
      });
    });
  });

  describe('findByTipoAlerta', () => {
    it('deve retornar alertas filtrados por tipo de alerta', async () => {
      const mockAlertas = [
        {
          tipo_alerta_pk: 1,
          valor_capturado_pk: 2,
          data: '2025-11-05T12:00:00Z',
          tipoAlerta: { pk: 1, tipo: "alarme 1", descricao: "descricao alarme 1", tipo_alarme: 1, publica: true, p1: 10.5, p2: 20.5 },
          valorCapturado: { pk: 2, valor: 12.34, Parametros_pk: 1, estacao_id: 1, unixtime: '2025-11-05T12:00:00Z' }
        }
      ];

      req.params = { tipoAlertaPk: '1' };
      (Alerta.findAll as jest.Mock).mockResolvedValue(mockAlertas);

      await alertaController.findByTipoAlerta(req as Request, res as Response);

      expect(Alerta.findAll).toHaveBeenCalledWith({
        where: { tipo_alerta_pk: '1' },
        include: expect.any(Array)
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAlertas);
    });

    it('deve retornar 404 quando não encontrar registros', async () => {
      req.params = { tipoAlertaPk: '999' };
      (Alerta.findAll as jest.Mock).mockResolvedValue([]);

      await alertaController.findByTipoAlerta(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Registros não encontrados' });
    });

    it('deve retornar 500 em caso de erro', async () => {
      req.params = { tipoAlertaPk: '1' };
      (Alerta.findAll as jest.Mock).mockRejectedValue(new Error('Erro no banco'));

      await alertaController.findByTipoAlerta(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Erro ao buscar registros',
        detalhes: 'Erro no banco',
      });
    });
  });

  describe('findByValorCapturado', () => {
    it('deve retornar alertas filtrados por valor capturado', async () => {
      const mockAlertas = [
        {
          tipo_alerta_pk: 1,
          valor_capturado_pk: 2,
          data: '2025-11-05T12:00:00Z',
          tipoAlerta: { pk: 1, tipo: "alarme 1", descricao: "descricao alarme 1", tipo_alarme: 1, publica: true, p1: 10.5, p2: 20.5 },
          valorCapturado: { pk: 2, valor: 12.34, Parametros_pk: 1, estacao_id: 1, unixtime: '2025-11-05T12:00:00Z' }
        }
      ];

      req.params = { valorCapturadoPk: '2' };
      (Alerta.findAll as jest.Mock).mockResolvedValue(mockAlertas);

      await alertaController.findByValorCapturado(req as Request, res as Response);

      expect(Alerta.findAll).toHaveBeenCalledWith({
        where: { valor_capturado_pk: '2' },
        include: expect.any(Array)
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAlertas);
    });

    it('deve retornar 404 quando não encontrar registros', async () => {
      req.params = { valorCapturadoPk: '999' };
      (Alerta.findAll as jest.Mock).mockResolvedValue([]);

      await alertaController.findByValorCapturado(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Registros não encontrados' });
    });

    it('deve retornar 500 em caso de erro', async () => {
      req.params = { valorCapturadoPk: '2' };
      (Alerta.findAll as jest.Mock).mockRejectedValue(new Error('Erro no banco'));

      await alertaController.findByValorCapturado(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Erro ao buscar registros',
        detalhes: 'Erro no banco',
      });
    });
  });

  describe('update', () => {
    it('deve atualizar um alerta com sucesso', async () => {
      const mockAlerta = {
          tipo_alerta_pk: 1,
          valor_capturado_pk: 2,
          data: '2025-11-05T12:00:00Z',
          tipoAlerta: { pk: 1, tipo: "alarme 1", descricao: "descricao alarme 1", tipo_alarme: 1, publica: true, p1: 10.5, p2: 20.5 },
          valorCapturado: { pk: 2, valor: 12.34, Parametros_pk: 1, estacao_id: 1, unixtime: '2025-11-05T12:00:00Z' }
        }

      req.params = { tipoAlertaPk: '1', valorCapturadoPk: '2' };
      req.body = { data: '2025-11-06T12:00:00Z' };

      (Alerta.findOne as jest.Mock)
        .mockResolvedValueOnce(mockAlerta)
        .mockResolvedValueOnce({ ...mockAlerta, data: '2025-11-06T12:00:00Z' });
      (Alerta.update as jest.Mock).mockResolvedValue([1]);

      await alertaController.update(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        tipo_alerta_pk: 1,
        valor_capturado_pk: 2
      }));
    });

    it('deve retornar 404 quando o registro não existe', async () => {
      req.params = { tipoAlertaPk: '999', valorCapturadoPk: '999' };
      req.body = { data: '2025-11-06T12:00:00Z' };

      (Alerta.findOne as jest.Mock).mockResolvedValue(null);

      await alertaController.update(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Registro não encontrado' });
    });

    it('deve retornar 400 em caso de erro na atualização', async () => {
      req.params = { tipoAlertaPk: '1', valorCapturadoPk: '2' };
      req.body = { data: '2025-11-06T12:00:00Z' };

      (Alerta.findOne as jest.Mock).mockResolvedValue({ tipo_alerta_pk: 1 });
      (Alerta.update as jest.Mock).mockRejectedValue(new Error('Erro na atualização'));

      await alertaController.update(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Erro ao atualizar registro',
        detalhes: 'Erro na atualização',
      });
    });
  });

  describe('delete', () => {
    it('deve deletar um alerta com sucesso', async () => {
      req.params = { tipoAlertaPk: '1', valorCapturadoPk: '2' };
      (Alerta.destroy as jest.Mock).mockResolvedValue(1);

      await alertaController.delete(req as Request, res as Response);

      expect(Alerta.destroy).toHaveBeenCalledWith({
        where: {
          tipo_alerta_pk: '1',
          valor_capturado_pk: '2'
        }
      });
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('deve retornar 404 quando o registro não existe', async () => {
      req.params = { tipoAlertaPk: '999', valorCapturadoPk: '999' };
      (Alerta.destroy as jest.Mock).mockResolvedValue(0);

      await alertaController.delete(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Registro não encontrado' });
    });

    it('deve retornar 400 em caso de erro ao deletar', async () => {
      req.params = { tipoAlertaPk: '1', valorCapturadoPk: '2' };
      (Alerta.destroy as jest.Mock).mockRejectedValue(new Error('Erro ao deletar'));

      await alertaController.delete(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Erro ao deletar registro',
        detalhes: 'Erro ao deletar',
      });
    });
  });
});