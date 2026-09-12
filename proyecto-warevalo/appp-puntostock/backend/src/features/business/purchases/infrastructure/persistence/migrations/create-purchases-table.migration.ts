import { DataTypes, QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('purchases', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    purchaseDate: { type: DataTypes.DATE, allowNull: false },
    supplierId: { type: DataTypes.INTEGER, allowNull: false },
    branchId: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM('PENDING', 'PARTIALLY_RECEIVED', 'RECEIVED', 'CANCELLED'),
      allowNull: false,
      defaultValue: 'PENDING',
    },
    subtotal: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
    tax: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
    total: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  });

  await queryInterface.createTable('purchase_details', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    purchaseId: { type: DataTypes.INTEGER, allowNull: false },
    quantityOrdered: { type: DataTypes.INTEGER, allowNull: false },
    quantityReceived: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    unitCost: { type: DataTypes.BIGINT, allowNull: false },
    total: { type: DataTypes.BIGINT, allowNull: false },
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('purchase_details');
  await queryInterface.dropTable('purchases');
}
