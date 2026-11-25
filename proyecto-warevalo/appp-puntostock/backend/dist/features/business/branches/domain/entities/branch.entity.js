"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Branch = void 0;
const status_enum_1 = require("../../../../../common/enums/status.enum");
class Branch {
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
        if (!props.name?.trim()) {
            throw new Error('El nombre de la sucursal es requerido');
        }
        return new Branch(props);
    }
    static reconstitute(props) {
        return new Branch(props);
    }
    update(props) {
        if (props.name !== undefined) {
            if (!props.name.trim()) {
                throw new Error('El nombre de la sucursal es requerido');
            }
            this.name = props.name;
        }
        if (props.description !== undefined) {
            this.description = props.description;
        }
    }
    deactivate() {
        this.status = status_enum_1.Status.INACTIVE;
    }
}
exports.Branch = Branch;
//# sourceMappingURL=branch.entity.js.map