import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface InventoryI {
  id?: number;
  branchId: number;
  productId: number;
  quantity: number;
  minStock: number;
  updatedAt?: Date;
}

export class Inventory extends Model {
  public id!: number;
  public branchId!: number;
  public productId!: number;
  public quantity!: number;
  public minStock!: number;
  public readonly updatedAt!: Date;
}

Inventory.init(
  {
    branchId: {
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
      defaultValue: 0,
    },
    minStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Inventory",
    tableName: "inventories",
    timestamps: true,
    createdAt: false,
    updatedAt: true,
    indexes: [
      {
        name: "uq_inventory_branch_product",
        unique: true,
        fields: ["branchId", "productId"],
      },
    ],
  }
);
