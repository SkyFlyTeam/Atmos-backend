import sequelize from '../config/connection';
import Cidade from '../models/Cidade';
import Estacao from '../models/Estacao';
import TipoParametro from '../models/TipoParametro';
import EstacaoTipoParametro from '../models/EstacaoTipoParametro';
import ValorCapturado from '../models/ValorCapturado';

async function seed() {
  await sequelize.sync({ force: true });

  // Create Cidades
  const cidades = await Cidade.bulkCreate([
    {
      ibgeId: 3550308,
      nome: 'São Paulo',
      uf: 'SP',
    },
    {
      ibgeId: 3304557,
      nome: 'Rio de Janeiro',
      uf: 'RJ',
    },
    {
      ibgeId: 3106200,
      nome: 'Belo Horizonte',
      uf: 'MG',
    },
  ]);

  // Create Estacoes with cidade relationship
  const estacoes = await Estacao.bulkCreate([
    {
      uuid: 'est-001',
      nome: 'Estação Central',
      descricao: 'Central station',
      imagem: null,
      status: true,
      lat: '-23.5505',
      long: '-46.6333',
      endereco: 'Av. Central, 1000',
      cidadePk: cidades[0].pk,
    },
    {
      uuid: 'est-002',
      nome: 'Estação Norte',
      descricao: 'North station',
      imagem: null,
      status: true,
      lat: '-23.5000',
      long: '-46.6000',
      endereco: 'Rua Norte, 200',
      cidadePk: cidades[0].pk,
    },
    {
      uuid: 'est-003',
      nome: 'Estação Sul',
      descricao: 'South station',
      imagem: null,
      status: false,
      lat: '-23.6000',
      long: '-46.7000',
      endereco: 'Av. Sul, 300',
      cidadePk: cidades[1].pk,
    },
  ]);

  // Create TipoParametros
  const parametros = await TipoParametro.bulkCreate([
    { json_id: 'temp', nome: 'Temperatura', tipo: 'float', unidade: '°C', alarme: 40, offset: 0, fator: 1, polinomio: null },
    { json_id: 'hum', nome: 'Umidade', tipo: 'float', unidade: '%', alarme: 90, offset: 0, fator: 1, polinomio: null },
    { json_id: 'press', nome: 'Pressão', tipo: 'float', unidade: 'hPa', alarme: 1050, offset: 0, fator: 1, polinomio: null },
  ]);

  // Create EstacaoTipoParametro associations
  const estacaoTipoParametros: EstacaoTipoParametro[] = [];
  for (const estacao of estacoes) {
    for (const parametro of parametros) {
      const etp = await EstacaoTipoParametro.create({
        estacao_est_pk: estacao.pk,
        tipo_parametro_pk: parametro.pk,
      });
      estacaoTipoParametros.push(etp);
    }
  }

  // Create ValorCapturado for each EstacaoTipoParametro
  const now = new Date();
  for (const etp of estacaoTipoParametros) {
    for (let i = 0; i < 10; i++) {
      await ValorCapturado.create({
        unixtime: new Date(now.getTime() - i * 3600 * 1000),
        Parametros_pk: etp.pk,
        valor: Math.random() * 100,
        estacao_id: etp.estacao_est_pk,
      });
    }
  }

  console.log('Database seeded successfully!');
  await sequelize.close();
}

seed().catch(console.error);
