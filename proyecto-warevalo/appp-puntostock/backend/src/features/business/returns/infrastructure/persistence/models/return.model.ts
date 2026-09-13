import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { ReturnStatus } from '../../../domain/enums/return-status.enum';

@Table({ tableName: 'returns' })
export class ReturnModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.DATE, allowNull: false })
  declare returnDate: Date;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare reason: string;

  @ForeignKey(
    () =>
      require('../../../../sales/infrastructure/persistence/models/sale.model')
        .SaleModel,
  )
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare saleId: number;

  @BelongsTo(
    () =>
      require('../../../../sales/infrastructure/persistence/models/sale.model')
        .SaleModel,
  )
  declare sale: unknown;

  @Column({
    type: DataType.ENUM(...Object.values(ReturnStatus)),
    allowNull: false,
    defaultValue: ReturnStatus.COMPLETED,
  })
  declare status: ReturnStatus;

  @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: 0 })
  declare subtotal: number;

  @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: 0 })
  declare total: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @HasMany(() => require('./return-detail.model').ReturnDetailModel)
  declare details: unknown[];
}
