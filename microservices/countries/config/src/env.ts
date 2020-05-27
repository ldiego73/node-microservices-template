import { resolve } from 'path';
import { config } from 'dotenv';

export interface CountryDbEnv {
  name: string;
  type: string;
  storage: string;
}

export interface CountryHttps {
  key: string;
  cert: string;
}

export interface CountryServerEnv {
  port: number;
  https?: CountryHttps;
}

export interface CountryEnv {
  db: CountryDbEnv;
  server: CountryServerEnv;
  production: boolean;
}

export const readEnv = (name = '.env'): CountryEnv => {
  const path = resolve(process.cwd(), name);

  config({ path });

  const env: CountryEnv = {
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

  if (process.env.SERVER_HTTPS_CERT && process.env.SERVER_HTTPS_KEY) {
    env.server.https = {
      cert: process.env.SERVER_HTTPS_CERT as string,
      key: process.env.SERVER_HTTPS_KEY as string,
    };
  }

  return env;
};
