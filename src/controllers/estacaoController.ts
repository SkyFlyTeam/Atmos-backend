import { Request, Response } from 'express'
import Estacao from '../models/Estacao'

export const estacaoController = {
    save: async (req: Request, res: Response) => {
        try {
            const novoRegistro = await Estacao.create(req.body)
            return res.status(201).json(novoRegistro)
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao salvar usuário', detalhes: error.message })
        }
    },

    findAll: async (req: Request, res: Response) => {
        try {
            const registros = await Estacao.findAll()
            if(!registros.length){
                return res.status(404).json({ error: 'Registros não encontrado' })
            }
            return res.status(200).json(registros)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar registros', detalhes: error.message})
        }
    },

    findById: async (req: Request, res: Response) => {
        try {
            const { pk } = req.params
            const registro = await Estacao.findByPk(pk)
            if(registro) {
                return res.status(200).json(registro)
            }
            return res.status(404).json({ error: 'Registro não encontrado' })
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar registro', detalhes: error.message})
        }
    },

    update: async (req: Request, res: Response) => {
        try {
        const { pk } = req.params;

        const registro = await Estacao.findByPk(pk)
        if(!registro){
            return res.status(404).json({ error: 'Registro não encontrado' })
        }

        const atualizado = await Estacao.update(req.body, { where: { pk } });

        if (atualizado) {
            const registro = await Estacao.findByPk(pk);
            return res.json(registro);
        }

        } catch (error: any) {
        return res.status(400).json({ error: 'Erro ao atualizar registro', detalhes: error.message });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
        const { pk } = req.params;

        const deletado = await Estacao.destroy({ where: { pk } });

        if (deletado) {
            return res.status(204).send();
        }

        return res.status(404).json({ error: 'Registro não encontrado' });
        } catch (error: any) {
        return res.status(400).json({ error: 'Erro ao deletar registro', detalhes: error.message });
        }
    }
} 