"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = exports.SaleItem = void 0;
const status_enum_1 = require("../../../../../common/enums/status.enum");
class SaleItem {
    id;
    productId;
    quantity;
    unitPrice;
    total;
    saleId;
    constructor(props) {
        this.id = props.id;
        this.productId = props.productId;
        this.quantity = props.quantity;
        this.unitPrice = props.unitPrice;
        this.total = props.total;
        this.saleId = props.saleId;
    }
    static create(props) {
        if (props.quantity <= 0) {
            throw new Error('La cantidad debe ser mayor a 0');
        }
        if (props.unitPrice <= 0) {
            throw new Error('El precio unitario debe ser mayor a 0');
        }
        const total = props.quantity * props.unitPrice;
        return new SaleItem({
            ...props,
            total,
        });
    }
    static reconstitute(props) {
        return new SaleItem(props);
    }
}
exports.SaleItem = SaleItem;
class Sale {
    id;
    saleDate;
    subtotal;
    tax;
    discounts;
    total;
    status;
    clientId;
    items;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.saleDate = props.saleDate;
        this.subtotal = props.subtotal;
        this.tax = props.tax;
        this.discounts = props.discounts;
        this.total = props.total;
        this.status = props.status ?? status_enum_1.Status.ACTIVE;
        this.clientId = props.clientId;
        this.items = props.items ?? [];
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (!props.items?.length) {
            throw new Error('La venta debe tener al menos un item');
        }
        return new Sale(props);
    }
    static reconstitute(props) {
        return new Sale(props);
    }
    cancel() {
        this.status = status_enum_1.Status.INACTIVE;
    }
}
exports.Sale = Sale;
//# sourceMappingURL=sale.entity.js.map