import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface PurchaseDetailI {
  id?: number;
  purchaseId: number;
  productId: number;
  cantidad: number;
  valorUnitario: number;
  total: number;
  receivedQuantity: number;
  observaciones?: string | null;
}

export class PurchaseDetail extends Model {
  public id!: number;
  public purchaseId!: number;
  public productId!: number;
  public cantidad!: number;
  public valorUnitario!: number;
  public total!: number;
  public receivedQuantity!: number;
  public observaciones!: string | null;
}

PurchaseDetail.init(
  {
    purchaseId: {
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
    receivedQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "PurchaseDetail",
    tableName: "purchase_details",
    timestamps: false,
  }
);
