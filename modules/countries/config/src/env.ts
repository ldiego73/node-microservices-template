import { resolve } from 'path';
import { config } from 'dotenv';

export interface CountryDbEnv {
  name: string;
  type: string;
  storage: string;
}

export interface CountryEnv {
  db: CountryDbEnv;
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
    production: process.env.NODE_ENV === 'production',
  };
};
