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
exports.GetReturnUseCase = void 0;
const common_1 = require("@nestjs/common");
const return_not_found_exception_1 = require("../../domain/exceptions/return-not-found.exception");
const return_repository_interface_1 = require("../../domain/interfaces/return-repository.interface");
const return_mapper_1 = require("../mappers/return.mapper");
let GetReturnUseCase = class GetReturnUseCase {
    returnRepository;
    constructor(returnRepository) {
        this.returnRepository = returnRepository;
    }
    async execute(id) {
        const returnEntity = await this.returnRepository.findById(id);
        if (!returnEntity) {
            throw new return_not_found_exception_1.ReturnNotFoundException(id);
        }
        return return_mapper_1.ReturnMapper.toResponse(returnEntity);
    }
};
exports.GetReturnUseCase = GetReturnUseCase;
exports.GetReturnUseCase = GetReturnUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(return_repository_interface_1.RETURN_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetReturnUseCase);
//# sourceMappingURL=get-return.use-case.js.map