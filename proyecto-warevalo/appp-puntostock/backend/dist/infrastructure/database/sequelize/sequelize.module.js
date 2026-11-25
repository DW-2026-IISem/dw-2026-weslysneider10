"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeDatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const env_interface_js_1 = require("../../../config/environment/env.interface.js");
const database_constants_js_1 = require("../../../common/constants/database.constants.js");
const sequelize_factory_js_1 = require("./sequelize.factory.js");
const database_seeder_service_js_1 = require("../seeders/database-seeder.service.js");
let SequelizeDatabaseModule = class SequelizeDatabaseModule {
};
exports.SequelizeDatabaseModule = SequelizeDatabaseModule;
exports.SequelizeDatabaseModule = SequelizeDatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: database_constants_js_1.SEQUELIZE_TOKEN,
                useFactory: async (configService) => {
                    const dialect = configService.get('environment.database.dialect', env_interface_js_1.DatabaseDialect.MySQL);
                    return (0, sequelize_factory_js_1.createSequelizeInstance)(dialect);
                },
                inject: [config_1.ConfigService],
            },
            database_seeder_service_js_1.DatabaseSeederService,
        ],
        exports: [database_constants_js_1.SEQUELIZE_TOKEN],
    })
], SequelizeDatabaseModule);
//# sourceMappingURL=sequelize.module.js.map