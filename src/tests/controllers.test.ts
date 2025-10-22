import { usuarioController } from '../controllers/usuarioController'; // Importe o controlador
import Usuario from '../models/Usuario'; // Importe o modelo
import { Request, Response } from 'express';

// Mock do modelo Usuario
jest.mock('../models/Usuario', () => ({
  findAll: jest.fn(),
}));

describe('usuarioController', () => {
  describe('findAll', () => {
    it('deve retornar uma lista de usuários com sucesso', async () => {
      // Arrange: Cria um array mock de usuários
      const mockUsuarios = [
        { id: 1, nome: 'Usuario 1', email: 'usuario1@teste.com' },
        { id: 2, nome: 'Usuario 2', email: 'usuario2@teste.com' },
      ];

      // Mock do método findAll
      (Usuario.findAll as jest.Mock).mockResolvedValue(mockUsuarios);

      // Criação de um objeto mock do Request e Response
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Ação: Chama o método findAll do controlador
      await usuarioController.findAll(req, res);

      // Assert: Verifica se a resposta foi chamada com o status 200 e os dados esperados
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUsuarios);
    });

    it('deve retornar erro se houver falha ao buscar os usuários', async () => {
      // Arrange: Simula um erro
      (Usuario.findAll as jest.Mock).mockRejectedValue(new Error('Erro ao buscar usuários'));

      // Criação de um objeto mock do Request e Response
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Ação: Chama o método findAll do controlador
      await usuarioController.findAll(req, res);

      // Assert: Verifica se o status 500 e a mensagem de erro foram retornados
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Erro ao buscar registros',
        detalhes: 'Erro ao buscar usuários',
      });
    });
  });
});
