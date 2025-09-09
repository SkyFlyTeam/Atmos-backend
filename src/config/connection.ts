import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import Estacao from '../models/Estacao';
import TipoParametro from '../models/TipoParametro';
import EstacaoTipoParametro from '../models/EstacaoTipoParametro';
import ValorCapturado from '../models/ValorCapturado';
import Usuario from '../models/Usuario';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // mudar senha
  host: process.env.DB_HOST, // colocar domínio
  port: parseInt(process.env.DB_PORT), // colocar porta
  dialect: 'postgres', // colocar o banco de dados utilizado
  models: [Estacao, TipoParametro, EstacaoTipoParametro, ValorCapturado, Usuario],  // Adicionar os modelos a serem trabalhados aqui
});

export default sequelize;