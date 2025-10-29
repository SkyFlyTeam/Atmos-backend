import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import Usuario from '../models/Usuario';

dotenv.config();

const sequelizeTest = new Sequelize({
  dialect: 'postgres', 
  host: process.env.TEST_DB_HOST || 'localhost',
  port: Number(process.env.TEST_DB_PORT) || 5432,
  username: process.env.TEST_DB_USER || 'postgres',
  password: process.env.TEST_DB_PASSWORD || 'root',
  database: process.env.TEST_DB_NAME || 'atmos_test',
  logging: false,
  models: [Usuario],
});

export default sequelizeTest;