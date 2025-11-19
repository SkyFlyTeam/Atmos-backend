import sequelize from '../config/connection';
import Cidade from '../models/Cidade';
import Estacao from '../models/Estacao';
import TipoParametro from '../models/TipoParametro';
import EstacaoTipoParametro from '../models/EstacaoTipoParametro';
import ValorCapturado from '../models/ValorCapturado';
import TipoAlerta from '../models/TipoAlerta';
import TipoAlertaParametro from '../models/TipoAlertaParametro';
import Alerta from '../models/Alerta';

async function seedAlerts() {
  try {
    await sequelize.sync();

    const [cidade] = await Cidade.findOrCreate({
      where: { nome: 'Seed City' },
      defaults: { ibgeId: 9999999, nome: 'Seed City', uf: 'SC' }
    });

    const estacoesData = [
      { uuid: 'seed-est-001', nome: 'Seed Estação 1', descricao: 'Estação criada pelo seed de alertas', imagem: null, status: true, lat: '-23.0000', long: '-46.0000', endereco: 'Rua Seed 1', cidadePk: cidade.pk },
      { uuid: 'seed-est-002', nome: 'Seed Estação 2', descricao: 'Estação criada pelo seed de alertas', imagem: null, status: true, lat: '-23.1000', long: '-46.1000', endereco: 'Rua Seed 2', cidadePk: cidade.pk }
    ];

    const estacoes = [] as Estacao[];
    for (const e of estacoesData) {
      const [est] = await Estacao.findOrCreate({ where: { uuid: e.uuid }, defaults: e });
      estacoes.push(est);
    }

    const parametrosData = [
      { json_id: 'seed_temp', nome: 'Temperatura Seed', tipo: 'float', unidade: '°C', alarme: 100, offset: 0, fator: 1, polinomio: null },
      { json_id: 'seed_hum', nome: 'Umidade Seed', tipo: 'float', unidade: '%', alarme: 100, offset: 0, fator: 1, polinomio: null },
      { json_id: 'seed_qtd', nome: 'Quantidade Seed', tipo: 'float', unidade: 'u', alarme: 100, offset: 0, fator: 1, polinomio: null }
    ];

    const parametros = [] as TipoParametro[];
    for (const p of parametrosData) {
      const [param] = await TipoParametro.findOrCreate({ where: { json_id: p.json_id }, defaults: p });
      parametros.push(param);
    }

    const etps: EstacaoTipoParametro[] = [];
    for (const est of estacoes) {
      for (const param of parametros) {
        const [etp] = await EstacaoTipoParametro.findOrCreate({
          where: { estacao_est_pk: est.pk, tipo_parametro_pk: param.pk },
          defaults: { estacao_est_pk: est.pk, tipo_parametro_pk: param.pk }
        });
        etps.push(etp);
      }
    }

    const tiposAlertaData = [
      { tipo: 'Temperatura alta', descricao: 'Temperatura alta (maior que p1)', publica: true, tipo_alarme: 2, p1: 50, p2: null },
      { tipo: 'Umidade baixa', descricao: 'Umidade baixa (menor que p1)', publica: true, tipo_alarme: 0, p1: 20, p2: null },
      { tipo: 'Chuva forte', descricao: 'Quantidade dentro do intervalo', publica: false, tipo_alarme: 1, p1: 10, p2: 20 }
    ];

    const tiposAlerta: TipoAlerta[] = [];
    for (const ta of tiposAlertaData) {
      const [tipo] = await TipoAlerta.findOrCreate({ where: { tipo: ta.tipo }, defaults: ta });
      tiposAlerta.push(tipo);
    }

    for (let i = 0; i < tiposAlerta.length; i++) {
      const tipo = tiposAlerta[i];
      const param = parametros[i];
      await TipoAlertaParametro.findOrCreate({
        where: { Tipo_Alerta_pk: tipo.pk, Tipo_parametro_p: param.pk },
        defaults: { Tipo_Alerta_pk: tipo.pk, Tipo_parametro_p: param.pk }
      });
    }

    const createdValores: ValorCapturado[] = [];
    const now = new Date();
    for (let i = 0; i < 6; i++) {
      const etp = etps[i % etps.length];
      const estId = etp.estacao_est_pk;
      const valor = 5 + i * 10 + Math.random();
      const vc = await ValorCapturado.create({
        unixtime: new Date(now.getTime() - i * 60000),
        Parametros_pk: etp.pk,
        valor,
        estacao_id: estId,
      });
      createdValores.push(vc);
    }

    const createdAlertas: Alerta[] = [];
    for (let i = 0; i < 6; i++) {
      const tipo = tiposAlerta[i % tiposAlerta.length];
      const valor = createdValores[i];
      const [alerta] = await Alerta.findOrCreate({
        where: { tipo_alerta_pk: tipo.pk, valor_capturado_pk: valor.pk },
        defaults: {
          tipo_alerta_pk: tipo.pk,
          valor_capturado_pk: valor.pk,
          data: new Date(new Date().getTime() - i * 1000),
        }
      });
      createdAlertas.push(alerta);
    }

    console.log(`Seed Alerts: created ${estacoes.length} stations, ${parametros.length} parametros, ${tiposAlerta.length} tiposAlerta, ${createdValores.length} valores, ${createdAlertas.length} alertas.`);

  } catch (error) {
    console.error('Error seeding alerts:', error);
  } finally {
    await sequelize.close();
  }
}

seedAlerts().catch(console.error);
