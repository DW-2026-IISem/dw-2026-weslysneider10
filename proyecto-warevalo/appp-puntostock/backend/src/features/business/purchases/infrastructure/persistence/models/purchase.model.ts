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
import { PurchaseStatus } from '../../../domain/entities/purchase.entity';

@Table({ tableName: 'purchases' })
export class PurchaseModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.DATE, allowNull: false })
  declare purchaseDate: Date;

  @ForeignKey(
    () =>
      require('../../../../suppliers/infrastructure/persistence/models/supplier.model')
        .SupplierModel,
  )
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare supplierId: number;

  @BelongsTo(
    () =>
      require('../../../../suppliers/infrastructure/persistence/models/supplier.model')
        .SupplierModel,
  )
  declare supplier: unknown;

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

  @Column({
    type: DataType.ENUM(...Object.values(PurchaseStatus)),
    allowNull: false,
    defaultValue: PurchaseStatus.PENDING,
  })
  declare status: PurchaseStatus;

  @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: 0 })
  declare subtotal: number;

  @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: 0 })
  declare tax: number;

  @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: 0 })
  declare total: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @HasMany(() => require('./purchase-detail.model').PurchaseDetailModel)
  declare details: unknown[];
}
