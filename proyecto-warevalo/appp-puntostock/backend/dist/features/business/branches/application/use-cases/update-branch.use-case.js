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
exports.UpdateBranchUseCase = void 0;
const common_1 = require("@nestjs/common");
const branch_not_found_exception_1 = require("../../domain/exceptions/branch-not-found.exception");
const branch_repository_interface_1 = require("../../domain/interfaces/branch-repository.interface");
const branch_mapper_1 = require("../mappers/branch.mapper");
let UpdateBranchUseCase = class UpdateBranchUseCase {
    branchRepository;
    constructor(branchRepository) {
        this.branchRepository = branchRepository;
    }
    async execute(id, dto) {
        const branch = await this.branchRepository.findById(id);
        if (!branch) {
            throw new branch_not_found_exception_1.BranchNotFoundException(id);
        }
        branch.update(dto);
        const updated = await this.branchRepository.update(branch);
        return branch_mapper_1.BranchMapper.toResponse(updated);
    }
};
exports.UpdateBranchUseCase = UpdateBranchUseCase;
exports.UpdateBranchUseCase = UpdateBranchUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(branch_repository_interface_1.BRANCH_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateBranchUseCase);
//# sourceMappingURL=update-branch.use-case.js.map