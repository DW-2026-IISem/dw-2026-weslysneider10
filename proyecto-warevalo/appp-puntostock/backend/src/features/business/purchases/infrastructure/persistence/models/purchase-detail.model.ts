import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'purchase_details' })
export class PurchaseDetailModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

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

  @ForeignKey(() => require('./purchase.model').PurchaseModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare purchaseId: number;

  @BelongsTo(() => require('./purchase.model').PurchaseModel)
  declare purchase: unknown;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare quantityOrdered: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare quantityReceived: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  declare unitCost: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  declare total: number;
}
