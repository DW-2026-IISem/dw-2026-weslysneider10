export const createProductTypesTableMigration = {
  name: 'create-product-types-table',

  async up(): Promise<void> {
    // La creación física en desarrollo es realizada por Sequelize sync.
  },

  async down(): Promise<void> {
    // En producción, esta operación debe eliminar la tabla product_types.
  },
};
