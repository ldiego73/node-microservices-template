import './env';

export const DB = {
  NAME: process.env.DB_NAME,
  TYPE: process.env.DB_TYPE,
  STORAGE: process.env.DB_STORAGE,
};

export const PRODUCTION = process.env.NODE_ENV === 'production';
