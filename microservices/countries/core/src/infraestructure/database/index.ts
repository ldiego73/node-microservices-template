import { readEnv } from "@micro/countries-config";
import { Dialect, Sequelize } from "sequelize";

const env = readEnv();

export const db = new Sequelize({
  database: env.db.name,
  dialect: env.db.type as Dialect,
  storage: env.db.storage,
  logging: false,
});
