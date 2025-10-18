import { Request, Response } from 'express'
import { Op } from 'sequelize'
import Estacao from '../models/Estacao'
import ValorCapturado from '../models/ValorCapturado';
import EstacaoTipoParametro from '../models/EstacaoTipoParametro';
import { ParametroGrafico } from '../interfaces/dashboard/parametroGrafico';
import { formatDateTimeToString } from '../utils/formatters/dateFormatters';
import Cidade from '../models/Cidade';
import TipoParametro from '../models/TipoParametro';
import { ParametroCard } from '../interfaces/dashboard/parametroCard';

export const dashboardController = {
    getCapturedValuesFromParameters: async (req: Request, res: Response) => {
        try {
            const { cidade, estacoes, parametros, dataInicio, dataFim } = req.body;

            let cidadeEncontrada = await Cidade.findOne({ where: { pk: cidade } });

            if (cidade && !cidadeEncontrada) {
                return res.status(404).json({
                    error: 'Cidade não encontrada'
                });
            }
            
            // Filtrar estações pela cidade, se fornecida
            let estacoesFiltradas = await Estacao.findAll({
                where: cidade ? { cidadePk: cidadeEncontrada.pk } : {},
            });

            // Filtrar estações específicas, se fornecidas
            if (estacoes && estacoes.length > 0) {
                estacoesFiltradas = estacoesFiltradas.filter((estacao: Estacao) => estacoes.includes(estacao.pk));
            }

            let parametrosEstacoes: EstacaoTipoParametro[] = [];
            // Obter parâmetros das estações filtradas
            for (const estacao of estacoesFiltradas) {
                let parametrosByEstacao = await EstacaoTipoParametro.findAll({
                    where: {
                        estacao_est_pk: estacao.pk
                    },
                    include: [Estacao, TipoParametro]
                });
                parametrosEstacoes.push(...parametrosByEstacao);
            }

            // Filtrar parâmetros caso fornecidos
            if (parametros && parametros.length > 0) {
                parametrosEstacoes = parametrosEstacoes.filter((parametro: EstacaoTipoParametro) =>
                    parametros.includes(parametro.tipo_parametro_pk)
                );
            }

            // Obter valores capturados para os parâmetros filtrados dentro do intervalo de datas
            let valoresCapturadosFiltrados: ValorCapturado[] = [];
            for (const parametroEstacao of parametrosEstacoes) {
                const valoresCapturados = await ValorCapturado.findAll({
                    where: {
                        Parametros_pk: parametroEstacao.pk,
                        unixtime: {
                            [Op.between]: [dataInicio, dataFim]
                        }
                    },
                    include: [
                        {
                            model: EstacaoTipoParametro,
                            as: 'parametro',
                            include: [
                                { model: Estacao, as: 'estacao' },
                                { model: TipoParametro, as: 'tipoParametro' }
                            ]
                        }
                    ]
                });

                valoresCapturadosFiltrados.push(...valoresCapturados);
            }

            let resultado: ParametroGrafico[] = [];

            // Estruturar os dados para a resposta
            const tipoParametros = [];
            for (const parametroEstacao of parametrosEstacoes) {
                if(!tipoParametros.find(tp => tp.pk === parametroEstacao.tipo_parametro_pk)) {
                    tipoParametros.push(parametroEstacao.tipoParametro);
                }
            }
            
            for (const tipoParametro of tipoParametros) {
                // Filtrar valores por tipo de parâmetro
                const valores = valoresCapturadosFiltrados.filter(vc => 
                    vc.parametro.tipo_parametro_pk === tipoParametro.pk
                );

                // Coletar nomes únicos das estações
                const estacoesNomes = Array.from(new Set(
                    valores.map(v => v.parametro.estacao.nome)
                ));

                // Agrupar valores por datetime
                const dadosAgrupados = new Map<string, any>();
                
                for (const v of valores) {
                    const datetime = formatDateTimeToString(v.unixtime);
                    const estacaoNome = v.parametro.estacao.nome;
                    
                    if (!dadosAgrupados.has(datetime)) {
                        dadosAgrupados.set(datetime, { datetime });
                    }
                    
                    dadosAgrupados.get(datetime)[estacaoNome] = v.valor;
                }

                // Converter Map para array
                const dados = Array.from(dadosAgrupados.values());

                resultado.push({
                    tipo_parametro: `${tipoParametro.nome} (${tipoParametro.unidade})`,
                    estacoes: estacoesNomes,
                    dados: dados
                });
            }

            return res.status(200).json(resultado);
        } catch (error: any) {
            return res.status(500).json({
                error: 'Erro ao buscar registros capturados por parâmetros',
                detalhes: error.message
            });
        }
    },

    getLastCapturedValues: async (req: Request, res: Response) => {
        try {
            const { cidade, estacoes, parametros } = req.body;

            let cidadeEncontrada = await Cidade.findOne({ where: { pk: cidade } });

            if (cidade && !cidadeEncontrada) {
                return res.status(404).json({
                    error: 'Cidade não encontrada'
                });
            }
            
            // Filtrar estações pela cidade, se fornecida
            let estacoesFiltradas = await Estacao.findAll({
                where: cidade ? { cidadePk: cidadeEncontrada.pk } : {},
            });

            // Filtrar estações específicas, se fornecidas
            if (estacoes && estacoes.length > 0) {
                estacoesFiltradas = estacoesFiltradas.filter((estacao: Estacao) => estacoes.includes(estacao.pk));
            }

            let parametrosEstacoes: EstacaoTipoParametro[] = [];
            // Obter parâmetros das estações filtradas
            for (const estacao of estacoesFiltradas) {
                let parametrosByEstacao = await EstacaoTipoParametro.findAll({
                    where: {
                        estacao_est_pk: estacao.pk
                    },
                    include: [Estacao, TipoParametro]
                });
                parametrosEstacoes.push(...parametrosByEstacao);
            }

            // Filtrar parâmetros caso fornecidos
            if (parametros && parametros.length > 0) {
                parametrosEstacoes = parametrosEstacoes.filter((parametro: EstacaoTipoParametro) =>
                    parametros.includes(parametro.tipo_parametro_pk)
                );
            }

            // Obter valores capturados para os parâmetros filtrados dentro do intervalo de datas
            let valoresCapturadosFiltrados: ValorCapturado[] = [];
            for (const parametroEstacao of parametrosEstacoes) {
                const valoresCapturados = await ValorCapturado.findAll({
                    where: {
                        Parametros_pk: parametroEstacao.pk,
                    },
                    order: [['unixtime', 'DESC']], 
                    limit: 2,
                    include: [
                        {
                            model: EstacaoTipoParametro,
                            as: 'parametro',
                            include: [
                                { model: TipoParametro, as: 'tipoParametro' }
                            ]
                        }
                    ]
                });

                valoresCapturadosFiltrados.push(...valoresCapturados);
            }

            let resultado: ParametroCard[] = [];

            // Estruturar os dados para a resposta
            const tipoParametros = [];
            for (const parametroEstacao of parametrosEstacoes) {
                if(!tipoParametros.find(tp => tp.pk === parametroEstacao.tipo_parametro_pk)) {
                    tipoParametros.push(parametroEstacao.tipoParametro);
                }
            }

            for (const tipoParametro of tipoParametros) {
                // Filtrar valores por tipo de parâmetro
                const valores = valoresCapturadosFiltrados.filter(vc => 
                    vc.parametro.tipo_parametro_pk === tipoParametro.pk
                );

                // Obter o valor mais recente e o anterior
                const valorAtual = valores[0];
                const valorAnterior = valores[1];

                // Adicionar ao resultado
                resultado.push({
                    tipo_parametro: tipoParametro.nome,
                    valor_atual: valorAtual ? valorAtual.valor : null,
                    aumento: valorAnterior ? valorAtual.valor > valorAnterior.valor : null,
                });
            }

            return res.status(200).json(resultado);
        } catch (error: any) {
            return res.status(500).json({
                error: 'Erro ao buscar últimos registros capturados por parâmetros',
                detalhes: error.message
            });
        }
    }
};