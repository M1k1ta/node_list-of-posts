import { Sequelize } from 'sequelize-typescript';
import { models } from '../models';
import 'dotenv/config';

const database = process.env.DATABASE;
const username = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;

export const dbinit = () => new Sequelize(
  `${database}://${username}:${password}.${host}`, 
  {
    models,
    dialectOptions: {
      ssl: true,
    },
  },
);
