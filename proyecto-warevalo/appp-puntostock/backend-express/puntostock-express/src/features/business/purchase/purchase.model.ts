import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface PurchaseI {
  id?: number;
  supplierId: number;
  branchId: number;
  fecha: Date;
  subtotal: number;
  impuestos: number;
  total: number;
  estado: "pending" | "partial" | "received" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Purchase extends Model {
  public id!: number;
  public supplierId!: number;
  public branchId!: number;
  public fecha!: Date;
  public subtotal!: number;
  public impuestos!: number;
  public total!: number;
  public estado!: "pending" | "partial" | "received" | "cancelled";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Purchase.init(
  {
    supplierId: {
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
      type: DataTypes.ENUM("pending", "partial", "received", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "Purchase",
    tableName: "purchases",
    timestamps: true,
  }
);
