import { Request, Response } from 'express'
import TipoAlertaParametro from '../models/TipoAlertaParametro'
import TipoAlerta from '../models/TipoAlerta'
import TipoParametro from '../models/TipoParametro'

export const tipoAlertaParametroController = {
    save: async (req: Request, res: Response) => {
        try {
            const novoRegistro = await TipoAlertaParametro.create(req.body)
            return res.status(201).json(novoRegistro)
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao salvar relacionamento tipo alerta parâmetro', detalhes: error.message })
        }
    },

    findAll: async (req: Request, res: Response) => {
        try {
            const registros = await TipoAlertaParametro.findAll({
                include: [
                    {
                        model: TipoAlerta,
                        as: 'tipoAlerta'
                    },
                    {
                        model: TipoParametro,
                        as: 'tipoParametro'
                    }
                ]
            })
            if(!registros.length){
                return res.status(404).json({ error: 'Registros não encontrados' })
            }
            return res.status(200).json(registros)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar registros', detalhes: error.message})
        }
    },

    findByTipoAlerta: async (req: Request, res: Response) => {
        try {
            const { tipoAlertaPk } = req.params
            const registros = await TipoAlertaParametro.findAll({
                where: { Tipo_Alerta_pk: tipoAlertaPk },
                include: [
                    {
                        model: TipoAlerta,
                        as: 'tipoAlerta'
                    },
                    {
                        model: TipoParametro,
                        as: 'tipoParametro'
                    }
                ]
            })
            if(!registros.length){
                return res.status(404).json({ error: 'Registros não encontrados' })
            }
            return res.status(200).json(registros)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar registros', detalhes: error.message})
        }
    },

    findByTipoParametro: async (req: Request, res: Response) => {
        try {
            const { tipoParametroPk } = req.params
            const registros = await TipoAlertaParametro.findAll({
                where: { Tipo_parametro_p: tipoParametroPk },
                include: [
                    {
                        model: TipoAlerta,
                        as: 'tipoAlerta'
                    },
                    {
                        model: TipoParametro,
                        as: 'tipoParametro'
                    }
                ]
            })
            if(!registros.length){
                return res.status(404).json({ error: 'Registros não encontrados' })
            }
            return res.status(200).json(registros)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar registros', detalhes: error.message})
        }
    },

    update: async (req: Request, res: Response) => {
        try {
        const { tipoAlertaPk, tipoParametroPk } = req.params;

        const registro = await TipoAlertaParametro.findOne({
            where: { 
                Tipo_Alerta_pk: tipoAlertaPk,
                Tipo_parametro_p: tipoParametroPk
            }
        })
        if(!registro){
            return res.status(404).json({ error: 'Registro não encontrado' })
        }

        const atualizado = await TipoAlertaParametro.update(req.body, { 
            where: { 
                Tipo_Alerta_pk: tipoAlertaPk,
                Tipo_parametro_p: tipoParametroPk
            } 
        });

        if (atualizado) {
            const registro = await TipoAlertaParametro.findOne({
                where: { 
                    Tipo_Alerta_pk: tipoAlertaPk,
                    Tipo_parametro_p: tipoParametroPk
                },
                include: [
                    {
                        model: TipoAlerta,
                        as: 'tipoAlerta'
                    },
                    {
                        model: TipoParametro,
                        as: 'tipoParametro'
                    }
                ]
            });
            return res.json(registro);
        }

        } catch (error: any) {
        return res.status(400).json({ error: 'Erro ao atualizar registro', detalhes: error.message });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
        const { tipoAlertaPk, tipoParametroPk } = req.params;

        const deletado = await TipoAlertaParametro.destroy({ 
            where: { 
                Tipo_Alerta_pk: tipoAlertaPk,
                Tipo_parametro_p: tipoParametroPk
            } 
        });

        if (deletado) {
            return res.status(204).send();
        }

        return res.status(404).json({ error: 'Registro não encontrado' });
        } catch (error: any) {
        return res.status(400).json({ error: 'Erro ao deletar registro', detalhes: error.message });
        }
    }
}

