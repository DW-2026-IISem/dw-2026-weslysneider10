import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface SaleDetailI {
  id?: number;
  saleId: number;
  productId: number;
  cantidad: number;
  valorUnitario: number;
  total: number;
  observaciones?: string | null;
}

export class SaleDetail extends Model {
  public id!: number;
  public saleId!: number;
  public productId!: number;
  public cantidad!: number;
  public valorUnitario!: number;
  public total!: number;
  public observaciones!: string | null;
}

SaleDetail.init(
  {
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valorUnitario: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "SaleDetail",
    tableName: "sale_details",
    timestamps: false,
  }
);
