import { Sequelize, Dialect } from 'sequelize';
import { readEnv } from '@micro/countries-config';

const env = readEnv();

export const db = new Sequelize({
  database: env.db.name,
  dialect: env.db.type as Dialect,
  storage: env.db.storage,
  logging: false,
});
