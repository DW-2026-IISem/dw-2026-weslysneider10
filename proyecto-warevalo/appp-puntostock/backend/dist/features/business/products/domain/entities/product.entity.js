"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const invalid_product_price_exception_1 = require("../exceptions/invalid-product-price.exception");
class Product {
    id;
    sku;
    name;
    description;
    price;
    quantity;
    isActive;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.sku = props.sku;
        this.name = props.name;
        this.description = props.description;
        this.price = props.price;
        this.quantity = props.quantity ?? 0;
        this.isActive = props.isActive ?? true;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (!props.sku?.trim()) {
            throw new Error('El SKU del producto es requerido');
        }
        if (!props.name?.trim()) {
            throw new Error('El nombre del producto es requerido');
        }
        if (props.price <= 0) {
            throw new invalid_product_price_exception_1.InvalidProductPriceException(props.price);
        }
        if (props.quantity !== undefined && props.quantity < 0) {
            throw new Error('La cantidad en stock no puede ser negativa');
        }
        return new Product(props);
    }
    static reconstitute(props) {
        return new Product(props);
    }
    update(props) {
        if (props.sku !== undefined) {
            if (!props.sku.trim()) {
                throw new Error('El SKU del producto es requerido');
            }
            this.sku = props.sku;
        }
        if (props.name !== undefined) {
            if (!props.name.trim()) {
                throw new Error('El nombre del producto es requerido');
            }
            this.name = props.name;
        }
        if (props.description !== undefined) {
            this.description = props.description;
        }
        if (props.price !== undefined) {
            if (props.price <= 0) {
                throw new invalid_product_price_exception_1.InvalidProductPriceException(props.price);
            }
            this.price = props.price;
        }
        if (props.quantity !== undefined) {
            if (props.quantity < 0) {
                throw new Error('La cantidad en stock no puede ser negativa');
            }
            this.quantity = props.quantity;
        }
    }
    deactivate() {
        this.isActive = false;
    }
    activate() {
        this.isActive = true;
    }
}
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map