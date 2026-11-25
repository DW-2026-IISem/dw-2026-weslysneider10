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
exports.ListBranchesUseCase = void 0;
const common_1 = require("@nestjs/common");
const branch_repository_interface_1 = require("../../domain/interfaces/branch-repository.interface");
const branch_mapper_1 = require("../mappers/branch.mapper");
let ListBranchesUseCase = class ListBranchesUseCase {
    branchRepository;
    constructor(branchRepository) {
        this.branchRepository = branchRepository;
    }
    async execute(filter) {
        const result = await this.branchRepository.findAll(filter);
        return {
            items: result.items.map((b) => branch_mapper_1.BranchMapper.toResponse(b)),
            meta: result.meta,
        };
    }
};
exports.ListBranchesUseCase = ListBranchesUseCase;
exports.ListBranchesUseCase = ListBranchesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(branch_repository_interface_1.BRANCH_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListBranchesUseCase);
//# sourceMappingURL=list-branches.use-case.js.map