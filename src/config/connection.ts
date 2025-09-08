import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // mudar senha
  host: process.env.DB_HOST, // colocar domínio
  port: parseInt(process.env.DB_PORT), // colocar porta
  dialect: 'mysql', // colocar o banco de dados utilizado
  models: [],  // Adicionar os modelos a serem trabalhados aqui
});

export default sequelize;