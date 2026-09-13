import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { PaymentMethod } from '../../../domain/enums/payment-method.enum';
import { PaymentReferenceType } from '../../../domain/enums/payment-reference-type.enum';
import { PaymentStatus } from '../../../domain/enums/payment-status.enum';

@Table({ tableName: 'payments' })
export class PaymentModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentReferenceType)),
    allowNull: false,
  })
  declare referenceType: PaymentReferenceType;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare referenceId: number;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentMethod)),
    allowNull: false,
  })
  declare method: PaymentMethod;

  @Column({ type: DataType.BIGINT, allowNull: false })
  declare amount: number;

  @Column({ type: DataType.DATE, allowNull: false })
  declare paymentDate: Date;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatus)),
    allowNull: false,
    defaultValue: PaymentStatus.CONFIRMED,
  })
  declare status: PaymentStatus;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
