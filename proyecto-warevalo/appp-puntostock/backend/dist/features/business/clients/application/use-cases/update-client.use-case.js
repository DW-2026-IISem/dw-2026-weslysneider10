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
exports.UpdateClientUseCase = void 0;
const common_1 = require("@nestjs/common");
const password_hasher_interface_1 = require("../../../../../infrastructure/security/hashing/password-hasher.interface");
const client_email_already_exists_exception_1 = require("../../domain/exceptions/client-email-already-exists.exception");
const client_not_found_exception_1 = require("../../domain/exceptions/client-not-found.exception");
const client_repository_interface_1 = require("../../domain/interfaces/client-repository.interface");
const client_mapper_1 = require("../mappers/client.mapper");
let UpdateClientUseCase = class UpdateClientUseCase {
    clientRepository;
    passwordHasher;
    constructor(clientRepository, passwordHasher) {
        this.clientRepository = clientRepository;
        this.passwordHasher = passwordHasher;
    }
    async execute(id, dto) {
        const client = await this.clientRepository.findById(id);
        if (!client) {
            throw new client_not_found_exception_1.ClientNotFoundException(id);
        }
        if (dto.email && dto.email !== client.email) {
            const existing = await this.clientRepository.findByEmail(dto.email);
            if (existing) {
                throw new client_email_already_exists_exception_1.ClientEmailAlreadyExistsException(dto.email);
            }
        }
        const updateData = { ...dto };
        if (dto.password) {
            updateData.password = await this.passwordHasher.hash(dto.password);
        }
        client.update(updateData);
        const updated = await this.clientRepository.update(client);
        return client_mapper_1.ClientMapper.toResponse(updated);
    }
};
exports.UpdateClientUseCase = UpdateClientUseCase;
exports.UpdateClientUseCase = UpdateClientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(client_repository_interface_1.CLIENT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(password_hasher_interface_1.PASSWORD_HASHER)),
    __metadata("design:paramtypes", [Object, Object])
], UpdateClientUseCase);
//# sourceMappingURL=update-client.use-case.js.map