import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import Usuario from '../models/Usuario';
import Alerta from '../models/Alerta';
import TipoAlerta from '../models/TipoAlerta';
import TipoAlertaParametro from '../models/TipoAlertaParametro';
import TipoParametro from '../models/TipoParametro';
import Estacao from '../models/Estacao';
import EstacaoTipoParametro from '../models/EstacaoTipoParametro';
import ValorCapturado from '../models/ValorCapturado';
import Cidade from '../models/Cidade';

dotenv.config();

const sequelizeTest = new Sequelize({
  dialect: 'postgres', 
  host: process.env.TEST_DB_HOST || 'localhost',
  port: Number(process.env.TEST_DB_PORT) || 5432,
  username: process.env.TEST_DB_USER || 'postgres',
  password: process.env.TEST_DB_PASSWORD || 'root',
  database: process.env.TEST_DB_NAME || 'atmos_test',
  logging: false,
  models: [Usuario, Alerta, TipoAlerta, TipoAlertaParametro, TipoParametro, Estacao, EstacaoTipoParametro, Cidade, ValorCapturado],
});

export default sequelizeTest;