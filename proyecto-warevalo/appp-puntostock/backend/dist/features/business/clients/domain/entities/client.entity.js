"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const status_enum_1 = require("../../../../../common/enums/status.enum");
const client_email_validator_1 = require("../validators/client-email.validator");
const client_phone_validator_1 = require("../validators/client-phone.validator");
class Client {
    id;
    name;
    address;
    phone;
    email;
    password;
    status;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.address = props.address;
        this.phone = props.phone;
        this.email = props.email;
        this.password = props.password;
        this.status = props.status ?? status_enum_1.Status.ACTIVE;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (!props.name?.trim()) {
            throw new Error('El nombre del cliente es requerido');
        }
        if (props.email && !(0, client_email_validator_1.isValidEmail)(props.email)) {
            throw new Error('El email del cliente no es válido');
        }
        if (props.phone && !(0, client_phone_validator_1.isValidPhone)(props.phone)) {
            throw new Error('El teléfono del cliente no es válido');
        }
        return new Client(props);
    }
    static reconstitute(props) {
        return new Client(props);
    }
    update(props) {
        if (props.name !== undefined) {
            if (!props.name.trim()) {
                throw new Error('El nombre del cliente es requerido');
            }
            this.name = props.name;
        }
        if (props.address !== undefined) {
            this.address = props.address;
        }
        if (props.phone !== undefined) {
            if (props.phone && !(0, client_phone_validator_1.isValidPhone)(props.phone)) {
                throw new Error('El teléfono del cliente no es válido');
            }
            this.phone = props.phone;
        }
        if (props.email !== undefined) {
            if (props.email && !(0, client_email_validator_1.isValidEmail)(props.email)) {
                throw new Error('El email del cliente no es válido');
            }
            this.email = props.email;
        }
        if (props.password !== undefined) {
            this.password = props.password;
        }
    }
    deactivate() {
        this.status = status_enum_1.Status.INACTIVE;
    }
}
exports.Client = Client;
//# sourceMappingURL=client.entity.js.map