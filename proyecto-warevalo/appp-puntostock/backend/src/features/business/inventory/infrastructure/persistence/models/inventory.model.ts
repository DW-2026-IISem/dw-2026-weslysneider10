import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'inventories',
  timestamps: true,
  createdAt: false,
  indexes: [
    {
      name: 'uq_inventory_branch_product',
      unique: true,
      fields: ['branchId', 'productId'],
    },
  ],
})
export class InventoryModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(
    () =>
      require('../../../../branches/infrastructure/persistence/models/branch.model')
        .BranchModel,
  )
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare branchId: number;

  @BelongsTo(
    () =>
      require('../../../../branches/infrastructure/persistence/models/branch.model')
        .BranchModel,
  )
  declare branch: unknown;

  @ForeignKey(
    () =>
      require('../../../../products/infrastructure/persistence/models/product.model')
        .ProductModel,
  )
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare productId: number;

  @BelongsTo(
    () =>
      require('../../../../products/infrastructure/persistence/models/product.model')
        .ProductModel,
  )
  declare product: unknown;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare quantity: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare minStock: number;

  @UpdatedAt
  declare updatedAt: Date;
}
