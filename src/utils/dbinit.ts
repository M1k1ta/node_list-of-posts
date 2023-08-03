import { Sequelize } from 'sequelize-typescript';
import { models } from '../models';
import 'dotenv/config';

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

export const dbinit = () => new Sequelize(
  URL,
  {
    models,
    dialectOptions: {
      ssl: true,
    },
  },
);
