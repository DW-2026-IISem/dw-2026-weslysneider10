"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseSeederService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSeederService = void 0;
const common_1 = require("@nestjs/common");
const clients_seeder_1 = require("../../../features/business/clients/infrastructure/persistence/seeders/clients.seeder");
const product_types_seeder_1 = require("../../../features/business/product-types/infrastructure/persistence/seeders/product-types.seeder");
const products_seeder_1 = require("../../../features/business/products/infrastructure/persistence/seeders/products.seeder");
const sales_seeder_1 = require("../../../features/business/sales/infrastructure/persistence/seeders/sales.seeder");
const purchases_seeder_1 = require("../../../features/business/purchases/infrastructure/persistence/seeders/purchases.seeder");
const returns_seeder_1 = require("../../../features/business/returns/infrastructure/persistence/seeders/returns.seeder");
let DatabaseSeederService = DatabaseSeederService_1 = class DatabaseSeederService {
    logger = new common_1.Logger(DatabaseSeederService_1.name);
    async onModuleInit() {
        if (process.env.NODE_ENV === 'production') {
            return;
        }
        try {
            await (0, clients_seeder_1.seedClients)();
            await (0, product_types_seeder_1.seedProductTypes)();
            await (0, products_seeder_1.seedProducts)();
            await (0, sales_seeder_1.seedSales)();
            await (0, purchases_seeder_1.seedPurchases)();
            await (0, returns_seeder_1.seedReturns)();
            this.logger.log('✅ Seeders ejecutados');
        }
        catch (error) {
            this.logger.error(`❌ Error en seeders: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.DatabaseSeederService = DatabaseSeederService;
exports.DatabaseSeederService = DatabaseSeederService = DatabaseSeederService_1 = __decorate([
    (0, common_1.Injectable)()
], DatabaseSeederService);
//# sourceMappingURL=database-seeder.service.js.map