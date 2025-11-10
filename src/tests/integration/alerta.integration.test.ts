import request from "supertest";
import app from "../../app"; // Seu express app
import sequelizeTest from "../../config/databaseTest";
import TipoParametro from '../../models/TipoParametro';
import TipoAlerta from '../../models/TipoAlerta';
import TipoAlertaParametro from '../../models/TipoAlertaParametro';
import ValorCapturado from '../../models/ValorCapturado';
import Alerta from '../../models/Alerta';
import Estacao from '../../models/Estacao';
import EstacaoTipoParametro from '../../models/EstacaoTipoParametro';
import Cidade from '../../models/Cidade';

describe('Alerta Integration Tests - Fluxo de Geração de Alertas', () => {
  let tipoParametro: TipoParametro;
  let estacao: Estacao;
  let estacaoTipoParametro: EstacaoTipoParametro;
  let cidade: Cidade;

  beforeAll(async () => {
    await sequelizeTest.sync({ force: true });
    
    // Criar cidade
    cidade = await Cidade.create({
      nome: 'Cidade Teste',
      uf: 'SP',
      ibgeId: 123
    });

    // Criar estação
    estacao = await Estacao.create({
      uuid: 'est-001',
      nome: 'Estação Central',
      descricao: 'Central station',
      imagem: null,
      status: true,
      lat: '-23.5505',
      long: '-46.6333',
      endereco: 'Av. Central, 1000',
      cidade_pk: cidade.pk
    });

    // Criar tipo de parâmetro
    tipoParametro = await TipoParametro.create({
      json_id: 'temp',
      nome: 'Temperatura',
      tipo: 'sensor',
      unidade: '°C',
      offset: 0,
      fator: 1
    });

    // Associar tipo de parâmetro à estação
    estacaoTipoParametro = await EstacaoTipoParametro.create({
      estacao_pk: estacao.pk,
      tipo_parametro_pk: tipoParametro.pk
    });
  });

  afterAll(async () => {
    await sequelizeTest.close();
  });

  beforeEach(async () => {
    // Limpar alertas e valores capturados antes de cada teste
    await Alerta.destroy({ where: {}, force: true });
    await ValorCapturado.destroy({ where: {}, force: true });
    await TipoAlertaParametro.destroy({ where: {}, force: true });
    await TipoAlerta.destroy({ where: {}, force: true });
  });

  describe('Caso 0: Menor que (x < p1)', () => {
    it('deve criar alerta quando valor for menor que p1', async () => {
      // Criar tipo de alerta: x < 20
      const tipoAlerta = await TipoAlerta.create({
        tipo: 'Temperatura Baixa',
        descricao: 'Alerta quando temperatura menor que 20°C',
        publica: true,
        tipo_alarme: 0,
        p1: 20.0,
        p2: null
      });

      // Associar tipo de alerta ao tipo de parâmetro
      await TipoAlertaParametro.create({
        Tipo_Alerta_pk: tipoAlerta.pk,
        Tipo_parametro_p: tipoParametro.pk
      });

      // Criar valor capturado menor que p1
      const valorCapturado = await ValorCapturado.create({
        valor: 15.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });

      // Verificar se o alerta foi criado
      const alertas = await Alerta.findAll({
        where: { valor_capturado_pk: valorCapturado.pk }
      });

      expect(alertas).toHaveLength(1);
      expect(alertas[0].tipo_alerta_pk).toBe(tipoAlerta.pk);
    });

    it('não deve criar alerta quando valor for maior ou igual a p1', async () => {
      const tipoAlerta = await TipoAlerta.create({
        tipo: 'Temperatura Baixa',
        descricao: 'Alerta quando temperatura menor que 20°C',
        publica: true,
        tipo_alarme: 0,
        p1: 20.0,
        p2: null
      });

      await TipoAlertaParametro.create({
        Tipo_Alerta_pk: tipoAlerta.pk,
        Tipo_parametro_p: tipoParametro.pk
      });

      // Valor igual a p1
      const valorCapturado1 = await ValorCapturado.create({
        valor: 20.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });

      let alertas = await Alerta.findAll({
        where: { valor_capturado_pk: valorCapturado1.pk }
      });
      expect(alertas).toHaveLength(0);

      // Valor maior que p1
      const valorCapturado2 = await ValorCapturado.create({
        valor: 25.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });

      alertas = await Alerta.findAll({
        where: { valor_capturado_pk: valorCapturado2.pk }
      });
      expect(alertas).toHaveLength(0);
    });
  });

  describe('Caso 1: Intervalo entre (p1 < x < p2)', () => {
    it('deve criar alerta quando valor estiver entre p1 e p2', async () => {
      // Criar tipo de alerta: 20 < x < 30
      const tipoAlerta = await TipoAlerta.create({
        tipo: 'Temperatura Moderada',
        descricao: 'Alerta quando temperatura entre 20°C e 30°C',
        publica: true,
        tipo_alarme: 1,
        p1: 20.0,
        p2: 30.0
      });

      await TipoAlertaParametro.create({
        Tipo_Alerta_pk: tipoAlerta.pk,
        Tipo_parametro_p: tipoParametro.pk
      });

      // Criar valor entre p1 e p2
      const valorCapturado = await ValorCapturado.create({
        valor: 25.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });

      const alertas = await Alerta.findAll({
        where: { valor_capturado_pk: valorCapturado.pk }
      });

      expect(alertas).toHaveLength(1);
      expect(alertas[0].tipo_alerta_pk).toBe(tipoAlerta.pk);
    });

    it('não deve criar alerta quando valor for igual ou fora do intervalo', async () => {
      const tipoAlerta = await TipoAlerta.create({
        tipo: 'Temperatura Moderada',
        descricao: 'Alerta quando temperatura entre 20°C e 30°C',
        publica: true,
        tipo_alarme: 1,
        p1: 20.0,
        p2: 30.0
      });

      await TipoAlertaParametro.create({
        Tipo_Alerta_pk: tipoAlerta.pk,
        Tipo_parametro_p: tipoParametro.pk
      });

      // Valor igual a p1
      const vc1 = await ValorCapturado.create({
        valor: 20.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });
      expect(await Alerta.count({ where: { valor_capturado_pk: vc1.pk } })).toBe(0);

      // Valor igual a p2
      const vc2 = await ValorCapturado.create({
        valor: 30.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });
      expect(await Alerta.count({ where: { valor_capturado_pk: vc2.pk } })).toBe(0);

      // Valor menor que p1
      const vc3 = await ValorCapturado.create({
        valor: 15.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });
      expect(await Alerta.count({ where: { valor_capturado_pk: vc3.pk } })).toBe(0);

      // Valor maior que p2
      const vc4 = await ValorCapturado.create({
        valor: 35.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });
      expect(await Alerta.count({ where: { valor_capturado_pk: vc4.pk } })).toBe(0);
    });
  });

  describe('Caso 2: Maior que (x > p1)', () => {
    it('deve criar alerta quando valor for maior que p1', async () => {
      // Criar tipo de alerta: x > 30
      const tipoAlerta = await TipoAlerta.create({
        tipo: 'Temperatura Alta',
        descricao: 'Alerta quando temperatura maior que 30°C',
        publica: true,
        tipo_alarme: 2,
        p1: 30.0,
        p2: null
      });

      await TipoAlertaParametro.create({
        Tipo_Alerta_pk: tipoAlerta.pk,
        Tipo_parametro_p: tipoParametro.pk
      });

      // Criar valor maior que p1
      const valorCapturado = await ValorCapturado.create({
        valor: 35.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });

      const alertas = await Alerta.findAll({
        where: { valor_capturado_pk: valorCapturado.pk }
      });

      expect(alertas).toHaveLength(1);
      expect(alertas[0].tipo_alerta_pk).toBe(tipoAlerta.pk);
    });

    it('não deve criar alerta quando valor for menor ou igual a p1', async () => {
      const tipoAlerta = await TipoAlerta.create({
        tipo: 'Temperatura Alta',
        descricao: 'Alerta quando temperatura maior que 30°C',
        publica: true,
        tipo_alarme: 2,
        p1: 30.0,
        p2: null
      });

      await TipoAlertaParametro.create({
        Tipo_Alerta_pk: tipoAlerta.pk,
        Tipo_parametro_p: tipoParametro.pk
      });

      // Valor igual a p1
      const vc1 = await ValorCapturado.create({
        valor: 30.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });
      expect(await Alerta.count({ where: { valor_capturado_pk: vc1.pk } })).toBe(0);

      // Valor menor que p1
      const vc2 = await ValorCapturado.create({
        valor: 25.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });
      expect(await Alerta.count({ where: { valor_capturado_pk: vc2.pk } })).toBe(0);
    });
  });

  describe('Caso 3: Diferente de (x != p1)', () => {
    it('deve criar alerta quando valor for diferente de p1', async () => {
      // Criar tipo de alerta: x != 25
      const tipoAlerta = await TipoAlerta.create({
        tipo: 'Temperatura Anormal',
        descricao: 'Alerta quando temperatura diferente de 25°C',
        publica: true,
        tipo_alarme: 3,
        p1: 25.0,
        p2: null
      });

      await TipoAlertaParametro.create({
        Tipo_Alerta_pk: tipoAlerta.pk,
        Tipo_parametro_p: tipoParametro.pk
      });

      // Criar valor diferente de p1
      const valorCapturado = await ValorCapturado.create({
        valor: 20.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });

      const alertas = await Alerta.findAll({
        where: { valor_capturado_pk: valorCapturado.pk }
      });

      expect(alertas).toHaveLength(1);
      expect(alertas[0].tipo_alerta_pk).toBe(tipoAlerta.pk);
    });

    it('não deve criar alerta quando valor for igual a p1', async () => {
      const tipoAlerta = await TipoAlerta.create({
        tipo: 'Temperatura Anormal',
        descricao: 'Alerta quando temperatura diferente de 25°C',
        publica: true,
        tipo_alarme: 3,
        p1: 25.0,
        p2: null
      });

      await TipoAlertaParametro.create({
        Tipo_Alerta_pk: tipoAlerta.pk,
        Tipo_parametro_p: tipoParametro.pk
      });

      // Valor igual a p1
      const valorCapturado = await ValorCapturado.create({
        valor: 25.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });

      const alertas = await Alerta.findAll({
        where: { valor_capturado_pk: valorCapturado.pk }
      });

      expect(alertas).toHaveLength(0);
    });
  });

  describe('Caso 4: Igual a (x == p1)', () => {
    it('deve criar alerta quando valor for igual a p1', async () => {
      // Criar tipo de alerta: x == 25
      const tipoAlerta = await TipoAlerta.create({
        tipo: 'Temperatura Ideal',
        descricao: 'Alerta quando temperatura igual a 25°C',
        publica: true,
        tipo_alarme: 4,
        p1: 25.0,
        p2: null
      });

      await TipoAlertaParametro.create({
        Tipo_Alerta_pk: tipoAlerta.pk,
        Tipo_parametro_p: tipoParametro.pk
      });

      // Criar valor igual a p1
      const valorCapturado = await ValorCapturado.create({
        valor: 25.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });

      const alertas = await Alerta.findAll({
        where: { valor_capturado_pk: valorCapturado.pk }
      });

      expect(alertas).toHaveLength(1);
      expect(alertas[0].tipo_alerta_pk).toBe(tipoAlerta.pk);
    });

    it('não deve criar alerta quando valor for diferente de p1', async () => {
      const tipoAlerta = await TipoAlerta.create({
        tipo: 'Temperatura Ideal',
        descricao: 'Alerta quando temperatura igual a 25°C',
        publica: true,
        tipo_alarme: 4,
        p1: 25.0,
        p2: null
      });

      await TipoAlertaParametro.create({
        Tipo_Alerta_pk: tipoAlerta.pk,
        Tipo_parametro_p: tipoParametro.pk
      });

      // Valor diferente de p1
      const vc1 = await ValorCapturado.create({
        valor: 20.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });
      expect(await Alerta.count({ where: { valor_capturado_pk: vc1.pk } })).toBe(0);

      const vc2 = await ValorCapturado.create({
        valor: 30.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });
      expect(await Alerta.count({ where: { valor_capturado_pk: vc2.pk } })).toBe(0);
    });
  });

  describe('Múltiplos Alertas', () => {
    it('deve criar múltiplos alertas quando valor atender múltiplas condições', async () => {
      // Criar dois tipos de alerta diferentes
      const tipoAlerta1 = await TipoAlerta.create({
        tipo: 'Temperatura Alta',
        descricao: 'Alerta quando temperatura maior que 30°C',
        publica: true,
        tipo_alarme: 2,
        p1: 30.0,
        p2: null
      });

      const tipoAlerta2 = await TipoAlerta.create({
        tipo: 'Temperatura Diferente de Ideal',
        descricao: 'Alerta quando temperatura diferente de 25°C',
        publica: true,
        tipo_alarme: 3,
        p1: 25.0,
        p2: null
      });

      await TipoAlertaParametro.create({
        Tipo_Alerta_pk: tipoAlerta1.pk,
        Tipo_parametro_p: tipoParametro.pk
      });

      await TipoAlertaParametro.create({
        Tipo_Alerta_pk: tipoAlerta2.pk,
        Tipo_parametro_p: tipoParametro.pk
      });

      // Criar valor que atende ambas condições (35 > 30 e 35 != 25)
      const valorCapturado = await ValorCapturado.create({
        valor: 35.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });

      const alertas = await Alerta.findAll({
        where: { valor_capturado_pk: valorCapturado.pk }
      });

      expect(alertas).toHaveLength(2);
      const tiposAlertaCriados = alertas.map(a => a.tipo_alerta_pk).sort();
      expect(tiposAlertaCriados).toEqual([tipoAlerta1.pk, tipoAlerta2.pk].sort());
    });
  });

  describe('Valores Extremos', () => {
    it('deve lidar com valores negativos', async () => {
      const tipoAlerta = await TipoAlerta.create({
        tipo: 'Temperatura Negativa',
        descricao: 'Alerta quando temperatura menor que 0°C',
        publica: true,
        tipo_alarme: 0,
        p1: 0.0,
        p2: null
      });

      await TipoAlertaParametro.create({
        Tipo_Alerta_pk: tipoAlerta.pk,
        Tipo_parametro_p: tipoParametro.pk
      });

      const valorCapturado = await ValorCapturado.create({
        valor: -10.0,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });

      const alertas = await Alerta.findAll({
        where: { valor_capturado_pk: valorCapturado.pk }
      });

      expect(alertas).toHaveLength(1);
    });

    it('deve lidar com valores decimais precisos', async () => {
      const tipoAlerta = await TipoAlerta.create({
        tipo: 'Temperatura Específica',
        descricao: 'Alerta quando temperatura igual a 25.5°C',
        publica: true,
        tipo_alarme: 4,
        p1: 25.5,
        p2: null
      });

      await TipoAlertaParametro.create({
        Tipo_Alerta_pk: tipoAlerta.pk,
        Tipo_parametro_p: tipoParametro.pk
      });

      const valorCapturado = await ValorCapturado.create({
        valor: 25.5,
        unixtime: new Date(),
        Parametros_pk: estacaoTipoParametro.pk,
        estacao_id: estacao.pk
      });

      const alertas = await Alerta.findAll({
        where: { valor_capturado_pk: valorCapturado.pk }
      });

      expect(alertas).toHaveLength(1);
    });
  });
});