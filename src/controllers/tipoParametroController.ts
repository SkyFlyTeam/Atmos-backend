import { Request, Response } from 'express'
import TipoParametro from '../models/TipoParametro'

export const tipoParametroController = {
    save: async (req: Request, res: Response) => {
        try {
            const novoRegistro = await TipoParametro.create(req.body)
            return res.status(201).json(novoRegistro)
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao salvar tipo de parâmetro', detalhes: error.message })
        }
    },

    findAll: async (req: Request, res: Response) => {
        try {
            const registros = await TipoParametro.findAll()
            if(!registros.length){
                return res.status(404).json({ error: 'Registros não encontrados' })
            }
            return res.status(200).json(registros)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar registros', detalhes: error.message})
        }
    },

    findById: async (req: Request, res: Response) => {
        try {
            const { pk } = req.params
            const registro = await TipoParametro.findByPk(pk)
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

        const registro = await TipoParametro.findByPk(pk)
        if(!registro){
            return res.status(404).json({ error: 'Registro não encontrado' })
        }

        const atualizado = await TipoParametro.update(req.body, { where: { pk } });

        if (atualizado) {
            const registro = await TipoParametro.findByPk(pk);
            return res.json(registro);
        }

        } catch (error: any) {
        return res.status(400).json({ error: 'Erro ao atualizar registro', detalhes: error.message });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
        const { pk } = req.params;

        const deletado = await TipoParametro.destroy({ where: { pk } });

        if (deletado) {
            return res.status(204).send();
        }

        return res.status(404).json({ error: 'Registro não encontrado' });
        } catch (error: any) {
        return res.status(400).json({ error: 'Erro ao deletar registro', detalhes: error.message });
        }
    }
}
