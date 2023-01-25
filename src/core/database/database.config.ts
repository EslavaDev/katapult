import * as dotenv from 'dotenv';
import { Dialect, Options } from 'sequelize';
import { IDatabaseConfigAttributes } from './interface/dbConfig.interface';

dotenv.config();

export const databaseConfig: Options = {
  dialect: process.env.DB_DIALECT as Dialect,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
};

export const databaseConfigTest: Options = {
  dialect: process.env.DB_DIALECT as Dialect,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME_TEST,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
};
