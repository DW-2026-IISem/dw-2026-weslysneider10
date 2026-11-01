"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOpenApiDocument = buildOpenApiDocument;
exports.setupSwagger = setupSwagger;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const client_swagger_1 = require("../features/business/client/client.swagger");
const product_type_swagger_1 = require("../features/business/product-type/product-type.swagger");
const product_swagger_1 = require("../features/business/product/product.swagger");
const branch_swagger_1 = require("../features/business/branch/branch.swagger");
const supplier_swagger_1 = require("../features/business/supplier/supplier.swagger");
const inventory_swagger_1 = require("../features/business/inventory/inventory.swagger");
const payment_swagger_1 = require("../features/business/payment/payment.swagger");
const purchase_swagger_1 = require("../features/business/purchase/purchase.swagger");
const sale_swagger_1 = require("../features/business/sale/sale.swagger");
const return_swagger_1 = require("../features/business/return/return.swagger");
const session_swagger_1 = require("../features/auth/session/session.swagger");
const user_swagger_1 = require("../features/auth/user/user.swagger");
const role_swagger_1 = require("../features/auth/role/role.swagger");
const resource_swagger_1 = require("../features/auth/resource/resource.swagger");
const role_user_swagger_1 = require("../features/auth/role-user/role-user.swagger");
const resource_role_swagger_1 = require("../features/auth/resource-role/resource-role.swagger");
const refresh_token_swagger_1 = require("../features/auth/refresh-token/refresh-token.swagger");
const featureSwaggerModules = [
    client_swagger_1.clientSwagger,
    product_type_swagger_1.productTypeSwagger,
    product_swagger_1.productSwagger,
    branch_swagger_1.branchSwagger,
    supplier_swagger_1.supplierSwagger,
    inventory_swagger_1.inventorySwagger,
    payment_swagger_1.paymentSwagger,
    purchase_swagger_1.purchaseSwagger,
    sale_swagger_1.saleSwagger,
    return_swagger_1.returnSwagger,
    session_swagger_1.sessionSwagger,
    user_swagger_1.userSwagger,
    role_swagger_1.roleSwagger,
    resource_swagger_1.resourceSwagger,
    role_user_swagger_1.roleUserSwagger,
    resource_role_swagger_1.resourceRoleSwagger,
    refresh_token_swagger_1.refreshTokenSwagger,
];
function buildOpenApiDocument() {
    const tags = [];
    const paths = {};
    const schemas = {};
    for (const mod of featureSwaggerModules) {
        tags.push(...mod.tags);
        Object.assign(paths, mod.paths);
        if (mod.components?.schemas) {
            Object.assign(schemas, mod.components.schemas);
        }
    }
    return {
        openapi: "3.0.3",
        info: {
            title: "PuntoStock-express API",
            version: "1.0.0",
            description: "API PuntoStock-express (Express + Sequelize) con autenticación JWT y autorización RBAC.",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: "Local",
            },
        ],
        tags,
        security: [
            {
                bearerAuth: [],
            },
        ],
        paths,
        components: {
            schemas,
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Ingrese el JWT obtenido mediante el endpoint de login.",
                },
            },
            responses: {
                Unauthorized: {
                    description: "No autenticado o token inválido.",
                },
                Forbidden: {
                    description: "No tiene permisos suficientes para realizar esta operación.",
                },
                NotFound: {
                    description: "Recurso no encontrado.",
                },
                InternalServerError: {
                    description: "Error interno del servidor.",
                },
            },
        },
    };
}
function setupSwagger(app) {
    const document = buildOpenApiDocument();
    app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(document));
    app.get("/api/docs.json", (_req, res) => {
        res.json(document);
    });
    console.log("📘 Swagger UI: /api/docs | OpenAPI JSON: /api/docs.json");
}
//# sourceMappingURL=index.js.map