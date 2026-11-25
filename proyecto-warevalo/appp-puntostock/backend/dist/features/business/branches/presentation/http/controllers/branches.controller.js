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
exports.BranchesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_positive_int_pipe_1 = require("../../../../../../common/pipes/parse-positive-int.pipe");
const create_branch_dto_1 = require("../../../application/dto/create-branch.dto");
const update_branch_dto_1 = require("../../../application/dto/update-branch.dto");
const branch_filter_dto_1 = require("../../../application/dto/branch-filter.dto");
const branch_response_dto_1 = require("../../../application/dto/branch-response.dto");
const create_branch_use_case_1 = require("../../../application/use-cases/create-branch.use-case");
const update_branch_use_case_1 = require("../../../application/use-cases/update-branch.use-case");
const delete_branch_use_case_1 = require("../../../application/use-cases/delete-branch.use-case");
const get_branch_use_case_1 = require("../../../application/use-cases/get-branch.use-case");
const list_branches_use_case_1 = require("../../../application/use-cases/list-branches.use-case");
let BranchesController = class BranchesController {
    createBranchUseCase;
    updateBranchUseCase;
    deleteBranchUseCase;
    getBranchUseCase;
    listBranchesUseCase;
    constructor(createBranchUseCase, updateBranchUseCase, deleteBranchUseCase, getBranchUseCase, listBranchesUseCase) {
        this.createBranchUseCase = createBranchUseCase;
        this.updateBranchUseCase = updateBranchUseCase;
        this.deleteBranchUseCase = deleteBranchUseCase;
        this.getBranchUseCase = getBranchUseCase;
        this.listBranchesUseCase = listBranchesUseCase;
    }
    create(dto) {
        return this.createBranchUseCase.execute(dto);
    }
    findAll(filter) {
        return this.listBranchesUseCase.execute(filter);
    }
    findOne(id) {
        return this.getBranchUseCase.execute(id);
    }
    update(id, dto) {
        return this.updateBranchUseCase.execute(id, dto);
    }
    remove(id) {
        return this.deleteBranchUseCase.execute(id);
    }
};
exports.BranchesController = BranchesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una sucursal' }),
    (0, swagger_1.ApiCreatedResponse)({ type: branch_response_dto_1.BranchResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_branch_dto_1.CreateBranchDto]),
    __metadata("design:returntype", void 0)
], BranchesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar sucursales' }),
    (0, swagger_1.ApiOkResponse)({ type: [branch_response_dto_1.BranchResponseDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [branch_filter_dto_1.BranchFilterDto]),
    __metadata("design:returntype", void 0)
], BranchesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una sucursal por ID' }),
    (0, swagger_1.ApiOkResponse)({ type: branch_response_dto_1.BranchResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BranchesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una sucursal' }),
    (0, swagger_1.ApiOkResponse)({ type: branch_response_dto_1.BranchResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_branch_dto_1.UpdateBranchDto]),
    __metadata("design:returntype", void 0)
], BranchesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una sucursal' }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BranchesController.prototype, "remove", null);
exports.BranchesController = BranchesController = __decorate([
    (0, swagger_1.ApiTags)('Branches'),
    (0, common_1.Controller)('branches'),
    __metadata("design:paramtypes", [create_branch_use_case_1.CreateBranchUseCase,
        update_branch_use_case_1.UpdateBranchUseCase,
        delete_branch_use_case_1.DeleteBranchUseCase,
        get_branch_use_case_1.GetBranchUseCase,
        list_branches_use_case_1.ListBranchesUseCase])
], BranchesController);
//# sourceMappingURL=branches.controller.js.map