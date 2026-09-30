import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface PurchaseI {
  id?: number;
  supplierId: number;
  date: Date;
  subtotal: number;
  taxes: number;
  total: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PurchaseDetailI {
  id?: number;
  purchaseId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  total: number;
  observations?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Purchase extends Model {
  public id!: number;
  public supplierId!: number;
  public date!: Date;
  public subtotal!: number;
  public taxes!: number;
  public total!: number;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export class PurchaseDetail extends Model {
  public id!: number;
  public purchaseId!: number;
  public productId!: number;
  public quantity!: number;
  public unitPrice!: number;
  public total!: number;
  public observations!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Purchase.init(
  {
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    taxes: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    observations: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "PurchaseDetail",
    tableName: "purchase_details",
    timestamps: true,
  }
);
