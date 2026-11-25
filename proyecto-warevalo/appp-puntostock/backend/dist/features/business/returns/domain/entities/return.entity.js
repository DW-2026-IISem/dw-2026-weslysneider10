"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = exports.ReturnLine = void 0;
const return_status_enum_1 = require("../enums/return-status.enum");
class ReturnLine {
    id;
    returnId;
    productId;
    quantity;
    unitPrice;
    total;
    constructor(props) {
        this.id = props.id;
        this.returnId = props.returnId;
        this.productId = props.productId;
        this.quantity = props.quantity;
        this.unitPrice = props.unitPrice;
        this.total = props.total;
    }
    static create(props) {
        if (props.quantity <= 0) {
            throw new Error('La cantidad a devolver debe ser mayor a 0');
        }
        if (props.unitPrice <= 0) {
            throw new Error('El precio unitario debe ser mayor a 0');
        }
        const total = props.quantity * props.unitPrice;
        return new ReturnLine({ ...props, total });
    }
    static reconstitute(props) {
        return new ReturnLine(props);
    }
}
exports.ReturnLine = ReturnLine;
class Return {
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
    constructor(props) {
        this.id = props.id;
        this.returnDate = props.returnDate;
        this.reason = props.reason;
        this.saleId = props.saleId;
        this.status = props.status ?? return_status_enum_1.ReturnStatus.COMPLETED;
        this.subtotal = props.subtotal;
        this.total = props.total;
        this.lines = props.lines ?? [];
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (!props.reason?.trim()) {
            throw new Error('El motivo de la devolución es requerido');
        }
        if (!props.lines?.length) {
            throw new Error('La devolución debe tener al menos una línea');
        }
        return new Return(props);
    }
    static reconstitute(props) {
        return new Return(props);
    }
    cancel() {
        this.status = return_status_enum_1.ReturnStatus.CANCELLED;
    }
}
exports.Return = Return;
//# sourceMappingURL=return.entity.js.map