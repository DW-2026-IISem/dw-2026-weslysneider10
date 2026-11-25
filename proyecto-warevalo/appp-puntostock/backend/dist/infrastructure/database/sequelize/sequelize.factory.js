"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_MODELS = void 0;
exports.createSequelizeInstance = createSequelizeInstance;
const sequelize_typescript_1 = require("sequelize-typescript");
const env_interface_1 = require("../../../config/environment/env.interface");
const sequelize_options_1 = require("./sequelize.options");
const client_model_1 = require("../../../features/business/clients/infrastructure/persistence/models/client.model");
const product_type_model_1 = require("../../../features/business/product-types/infrastructure/persistence/models/product-type.model");
const product_model_1 = require("../../../features/business/products/infrastructure/persistence/models/product.model");
const sale_model_1 = require("../../../features/business/sales/infrastructure/persistence/models/sale.model");
const product_sale_model_1 = require("../../../features/business/sales/infrastructure/persistence/models/product-sale.model");
const supplier_model_1 = require("../../../features/business/suppliers/infrastructure/persistence/models/supplier.model");
const branch_model_1 = require("../../../features/business/branches/infrastructure/persistence/models/branch.model");
const inventory_model_1 = require("../../../features/business/inventory/infrastructure/persistence/models/inventory.model");
const purchase_model_1 = require("../../../features/business/purchases/infrastructure/persistence/models/purchase.model");
const purchase_detail_model_1 = require("../../../features/business/purchases/infrastructure/persistence/models/purchase-detail.model");
const return_model_1 = require("../../../features/business/returns/infrastructure/persistence/models/return.model");
const return_detail_model_1 = require("../../../features/business/returns/infrastructure/persistence/models/return-detail.model");
exports.ALL_MODELS = [
    client_model_1.ClientModel,
    product_type_model_1.ProductTypeModel,
    product_model_1.ProductModel,
    sale_model_1.SaleModel,
    product_sale_model_1.ProductSaleModel,
    supplier_model_1.SupplierModel,
    branch_model_1.BranchModel,
    inventory_model_1.InventoryModel,
    purchase_model_1.PurchaseModel,
    purchase_detail_model_1.PurchaseDetailModel,
    return_model_1.ReturnModel,
    return_detail_model_1.ReturnDetailModel,
];
async function createSequelizeInstance(dialect) {
    const options = (0, sequelize_options_1.getSequelizeOptions)(dialect);
    let dialectModule;
    switch (dialect) {
        case env_interface_1.DatabaseDialect.MySQL:
            dialectModule = require('mysql2');
            break;
        case env_interface_1.DatabaseDialect.Postgres:
            dialectModule = require('pg');
            break;
        case env_interface_1.DatabaseDialect.MSSQL:
            dialectModule = require('tedious');
            break;
        case env_interface_1.DatabaseDialect.Oracle:
            dialectModule = require('oracledb');
            break;
        default:
            throw new Error(`Dialecto no soportado: ${dialect}`);
    }
    const sequelize = new sequelize_typescript_1.Sequelize({
        ...options,
        dialectModule,
        models: exports.ALL_MODELS,
    });
    try {
        await sequelize.authenticate();
        console.log(`✅ Conexión exitosa a ${dialect.toUpperCase()}`);
    }
    catch (error) {
        console.error(`❌ Error conectando a ${dialect.toUpperCase()}:`, error.message);
        throw error;
    }
    if (process.env.NODE_ENV !== 'production') {
        await sequelize.sync({ alter: false });
        console.log('✅ Tablas sincronizadas');
    }
    return sequelize;
}
//# sourceMappingURL=sequelize.factory.js.map