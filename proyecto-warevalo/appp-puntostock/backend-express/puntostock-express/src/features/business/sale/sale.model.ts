import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface SaleI {
  id?: number;
  clientId: number;
  branchId: number;
  fecha: Date;
  subtotal: number;
  impuestos: number;
  total: number;
  estado: "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Sale extends Model {
  public id!: number;
  public clientId!: number;
  public branchId!: number;
  public fecha!: Date;
  public subtotal!: number;
  public impuestos!: number;
  public total!: number;
  public estado!: "completed" | "cancelled";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Sale.init(
  {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    impuestos: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    estado: {
      type: DataTypes.ENUM("completed", "cancelled"),
      allowNull: false,
      defaultValue: "completed",
    },
  },
  {
    sequelize,
    modelName: "Sale",
    tableName: "sales",
    timestamps: true,
  }
);
