import { config } from "dotenv";
import { resolve } from "path";

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

export const readEnv = (name = ".env"): CountryEnv => {
  const path = resolve(process.cwd(), name);

  config({ path });

  if (!process.env.DB_NAME || !process.env.DB_TYPE || !process.env.DB_STORAGE) {
    throw new Error("Unable to retrieve environment variables from database");
  }

  if (!process.env.SERVER_PORT) {
    throw new Error("Unable to retrieve environment variable from server port");
  }

  const env: CountryEnv = {
    db: {
      name: process.env.DB_NAME,
      type: process.env.DB_TYPE,
      storage: process.env.DB_STORAGE,
    },
    server: {
      port: Number(process.env.SERVER_PORT),
    },
    production: process.env.NODE_ENV === "production",
  };

  if (process.env.SERVER_HTTPS_CERT && process.env.SERVER_HTTPS_KEY) {
    env.server.https = {
      cert: process.env.SERVER_HTTPS_CERT,
      key: process.env.SERVER_HTTPS_KEY,
    };
  }

  return env;
};
