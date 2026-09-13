import { DataTypes, QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('returns', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    returnDate: { type: DataTypes.DATE, allowNull: false },
    reason: { type: DataTypes.STRING(255), allowNull: false },
    saleId: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM('COMPLETED', 'CANCELLED'),
      allowNull: false,
      defaultValue: 'COMPLETED',
    },
    subtotal: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
    total: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  });

  await queryInterface.createTable('return_details', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    returnId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unitPrice: { type: DataTypes.BIGINT, allowNull: false },
    total: { type: DataTypes.BIGINT, allowNull: false },
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('return_details');
  await queryInterface.dropTable('returns');
}
