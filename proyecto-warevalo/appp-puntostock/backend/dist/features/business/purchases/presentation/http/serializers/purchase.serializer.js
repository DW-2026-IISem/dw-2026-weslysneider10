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
exports.PurchaseSerializer = void 0;
const class_transformer_1 = require("class-transformer");
class PurchaseDetailSerializer {
    id;
    productId;
    quantityOrdered;
    quantityReceived;
    unitCost;
    total;
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PurchaseDetailSerializer.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PurchaseDetailSerializer.prototype, "productId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PurchaseDetailSerializer.prototype, "quantityOrdered", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PurchaseDetailSerializer.prototype, "quantityReceived", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PurchaseDetailSerializer.prototype, "unitCost", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PurchaseDetailSerializer.prototype, "total", void 0);
let PurchaseSerializer = class PurchaseSerializer {
    id;
    purchaseDate;
    supplierId;
    branchId;
    status;
    subtotal;
    tax;
    total;
    items;
    createdAt;
    updatedAt;
};
exports.PurchaseSerializer = PurchaseSerializer;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PurchaseSerializer.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], PurchaseSerializer.prototype, "purchaseDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PurchaseSerializer.prototype, "supplierId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PurchaseSerializer.prototype, "branchId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PurchaseSerializer.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PurchaseSerializer.prototype, "subtotal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PurchaseSerializer.prototype, "tax", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PurchaseSerializer.prototype, "total", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => PurchaseDetailSerializer),
    __metadata("design:type", Array)
], PurchaseSerializer.prototype, "items", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], PurchaseSerializer.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], PurchaseSerializer.prototype, "updatedAt", void 0);
exports.PurchaseSerializer = PurchaseSerializer = __decorate([
    (0, class_transformer_1.Exclude)()
], PurchaseSerializer);
//# sourceMappingURL=purchase.serializer.js.map