"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsModule = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_password_hasher_service_1 = require("../../../infrastructure/security/hashing/bcrypt-password-hasher.service");
const password_hasher_interface_1 = require("../../../infrastructure/security/hashing/password-hasher.interface");
const client_repository_interface_1 = require("./domain/interfaces/client-repository.interface");
const client_repository_1 = require("./infrastructure/persistence/repositories/client.repository");
const create_client_use_case_1 = require("./application/use-cases/create-client.use-case");
const update_client_use_case_1 = require("./application/use-cases/update-client.use-case");
const delete_client_use_case_1 = require("./application/use-cases/delete-client.use-case");
const get_client_use_case_1 = require("./application/use-cases/get-client.use-case");
const list_clients_use_case_1 = require("./application/use-cases/list-clients.use-case");
const clients_controller_1 = require("./presentation/http/controllers/clients.controller");
let ClientsModule = class ClientsModule {
};
exports.ClientsModule = ClientsModule;
exports.ClientsModule = ClientsModule = __decorate([
    (0, common_1.Module)({
        controllers: [clients_controller_1.ClientsController],
        providers: [
            client_repository_1.ClientRepository,
            {
                provide: client_repository_interface_1.CLIENT_REPOSITORY,
                useExisting: client_repository_1.ClientRepository,
            },
            bcrypt_password_hasher_service_1.BcryptPasswordHasherService,
            {
                provide: password_hasher_interface_1.PASSWORD_HASHER,
                useExisting: bcrypt_password_hasher_service_1.BcryptPasswordHasherService,
            },
            create_client_use_case_1.CreateClientUseCase,
            update_client_use_case_1.UpdateClientUseCase,
            delete_client_use_case_1.DeleteClientUseCase,
            get_client_use_case_1.GetClientUseCase,
            list_clients_use_case_1.ListClientsUseCase,
        ],
        exports: [client_repository_interface_1.CLIENT_REPOSITORY],
    })
], ClientsModule);
//# sourceMappingURL=clients.module.js.map