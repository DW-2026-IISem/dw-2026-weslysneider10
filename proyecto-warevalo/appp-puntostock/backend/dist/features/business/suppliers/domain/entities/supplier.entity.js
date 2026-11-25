"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
const status_enum_1 = require("../../../../../common/enums/status.enum");
const supplier_nit_validator_1 = require("../validators/supplier-nit.validator");
const supplier_email_validator_1 = require("../validators/supplier-email.validator");
const supplier_phone_validator_1 = require("../validators/supplier-phone.validator");
class Supplier {
    id;
    nit;
    businessName;
    contactName;
    phone;
    email;
    status;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.nit = props.nit;
        this.businessName = props.businessName;
        this.contactName = props.contactName;
        this.phone = props.phone;
        this.email = props.email;
        this.status = props.status ?? status_enum_1.Status.ACTIVE;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (!props.nit?.trim()) {
            throw new Error('El NIT del proveedor es requerido');
        }
        if (!(0, supplier_nit_validator_1.isValidNit)(props.nit)) {
            throw new Error('El NIT del proveedor no es válido');
        }
        if (!props.businessName?.trim()) {
            throw new Error('La razón social del proveedor es requerida');
        }
        if (props.email && !(0, supplier_email_validator_1.isValidEmail)(props.email)) {
            throw new Error('El email del proveedor no es válido');
        }
        if (props.phone && !(0, supplier_phone_validator_1.isValidPhone)(props.phone)) {
            throw new Error('El teléfono del proveedor no es válido');
        }
        return new Supplier(props);
    }
    static reconstitute(props) {
        return new Supplier(props);
    }
    update(props) {
        if (props.nit !== undefined) {
            if (!props.nit.trim() || !(0, supplier_nit_validator_1.isValidNit)(props.nit)) {
                throw new Error('El NIT del proveedor no es válido');
            }
            this.nit = props.nit;
        }
        if (props.businessName !== undefined) {
            if (!props.businessName.trim()) {
                throw new Error('La razón social del proveedor es requerida');
            }
            this.businessName = props.businessName;
        }
        if (props.contactName !== undefined) {
            this.contactName = props.contactName;
        }
        if (props.phone !== undefined) {
            if (props.phone && !(0, supplier_phone_validator_1.isValidPhone)(props.phone)) {
                throw new Error('El teléfono del proveedor no es válido');
            }
            this.phone = props.phone;
        }
        if (props.email !== undefined) {
            if (props.email && !(0, supplier_email_validator_1.isValidEmail)(props.email)) {
                throw new Error('El email del proveedor no es válido');
            }
            this.email = props.email;
        }
    }
    deactivate() {
        this.status = status_enum_1.Status.INACTIVE;
    }
}
exports.Supplier = Supplier;
//# sourceMappingURL=supplier.entity.js.map