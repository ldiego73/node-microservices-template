import { Sequelize, Dialect } from 'sequelize';
import { DB, PRODUCTION } from '@micro/country-config';
import { Logger } from '@micro/logger';

const l = Logger.create('database');

export const db = new Sequelize({
  database: DB.NAME,
  dialect: DB.TYPE as Dialect,
  storage: DB.STORAGE,
});

if (!PRODUCTION) {
  db.sync({ force: true }).then(() => {
    l.info('Tables created!!!');
  });
}
