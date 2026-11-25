"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_positive_int_pipe_1 = require("../../../../../../common/pipes/parse-positive-int.pipe");
const create_client_dto_1 = require("../../../application/dto/create-client.dto");
const update_client_dto_1 = require("../../../application/dto/update-client.dto");
const client_filter_dto_1 = require("../../../application/dto/client-filter.dto");
const client_response_dto_1 = require("../../../application/dto/client-response.dto");
const create_client_use_case_1 = require("../../../application/use-cases/create-client.use-case");
const update_client_use_case_1 = require("../../../application/use-cases/update-client.use-case");
const delete_client_use_case_1 = require("../../../application/use-cases/delete-client.use-case");
const get_client_use_case_1 = require("../../../application/use-cases/get-client.use-case");
const list_clients_use_case_1 = require("../../../application/use-cases/list-clients.use-case");
let ClientsController = class ClientsController {
    createClientUseCase;
    updateClientUseCase;
    deleteClientUseCase;
    getClientUseCase;
    listClientsUseCase;
    constructor(createClientUseCase, updateClientUseCase, deleteClientUseCase, getClientUseCase, listClientsUseCase) {
        this.createClientUseCase = createClientUseCase;
        this.updateClientUseCase = updateClientUseCase;
        this.deleteClientUseCase = deleteClientUseCase;
        this.getClientUseCase = getClientUseCase;
        this.listClientsUseCase = listClientsUseCase;
    }
    create(dto) {
        return this.createClientUseCase.execute(dto);
    }
    findAll(filter) {
        return this.listClientsUseCase.execute(filter);
    }
    findOne(id) {
        return this.getClientUseCase.execute(id);
    }
    update(id, dto) {
        return this.updateClientUseCase.execute(id, dto);
    }
    remove(id) {
        return this.deleteClientUseCase.execute(id);
    }
};
exports.ClientsController = ClientsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un cliente' }),
    (0, swagger_1.ApiCreatedResponse)({ type: client_response_dto_1.ClientResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_dto_1.CreateClientDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar clientes' }),
    (0, swagger_1.ApiOkResponse)({ type: [client_response_dto_1.ClientResponseDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_filter_dto_1.ClientFilterDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un cliente por ID' }),
    (0, swagger_1.ApiOkResponse)({ type: client_response_dto_1.ClientResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un cliente' }),
    (0, swagger_1.ApiOkResponse)({ type: client_response_dto_1.ClientResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_client_dto_1.UpdateClientDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un cliente' }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "remove", null);
exports.ClientsController = ClientsController = __decorate([
    (0, swagger_1.ApiTags)('Clients'),
    (0, common_1.Controller)('clients'),
    __metadata("design:paramtypes", [create_client_use_case_1.CreateClientUseCase,
        update_client_use_case_1.UpdateClientUseCase,
        delete_client_use_case_1.DeleteClientUseCase,
        get_client_use_case_1.GetClientUseCase,
        list_clients_use_case_1.ListClientsUseCase])
], ClientsController);
//# sourceMappingURL=clients.controller.js.map