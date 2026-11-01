"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const client_routes_1 = require("../features/business/client/client.routes");
const product_type_routes_1 = require("../features/business/product-type/product-type.routes");
const product_routes_1 = require("../features/business/product/product.routes");
const branch_routes_1 = require("../features/business/branch/branch.routes");
const supplier_routes_1 = require("../features/business/supplier/supplier.routes");
const inventory_routes_1 = require("../features/business/inventory/inventory.routes");
const payment_routes_1 = require("../features/business/payment/payment.routes");
const purchase_routes_1 = require("../features/business/purchase/purchase.routes");
const sale_routes_1 = require("../features/business/sale/sale.routes");
const return_routes_1 = require("../features/business/return/return.routes");
const user_routes_1 = require("../features/auth/user/user.routes");
const role_routes_1 = require("../features/auth/role/role.routes");
const resource_routes_1 = require("../features/auth/resource/resource.routes");
const role_user_routes_1 = require("../features/auth/role-user/role-user.routes");
const resource_role_routes_1 = require("../features/auth/resource-role/resource-role.routes");
const refresh_token_routes_1 = require("../features/auth/refresh-token/refresh-token.routes");
const session_routes_1 = require("../features/auth/session/session.routes");
class Routes {
    constructor() {
        this.clientRoutes = new client_routes_1.ClientRoutes();
        this.productTypeRoutes = new product_type_routes_1.ProductTypeRoutes();
        this.productRoutes = new product_routes_1.ProductRoutes();
        this.branchRoutes = new branch_routes_1.BranchRoutes();
        this.supplierRoutes = new supplier_routes_1.SupplierRoutes();
        this.inventoryRoutes = new inventory_routes_1.InventoryRoutes();
        this.paymentRoutes = new payment_routes_1.PaymentRoutes();
        this.purchaseRoutes = new purchase_routes_1.PurchaseRoutes();
        this.saleRoutes = new sale_routes_1.SaleRoutes();
        this.returnRoutes = new return_routes_1.ReturnRoutes();
        this.userRoutes = new user_routes_1.UserRoutes();
        this.roleRoutes = new role_routes_1.RoleRoutes();
        this.resourceRoutes = new resource_routes_1.ResourceRoutes();
        this.roleUserRoutes = new role_user_routes_1.RoleUserRoutes();
        this.resourceRoleRoutes = new resource_role_routes_1.ResourceRoleRoutes();
        this.refreshTokenRoutes = new refresh_token_routes_1.RefreshTokenRoutes();
        this.sessionRoutes = new session_routes_1.SessionRoutes();
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map