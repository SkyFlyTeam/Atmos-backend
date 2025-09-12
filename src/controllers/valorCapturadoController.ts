import { Request, Response } from 'express'
import ValorCapturado from '../models/ValorCapturado'
import EstacaoTipoParametro from '../models/EstacaoTipoParametro'
import Estacao from '../models/Estacao'

export const valorCapturadoController = {
    save: async (req: Request, res: Response) => {
        try {
            const { unixtime, Parametros_pk, valor, estacao_id } = req.body
            
            // Verificar se o parâmetro existe
            const parametro = await EstacaoTipoParametro.findByPk(Parametros_pk)
            if (!parametro) {
                return res.status(404).json({ error: 'Parâmetro não encontrado' })
            }
            
            // Verificar se a estação existe
            const estacao = await Estacao.findByPk(estacao_id)
            if (!estacao) {
                return res.status(404).json({ error: 'Estação não encontrada' })
            }
            
            // Verificar se a estação do parâmetro corresponde à estação fornecida
            if (parametro.estacao_est_pk !== estacao_id) {
                return res.status(400).json({ error: 'A estação do parâmetro não corresponde à estação fornecida' })
            }
            
            const novoValor = await ValorCapturado.create(req.body)
            return res.status(201).json(novoValor)
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao salvar valor capturado', detalhes: error.message })
        }
    },

    findAll: async (req: Request, res: Response) => {
        try {
            const valores = await ValorCapturado.findAll({
                include: [
                    {
                        model: EstacaoTipoParametro,
                        as: 'parametro',
                        include: [
                            {
                                model: Estacao,
                                as: 'estacao'
                            },
                            {
                                model: require('../models/TipoParametro').default,
                                as: 'tipoParametro'
                            }
                        ]
                    },
                    {
                        model: Estacao,
                        as: 'estacao'
                    }
                ],
                order: [['unixtime', 'DESC']]
            })
            
            if(!valores.length){
                return res.status(404).json({ error: 'Valores não encontrados' })
            }
            return res.status(200).json(valores)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar valores', detalhes: error.message})
        }
    },

    findById: async (req: Request, res: Response) => {
        try {
            const { pk } = req.params
            const valor = await ValorCapturado.findByPk(pk, {
                include: [
                    {
                        model: EstacaoTipoParametro,
                        as: 'parametro',
                        include: [
                            {
                                model: Estacao,
                                as: 'estacao'
                            },
                            {
                                model: require('../models/TipoParametro').default,
                                as: 'tipoParametro'
                            }
                        ]
                    },
                    {
                        model: Estacao,
                        as: 'estacao'
                    }
                ]
            })
            
            if(valor) {
                return res.status(200).json(valor)
            }
            return res.status(404).json({ error: 'Valor não encontrado' })
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar valor', detalhes: error.message})
        }
    },

    findByParametro: async (req: Request, res: Response) => {
        try {
            const { parametro_pk } = req.params
            const valores = await ValorCapturado.findAll({
                where: { Parametros_pk: parametro_pk },
                include: [
                    {
                        model: EstacaoTipoParametro,
                        as: 'parametro',
                        include: [
                            {
                                model: Estacao,
                                as: 'estacao'
                            },
                            {
                                model: require('../models/TipoParametro').default,
                                as: 'tipoParametro'
                            }
                        ]
                    },
                    {
                        model: Estacao,
                        as: 'estacao'
                    }
                ],
                order: [['unixtime', 'DESC']]
            })
            
            if(!valores.length){
                return res.status(404).json({ error: 'Nenhum valor encontrado para este parâmetro' })
            }
            return res.status(200).json(valores)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar valores do parâmetro', detalhes: error.message})
        }
    },

    findByEstacao: async (req: Request, res: Response) => {
        try {
            const { estacao_id } = req.params
            const valores = await ValorCapturado.findAll({
                where: { estacao_id },
                include: [
                    {
                        model: EstacaoTipoParametro,
                        as: 'parametro',
                        include: [
                            {
                                model: Estacao,
                                as: 'estacao'
                            },
                            {
                                model: require('../models/TipoParametro').default,
                                as: 'tipoParametro'
                            }
                        ]
                    },
                    {
                        model: Estacao,
                        as: 'estacao'
                    }
                ],
                order: [['unixtime', 'DESC']]
            })
            
            if(!valores.length){
                return res.status(404).json({ error: 'Nenhum valor encontrado para esta estação' })
            }
            return res.status(200).json(valores)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar valores da estação', detalhes: error.message})
        }
    },

    findByDateRange: async (req: Request, res: Response) => {
        try {
            const { start_date, end_date, estacao_id, parametro_pk } = req.query
            
            let whereClause: any = {}
            
            if (start_date && end_date) {
                whereClause.unixtime = {
                    [require('sequelize').Op.between]: [new Date(start_date as string), new Date(end_date as string)]
                }
            }
            
            if (estacao_id) {
                whereClause.estacao_id = estacao_id
            }
            
            if (parametro_pk) {
                whereClause.Parametros_pk = parametro_pk
            }
            
            const valores = await ValorCapturado.findAll({
                where: whereClause,
                include: [
                    {
                        model: EstacaoTipoParametro,
                        as: 'parametro',
                        include: [
                            {
                                model: Estacao,
                                as: 'estacao'
                            },
                            {
                                model: require('../models/TipoParametro').default,
                                as: 'tipoParametro'
                            }
                        ]
                    },
                    {
                        model: Estacao,
                        as: 'estacao'
                    }
                ],
                order: [['unixtime', 'DESC']]
            })
            
            if(!valores.length){
                return res.status(404).json({ error: 'Nenhum valor encontrado para os filtros aplicados' })
            }
            return res.status(200).json(valores)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar valores por período', detalhes: error.message})
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const { pk } = req.params;
            const { unixtime, Parametros_pk, valor, estacao_id } = req.body

            const valorCapturado = await ValorCapturado.findByPk(pk)
            if(!valorCapturado){
                return res.status(404).json({ error: 'Valor não encontrado' })
            }

            // Verificar se o parâmetro existe
            if (Parametros_pk) {
                const parametro = await EstacaoTipoParametro.findByPk(Parametros_pk)
                if (!parametro) {
                    return res.status(404).json({ error: 'Parâmetro não encontrado' })
                }
            }
            
            // Verificar se a estação existe
            if (estacao_id) {
                const estacao = await Estacao.findByPk(estacao_id)
                if (!estacao) {
                    return res.status(404).json({ error: 'Estação não encontrada' })
                }
            }

            // Verificar consistência entre parâmetro e estação
            if (Parametros_pk && estacao_id) {
                const parametro = await EstacaoTipoParametro.findByPk(Parametros_pk)
                if (parametro && parametro.estacao_est_pk !== estacao_id) {
                    return res.status(400).json({ error: 'A estação do parâmetro não corresponde à estação fornecida' })
                }
            }

            const atualizado = await ValorCapturado.update(req.body, { where: { pk } });

            if (atualizado) {
                const valorAtualizado = await ValorCapturado.findByPk(pk, {
                    include: [
                        {
                            model: EstacaoTipoParametro,
                            as: 'parametro',
                            include: [
                                {
                                    model: Estacao,
                                    as: 'estacao'
                                },
                                {
                                    model: require('../models/TipoParametro').default,
                                    as: 'tipoParametro'
                                }
                            ]
                        },
                        {
                            model: Estacao,
                            as: 'estacao'
                        }
                    ]
                });
                return res.json(valorAtualizado);
            }

        } catch (error: any) {
            return res.status(400).json({ error: 'Erro ao atualizar valor', detalhes: error.message });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { pk } = req.params;

            const deletado = await ValorCapturado.destroy({ where: { pk } });

            if (deletado) {
                return res.status(204).send();
            }

            return res.status(404).json({ error: 'Valor não encontrado' });
        } catch (error: any) {
            return res.status(400).json({ error: 'Erro ao deletar valor', detalhes: error.message });
        }
    }
}
