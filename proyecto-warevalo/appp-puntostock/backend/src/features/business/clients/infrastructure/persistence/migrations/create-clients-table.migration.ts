export const createClientsTableMigration = {
  name: 'create-clients-table',

  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE clients
  },

  async down(): Promise<void> {
    // Production: DROP TABLE clients
  },
};
