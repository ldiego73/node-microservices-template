import { resolve } from 'path';
import { config } from 'dotenv';

export interface CountryDbEnv {
  name: string;
  type: string;
  storage: string;
}

export interface CountryServerEnv {
  port: number;
}

export interface CountryEnv {
  db: CountryDbEnv;
  server: CountryServerEnv;
  production: boolean;
}

export const readEnv = (name: string = '.env'): CountryEnv => {
  const path = resolve(process.cwd(), name);

  config({ path });

  return {
    db: {
      name: process.env.DB_NAME as string,
      type: process.env.DB_TYPE as string,
      storage: process.env.DB_STORAGE as string,
    },
    server: {
      port: Number(process.env.SERVER_PORT),
    },
    production: process.env.NODE_ENV === 'production',
  };
};
