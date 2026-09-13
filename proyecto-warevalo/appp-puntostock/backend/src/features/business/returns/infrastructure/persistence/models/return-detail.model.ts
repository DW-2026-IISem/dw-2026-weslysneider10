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

@Table({ tableName: 'return_details' })
export class ReturnDetailModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => require('./return.model').ReturnModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare returnId: number;

  @BelongsTo(() => require('./return.model').ReturnModel)
  declare returnHeader: unknown;

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

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare quantity: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  declare unitPrice: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  declare total: number;
}
