import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface ReturnI {
  id?: number;
  saleDetailId: number;
  fecha: Date;
  motivo: string;
  cantidad: number;
  total: number;
  estado: "pending" | "approved" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Return extends Model {
  public id!: number;
  public saleDetailId!: number;
  public fecha!: Date;
  public motivo!: string;
  public cantidad!: number;
  public total!: number;
  public estado!: "pending" | "approved" | "rejected";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Return.init(
  {
    saleDetailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "Return",
    tableName: "returns",
    timestamps: true,
  }
);
