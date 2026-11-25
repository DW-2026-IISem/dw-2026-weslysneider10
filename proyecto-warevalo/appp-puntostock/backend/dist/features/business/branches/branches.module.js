"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesModule = void 0;
const common_1 = require("@nestjs/common");
const branch_repository_interface_1 = require("./domain/interfaces/branch-repository.interface");
const branch_repository_1 = require("./infrastructure/persistence/repositories/branch.repository");
const create_branch_use_case_1 = require("./application/use-cases/create-branch.use-case");
const update_branch_use_case_1 = require("./application/use-cases/update-branch.use-case");
const delete_branch_use_case_1 = require("./application/use-cases/delete-branch.use-case");
const get_branch_use_case_1 = require("./application/use-cases/get-branch.use-case");
const list_branches_use_case_1 = require("./application/use-cases/list-branches.use-case");
const branches_controller_1 = require("./presentation/http/controllers/branches.controller");
let BranchesModule = class BranchesModule {
};
exports.BranchesModule = BranchesModule;
exports.BranchesModule = BranchesModule = __decorate([
    (0, common_1.Module)({
        controllers: [branches_controller_1.BranchesController],
        providers: [
            branch_repository_1.BranchRepository,
            { provide: branch_repository_interface_1.BRANCH_REPOSITORY, useExisting: branch_repository_1.BranchRepository },
            create_branch_use_case_1.CreateBranchUseCase,
            update_branch_use_case_1.UpdateBranchUseCase,
            delete_branch_use_case_1.DeleteBranchUseCase,
            get_branch_use_case_1.GetBranchUseCase,
            list_branches_use_case_1.ListBranchesUseCase,
        ],
        exports: [branch_repository_interface_1.BRANCH_REPOSITORY],
    })
], BranchesModule);
//# sourceMappingURL=branches.module.js.map