"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = exports.PurchaseItem = exports.PurchaseStatus = void 0;
var PurchaseStatus;
(function (PurchaseStatus) {
    PurchaseStatus["PENDING"] = "PENDING";
    PurchaseStatus["PARTIALLY_RECEIVED"] = "PARTIALLY_RECEIVED";
    PurchaseStatus["RECEIVED"] = "RECEIVED";
    PurchaseStatus["CANCELLED"] = "CANCELLED";
})(PurchaseStatus || (exports.PurchaseStatus = PurchaseStatus = {}));
class PurchaseItem {
    id;
    purchaseId;
    productId;
    quantityOrdered;
    quantityReceived;
    unitCost;
    total;
    constructor(props) {
        this.id = props.id;
        this.purchaseId = props.purchaseId;
        this.productId = props.productId;
        this.quantityOrdered = props.quantityOrdered;
        this.quantityReceived = props.quantityReceived ?? 0;
        this.unitCost = props.unitCost;
        this.total = props.total;
    }
    static create(props) {
        if (props.quantityOrdered <= 0) {
            throw new Error('La cantidad pedida debe ser mayor a 0');
        }
        if (props.unitCost <= 0) {
            throw new Error('El costo unitario debe ser mayor a 0');
        }
        const total = props.quantityOrdered * props.unitCost;
        return new PurchaseItem({ ...props, total });
    }
    static reconstitute(props) {
        return new PurchaseItem(props);
    }
    get pendingQuantity() {
        return this.quantityOrdered - this.quantityReceived;
    }
    receive(quantity) {
        if (quantity <= 0) {
            throw new Error('La cantidad a recibir debe ser mayor a 0');
        }
        if (this.quantityReceived + quantity > this.quantityOrdered) {
            throw new Error(`La recepción supera lo pedido para el producto ${this.productId}`);
        }
        this.quantityReceived += quantity;
    }
}
exports.PurchaseItem = PurchaseItem;
class Purchase {
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
    constructor(props) {
        this.id = props.id;
        this.purchaseDate = props.purchaseDate;
        this.supplierId = props.supplierId;
        this.branchId = props.branchId;
        this.status = props.status ?? PurchaseStatus.PENDING;
        this.subtotal = props.subtotal;
        this.tax = props.tax;
        this.total = props.total;
        this.items = props.items ?? [];
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (!props.items?.length) {
            throw new Error('La compra debe tener al menos un item');
        }
        return new Purchase(props);
    }
    static reconstitute(props) {
        return new Purchase(props);
    }
    recalculateStatus() {
        const allReceived = this.items.every((item) => item.quantityReceived >= item.quantityOrdered);
        const anyReceived = this.items.some((item) => item.quantityReceived > 0);
        if (allReceived) {
            this.status = PurchaseStatus.RECEIVED;
        }
        else if (anyReceived) {
            this.status = PurchaseStatus.PARTIALLY_RECEIVED;
        }
    }
    receiveItems(receipts) {
        for (const receipt of receipts) {
            const item = this.items.find((i) => i.productId === receipt.productId);
            if (!item) {
                throw new Error(`El producto ${receipt.productId} no pertenece a esta compra`);
            }
            item.receive(receipt.quantity);
        }
        this.recalculateStatus();
    }
    cancel() {
        this.status = PurchaseStatus.CANCELLED;
    }
}
exports.Purchase = Purchase;
//# sourceMappingURL=purchase.entity.js.map