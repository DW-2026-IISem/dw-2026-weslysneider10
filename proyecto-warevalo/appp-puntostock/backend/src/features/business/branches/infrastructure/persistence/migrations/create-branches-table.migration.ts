export const createBranchesTableMigration = {
  name: 'create-branches-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE branches (id, name, description, status, createdAt, updatedAt)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE branches
  },
};
