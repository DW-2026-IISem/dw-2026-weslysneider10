import { Sequelize } from 'sequelize-typescript';
import { DatabaseDialect } from '../../../config/environment/env.interface';
import { getSequelizeOptions } from './sequelize.options';

// --- modelos de fases anteriores (ajusta a tu proyecto real) ---
import { BranchModel } from '../../../features/business/branches/infrastructure/persistence/models/branch.model';
import { ProductModel } from '../../../features/business/products/infrastructure/persistence/models/product.model';
// import { ProviderModel } from '...';
// import { PurchaseModel } from '...';
// import { PurchaseDetailModel } from '...';
// import { ClientModel } from '...';
// import { SaleModel } from '...';
// import { SaleDetailModel } from '...';
// import { PaymentModel } from '...';
// import { ReturnModel } from '...';

// --- modelo nuevo de esta fase ---
import { InventoryModel } from '../../../features/business/inventory/infrastructure/persistence/models/inventory.model';

export const ALL_MODELS = [
  BranchModel,
  ProductModel,
  // ProviderModel,
  // PurchaseModel,
  // PurchaseDetailModel,
  // ClientModel,
  // SaleModel,
  // SaleDetailModel,
  // PaymentModel,
  // ReturnModel,
  InventoryModel,
];

export async function createSequelizeInstance(
  dialect: DatabaseDialect,
): Promise<Sequelize> {
  const options = getSequelizeOptions(dialect);

  let dialectModule: any;

  switch (dialect) {
    case DatabaseDialect.MySQL:
      dialectModule = require('mysql2');
      break;
    case DatabaseDialect.Postgres:
      dialectModule = require('pg');
      break;
    case DatabaseDialect.MSSQL:
      dialectModule = require('tedious');
      break;
    case DatabaseDialect.Oracle:
      dialectModule = require('oracledb');
      break;
    default:
      throw new Error(`Dialecto no soportado: ${dialect}`);
  }

  const sequelize = new Sequelize({
    ...options,
    dialectModule,
    models: ALL_MODELS,
  } as any);

  try {
    await sequelize.authenticate();
    console.log(`✅ Conexión exitosa a ${dialect.toUpperCase()}`);
  } catch (error: any) {
    console.error(
      `❌ Error conectando a ${dialect.toUpperCase()}:`,
      error.message,
    );
    throw error;
  }

  if (process.env.NODE_ENV !== 'production') {
    await sequelize.sync({ alter: false });
    console.log('✅ Tablas sincronizadas');
  }

  return sequelize;
}
