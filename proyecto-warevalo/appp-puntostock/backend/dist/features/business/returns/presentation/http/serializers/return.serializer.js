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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnSerializer = void 0;
const class_transformer_1 = require("class-transformer");
class ReturnLineSerializer {
    id;
    productId;
    quantity;
    unitPrice;
    total;
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ReturnLineSerializer.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ReturnLineSerializer.prototype, "productId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ReturnLineSerializer.prototype, "quantity", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ReturnLineSerializer.prototype, "unitPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ReturnLineSerializer.prototype, "total", void 0);
let ReturnSerializer = class ReturnSerializer {
    id;
    returnDate;
    reason;
    saleId;
    status;
    subtotal;
    total;
    lines;
    createdAt;
    updatedAt;
};
exports.ReturnSerializer = ReturnSerializer;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ReturnSerializer.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], ReturnSerializer.prototype, "returnDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ReturnSerializer.prototype, "reason", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ReturnSerializer.prototype, "saleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ReturnSerializer.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ReturnSerializer.prototype, "subtotal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ReturnSerializer.prototype, "total", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ReturnLineSerializer),
    __metadata("design:type", Array)
], ReturnSerializer.prototype, "lines", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], ReturnSerializer.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], ReturnSerializer.prototype, "updatedAt", void 0);
exports.ReturnSerializer = ReturnSerializer = __decorate([
    (0, class_transformer_1.Exclude)()
], ReturnSerializer);
//# sourceMappingURL=return.serializer.js.map