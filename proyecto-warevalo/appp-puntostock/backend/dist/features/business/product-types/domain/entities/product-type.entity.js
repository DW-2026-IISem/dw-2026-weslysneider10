"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductType = void 0;
const status_enum_1 = require("../../../../../common/enums/status.enum");
class ProductType {
    id;
    name;
    description;
    status;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.status = props.status ?? status_enum_1.Status.ACTIVE;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        const name = props.name?.trim();
        if (!name) {
            throw new Error('El nombre del tipo de producto es requerido');
        }
        return new ProductType({
            ...props,
            name,
        });
    }
    static reconstitute(props) {
        return new ProductType(props);
    }
    update(props) {
        if (props.name !== undefined) {
            const name = props.name.trim();
            if (!name) {
                throw new Error('El nombre del tipo de producto es requerido');
            }
            this.name = name;
        }
        if (props.description !== undefined) {
            this.description = props.description;
        }
    }
    deactivate() {
        this.status = status_enum_1.Status.INACTIVE;
    }
}
exports.ProductType = ProductType;
//# sourceMappingURL=product-type.entity.js.map