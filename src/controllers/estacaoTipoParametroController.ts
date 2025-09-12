import { Request, Response } from 'express'
import EstacaoTipoParametro from '../models/EstacaoTipoParametro'
import Estacao from '../models/Estacao'
import TipoParametro from '../models/TipoParametro'

export const estacaoTipoParametroController = {
    save: async (req: Request, res: Response) => {
        try {
            const { estacao_est_pk, tipo_parametro_pk } = req.body
            
            // Normalizar para arrays
            const estacoesIds = Array.isArray(estacao_est_pk) ? estacao_est_pk : [estacao_est_pk]
            const tiposParametroIds = Array.isArray(tipo_parametro_pk) ? tipo_parametro_pk : [tipo_parametro_pk]
            
            // Verificar se pelo menos um dos parâmetros foi fornecido
            if (!estacao_est_pk || !tipo_parametro_pk) {
                return res.status(400).json({ 
                    error: 'Parâmetros estacao_est_pk e tipo_parametro_pk são obrigatórios' 
                })
            }
            
            // Verificar se todas as estações existem
            const estacoes = await Estacao.findAll({
                where: { pk: estacoesIds }
            })
            
            if (estacoes.length !== estacoesIds.length) {
                return res.status(404).json({ error: 'Uma ou mais estações não encontradas' })
            }
            
            // Verificar se todos os tipos de parâmetros existem
            const tiposParametros = await TipoParametro.findAll({
                where: { pk: tiposParametroIds }
            })
            
            if (tiposParametros.length !== tiposParametroIds.length) {
                return res.status(404).json({ error: 'Um ou mais tipos de parâmetros não encontrados' })
            }
            
            // Criar todas as combinações possíveis
            let relacoesParaCriar = []
            for (const estId of estacoesIds) {
                for (const tpId of tiposParametroIds) {
                    relacoesParaCriar.push({
                        estacao_est_pk: estId,
                        tipo_parametro_pk: tpId
                    })
                }
            }
            
            // Verificar se alguma relação já existe
            const relacoesExistentes = await EstacaoTipoParametro.findAll({
                where: {
                    [require('sequelize').Op.or]: relacoesParaCriar.map(rel => ({
                        estacao_est_pk: rel.estacao_est_pk,
                        tipo_parametro_pk: rel.tipo_parametro_pk
                    }))
                }
            })
            
            if (relacoesExistentes.length > 0) {
                return res.status(409).json({ 
                    error: 'Uma ou mais relações já existem', 
                    relacoesExistentes: relacoesExistentes.map(rel => ({
                        estacao_est_pk: rel.estacao_est_pk,
                        tipo_parametro_pk: rel.tipo_parametro_pk
                    }))
                })
            }
            
            // Criar todas as relações
            const novasRelacoes = await EstacaoTipoParametro.bulkCreate(relacoesParaCriar)
            
            return res.status(201).json({
                message: `${novasRelacoes.length} relação(ões) criada(s) com sucesso`,
                relacoes: novasRelacoes
            })
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao criar relação estação-tipo parâmetro', detalhes: error.message })
        }
    },

    findAll: async (req: Request, res: Response) => {
        try {
            const relacoes = await EstacaoTipoParametro.findAll({
                include: [
                    {
                        model: Estacao,
                        as: 'estacao'
                    },
                    {
                        model: TipoParametro,
                        as: 'tipoParametro'
                    }
                ]
            })
            
            if(!relacoes.length){
                return res.status(404).json({ error: 'Relações não encontradas' })
            }
            return res.status(200).json(relacoes)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar relações', detalhes: error.message})
        }
    },

    findById: async (req: Request, res: Response) => {
        try {
            const { pk } = req.params
            const relacao = await EstacaoTipoParametro.findByPk(pk, {
                include: [
                    {
                        model: Estacao,
                        as: 'estacao'
                    },
                    {
                        model: TipoParametro,
                        as: 'tipoParametro'
                    }
                ]
            })
            
            if(relacao) {
                return res.status(200).json(relacao)
            }
            return res.status(404).json({ error: 'Relação não encontrada' })
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar relação', detalhes: error.message})
        }
    },

    findByEstacao: async (req: Request, res: Response) => {
        try {
            const { estacao_pk } = req.params
            const relacoes = await EstacaoTipoParametro.findAll({
                where: { estacao_est_pk: estacao_pk },
                include: [
                    {
                        model: TipoParametro,
                        as: 'tipoParametro'
                    }
                ]
            })
            
            if(!relacoes.length){
                return res.status(404).json({ error: 'Nenhuma relação encontrada para esta estação' })
            }
            return res.status(200).json(relacoes)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar relações da estação', detalhes: error.message})
        }
    },

    findByTipoParametro: async (req: Request, res: Response) => {
        try {
            const { tipo_parametro_pk } = req.params
            const relacoes = await EstacaoTipoParametro.findAll({
                where: { tipo_parametro_pk },
                include: [
                    {
                        model: Estacao,
                        as: 'estacao'
                    }
                ]
            })
            
            if(!relacoes.length){
                return res.status(404).json({ error: 'Nenhuma relação encontrada para este tipo de parâmetro' })
            }
            return res.status(200).json(relacoes)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar relações do tipo de parâmetro', detalhes: error.message})
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const { pk } = req.params;
            const { estacao_est_pk, tipo_parametro_pk } = req.body

            const relacao = await EstacaoTipoParametro.findByPk(pk)
            if(!relacao){
                return res.status(404).json({ error: 'Relação não encontrada' })
            }

            // Verificar se a nova estação existe
            if (estacao_est_pk) {
                const estacao = await Estacao.findByPk(estacao_est_pk)
                if (!estacao) {
                    return res.status(404).json({ error: 'Estação não encontrada' })
                }
            }
            
            // Verificar se o novo tipo de parâmetro existe
            if (tipo_parametro_pk) {
                const tipoParametro = await TipoParametro.findByPk(tipo_parametro_pk)
                if (!tipoParametro) {
                    return res.status(404).json({ error: 'Tipo de parâmetro não encontrado' })
                }
            }

            // Verificar se a nova relação já existe (excluindo a atual)
            if (estacao_est_pk && tipo_parametro_pk) {
                const relacaoExistente = await EstacaoTipoParametro.findOne({
                    where: {
                        estacao_est_pk,
                        tipo_parametro_pk,
                        pk: { [require('sequelize').Op.ne]: pk }
                    }
                })
                
                if (relacaoExistente) {
                    return res.status(409).json({ error: 'Relação entre estação e tipo de parâmetro já existe' })
                }
            }

            const atualizado = await EstacaoTipoParametro.update(req.body, { where: { pk } });

            if (atualizado) {
                const relacaoAtualizada = await EstacaoTipoParametro.findByPk(pk, {
                    include: [
                        {
                            model: Estacao,
                            as: 'estacao'
                        },
                        {
                            model: TipoParametro,
                            as: 'tipoParametro'
                        }
                    ]
                });
                return res.json(relacaoAtualizada);
            }

        } catch (error: any) {
            return res.status(400).json({ error: 'Erro ao atualizar relação', detalhes: error.message });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { pk } = req.params;

            const deletado = await EstacaoTipoParametro.destroy({ where: { pk } });

            if (deletado) {
                return res.status(204).send();
            }

            return res.status(404).json({ error: 'Relação não encontrada' });
        } catch (error: any) {
            return res.status(400).json({ error: 'Erro ao deletar relação', detalhes: error.message });
        }
    },

    deleteByEstacaoAndTipoParametro: async (req: Request, res: Response) => {
        try {
            const { estacao_pk, tipo_parametro_pk } = req.params;

            const deletado = await EstacaoTipoParametro.destroy({ 
                where: { 
                    estacao_est_pk: estacao_pk,
                    tipo_parametro_pk: tipo_parametro_pk
                } 
            });

            if (deletado) {
                return res.status(204).send();
            }

            return res.status(404).json({ error: 'Relação não encontrada' });
        } catch (error: any) {
            return res.status(400).json({ error: 'Erro ao deletar relação', detalhes: error.message });
        }
    }
}
