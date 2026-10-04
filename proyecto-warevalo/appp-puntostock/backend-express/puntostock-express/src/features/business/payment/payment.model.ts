import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface PaymentI {
  id?: number;
  saleId: number;
  fecha: Date;
  metodo: "cash" | "card" | "transfer";
  monto: number;
  estado: "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Payment extends Model {
  public id!: number;
  public saleId!: number;
  public fecha!: Date;
  public metodo!: "cash" | "card" | "transfer";
  public monto!: number;
  public estado!: "completed" | "cancelled";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
  {
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    metodo: {
      type: DataTypes.ENUM("cash", "card", "transfer"),
      allowNull: false,
    },
    monto: {
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
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
  }
);
