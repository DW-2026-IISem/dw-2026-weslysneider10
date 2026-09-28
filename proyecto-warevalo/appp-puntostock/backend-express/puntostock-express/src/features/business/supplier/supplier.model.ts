import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface SupplierI {
  id?: number;
  nit: string;
  razonSocial: string;
  contacto?: string | null;
  telefono?: string | null;
  email?: string | null;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Supplier extends Model {
  public id!: number;
  public nit!: string;
  public razonSocial!: string;
  public contacto!: string | null;
  public telefono!: string | null;
  public email!: string | null;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Supplier.init(
  {
    nit: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    razonSocial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contacto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Supplier",
    tableName: "suppliers",
    timestamps: true,
  }
);
