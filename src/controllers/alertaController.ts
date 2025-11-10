import { Request, Response } from 'express'
import TipoAlertaParametro from '../models/TipoAlertaParametro'
import TipoAlerta from '../models/TipoAlerta'
import Alerta from '../models/Alerta'
import ValorCapturado from '../models/ValorCapturado'

export const alertaController = {
    save: async (req: Request, res: Response) => {
        try {
            const novoRegistro = await Alerta.create(req.body)
            return res.status(201).json(novoRegistro)
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao salvar alerta', detalhes: error.message })
        }
    },

    findAll: async (req: Request, res: Response) => {
        try {
            const registros = await Alerta.findAll({
                include: [
                    {
                        model: TipoAlerta,
                        as: 'tipoAlerta'
                    },
                    {
                        model: ValorCapturado,
                        as: 'valorCapturado'
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
            const registros = await Alerta.findAll({
                where: { tipo_alerta_pk: tipoAlertaPk },
                include: [
                    {
                        model: TipoAlerta,
                        as: 'tipoAlerta'
                    },
                    {
                        model: ValorCapturado,
                        as: 'valorCapturado'
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

    findByValorCapturado: async (req: Request, res: Response) => {
        try {
            const { valorCapturadoPk } = req.params
            const registros = await Alerta.findAll({
                where: { valor_capturado_pk: valorCapturadoPk },
                include: [
                    {
                        model: TipoAlerta,
                        as: 'tipoAlerta'
                    },
                    {
                        model: ValorCapturado,
                        as: 'valorCapturado'
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
        const { tipoAlertaPk, valorCapturadoPk } = req.params;

        const registro = await Alerta.findOne({
            where: { 
                tipo_alerta_pk: tipoAlertaPk,
                valor_capturado_pk: valorCapturadoPk
            }
        })
        if(!registro){
            return res.status(404).json({ error: 'Registro não encontrado' })
        }

        // Corrigir aqui: trocar TipoAlertaParametro por Alerta
        const atualizado = await Alerta.update(req.body, { 
            where: { 
                tipo_alerta_pk: tipoAlertaPk,
                valor_capturado_pk: valorCapturadoPk
            } 
        });

        if (atualizado) {
            const registro = await Alerta.findOne({
                where: { 
                    tipo_alerta_pk: tipoAlertaPk,
                    valor_capturado_pk: valorCapturadoPk
                },
                include: [
                    {
                        model: TipoAlerta,
                        as: 'tipoAlerta'
                    },
                    {
                        model: ValorCapturado,
                        as: 'valorCapturado'
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
        const { tipoAlertaPk, valorCapturadoPk } = req.params;

        const deletado = await Alerta.destroy({ 
            where: { 
                tipo_alerta_pk: tipoAlertaPk,
                valor_capturado_pk: valorCapturadoPk
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

