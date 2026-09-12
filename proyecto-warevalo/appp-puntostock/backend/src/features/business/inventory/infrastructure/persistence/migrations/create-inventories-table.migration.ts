export const createInventoriesTableMigration = {
  name: 'create-inventories-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE inventories (id, branchId FK, productId FK, quantity, minStock, updatedAt)
    // Production: CREATE UNIQUE INDEX uq_inventory_branch_product ON inventories (branchId, productId)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE inventories
  },
};
