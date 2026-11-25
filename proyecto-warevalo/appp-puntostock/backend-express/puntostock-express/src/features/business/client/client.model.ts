import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

/**
 * Cliente de la tienda (tabla clients).
 *
 * No tiene contraseña: un cliente no inicia sesión en el sistema. Las
 * credenciales pertenecen a los usuarios internos (tabla users).
 *
 * name es obligatorio; address, phone y email son opcionales (NULL si no
 * se conocen, nunca cadena vacía).
 */
export interface ClientI {
  id?: number;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Client extends Model {
  public id!: number;
  public name!: string;
  public address!: string | null;
  public phone!: string | null;
  public email!: string | null;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Client.init(
  {
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: { msg: "Email must be a valid email address" },
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Client",
    tableName: "clients",
    timestamps: true,
  }
);
