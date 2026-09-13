export const createPaymentsTableMigration = {
  name: 'create-payments-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE payments (id, referenceType, referenceId, method, amount, paymentDate, status, createdAt, updatedAt)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE payments
  },
};
