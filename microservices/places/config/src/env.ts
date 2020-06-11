import { config } from "dotenv";
import { resolve } from "path";

export interface GeocodeHttps {
  key: string;
  cert: string;
}

export interface GeocodeServerEnv {
  port: number;
  https?: GeocodeHttps;
}

export interface GeocodeEnv {
  apiKey: string;
  server: GeocodeServerEnv;
  production: boolean;
}

export const readEnv = (name = ".env"): GeocodeEnv => {
  const path = resolve(process.cwd(), name);

  config({ path });

  if (!process.env.SERVER_PORT) {
    throw new Error("Unable to retrieve environment variable from server port");
  }

  const env: GeocodeEnv = {
    apiKey: process.env.API_KEY as string,
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
