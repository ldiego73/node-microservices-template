import { Sequelize, Dialect } from 'sequelize';
import { readEnv } from '@micro/country-config';
import { Logger } from '@micro/logger';

const l = Logger.create('database');
const env = readEnv();

export const db = new Sequelize({
  database: env.db.name,
  dialect: env.db.type as Dialect,
  storage: env.db.storage,
});

if (!env.production) {
  l.info('Creando...');
  db.sync({ force: true }).then(() => {
    l.info('Tables created!!!');
  });
}
