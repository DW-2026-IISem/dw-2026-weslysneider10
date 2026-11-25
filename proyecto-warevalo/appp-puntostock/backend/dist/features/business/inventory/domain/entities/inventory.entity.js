"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
class Inventory {
    id;
    branchId;
    productId;
    quantity;
    minStock;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.branchId = props.branchId;
        this.productId = props.productId;
        this.quantity = props.quantity;
        this.minStock = props.minStock;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (props.quantity < 0) {
            throw new Error('La cantidad no puede ser negativa');
        }
        if (props.minStock < 0) {
            throw new Error('El stock mínimo no puede ser negativo');
        }
        return new Inventory(props);
    }
    static reconstitute(props) {
        return new Inventory(props);
    }
    update(props) {
        if (props.quantity !== undefined) {
            if (props.quantity < 0) {
                throw new Error('La cantidad no puede ser negativa');
            }
            this.quantity = props.quantity;
        }
        if (props.minStock !== undefined) {
            if (props.minStock < 0) {
                throw new Error('El stock mínimo no puede ser negativo');
            }
            this.minStock = props.minStock;
        }
    }
    increaseStock(amount) {
        if (amount <= 0) {
            throw new Error('La cantidad a incrementar debe ser mayor a 0');
        }
        this.quantity += amount;
    }
    decreaseStock(amount) {
        if (amount <= 0) {
            throw new Error('La cantidad a descontar debe ser mayor a 0');
        }
        if (this.quantity - amount < 0) {
            throw new Error('No hay disponibilidad suficiente en esta ubicación');
        }
        this.quantity -= amount;
    }
    isLowStock() {
        return this.quantity <= this.minStock;
    }
}
exports.Inventory = Inventory;
//# sourceMappingURL=inventory.entity.js.map