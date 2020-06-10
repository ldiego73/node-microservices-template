import { DataTypes, Model } from "sequelize";

import { db } from "../index";

const TABLE_NAME = "countries";

export class CountryModel extends Model {
  public id!: string;
  public name!: string;
  public iso!: string;
  public currency!: string;
  public status!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CountryModel.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    iso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: TABLE_NAME,
  }
);

CountryModel.sync();
