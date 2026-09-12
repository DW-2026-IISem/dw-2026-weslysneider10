import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { Status } from '../../../../../../common/enums/status.enum';

@Table({
  tableName: 'product_types',
  timestamps: true,
})
export class ProductTypeModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string | null;

  @Column({
    type: DataType.ENUM(...(Object.values(Status) as string[])),
    allowNull: false,
    defaultValue: Status.ACTIVE,
  })
  declare status: Status;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  // TODO: descomentar cuando exista el modulo products
  // @HasMany(() => {
  //   const { ProductModel } = require(
  //     '../../../../products/infrastructure/persistence/models/product.model',
  //   );
  //
  //   return ProductModel;
  // })
  // declare products: unknown[];
}
