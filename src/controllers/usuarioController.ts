import { Request, Response } from 'express'
import Usuario from '../models/Usuario'

export const usuarioController = {
    save: async (req: Request, res: Response) => {
        try {
            const { nome, email, senha} = req.body

            if(!nome || !email || !senha){
                return res.status(401).json({message: 'Nome, email e senha são obrigados!'})
            }

            const novoRegistro = await Usuario.create(req.body)
            return res.status(201).json(novoRegistro)
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao salvar usuário', detalhes: error.message })
        }
    },

    findAll: async (req: Request, res: Response) => {
        try {
            const registros = await Usuario.findAll()
            if(registros){
                return res.status(200).json(registros)
            }
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar registros', detalhes: error.message})
        }
    },

    findById: async (req: Request, res: Response) => {
        try {
            let { pk } = (req.params)
            const id = parseInt(pk)
            const registro = await Usuario.findByPk(id)
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

        const registro = await Usuario.findByPk(pk)
        if(!registro){
            return res.status(404).json({ error: 'Registro não encontrado' })
        }

        const atualizado = await Usuario.update(req.body, { where: { pk } });

        if (atualizado) {
            const registro = await Usuario.findByPk(pk);
            return res.json(registro);
        }

        return res.status(404).json({ error: 'Registro não encontrado' });
        } catch (error: any) {
        return res.status(400).json({ error: 'Erro ao atualizar registro', detalhes: error.message });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
        const { pk } = req.params

        const deletado = await Usuario.destroy({ where: { pk } });

        if (deletado) {
            return res.status(204).send();
        }

        return res.status(404).json({ error: 'Registro não encontrado' });
        } catch (error: any) {
        return res.status(400).json({ error: 'Erro ao deletar registro', detalhes: error.message });
        }
    }
} 