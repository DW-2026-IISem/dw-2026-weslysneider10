export const createSuppliersTableMigration = {
  name: 'create-suppliers-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE suppliers (id, nit, businessName, contactName, phone, email, status, createdAt, updatedAt)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE suppliers
  },
};
