import { ClientRoutes } from "../features/business/client/client.routes";
import { ProductTypeRoutes } from "../features/business/product-type/product-type.routes";
import { ProductRoutes } from "../features/business/product/product.routes";
import { BranchRoutes } from "../features/business/branch/branch.routes";
import { SupplierRoutes } from "../features/business/supplier/supplier.routes";
import { InventoryRoutes } from "../features/business/inventory/inventory.routes";
import { PaymentRoutes } from "../features/business/payment/payment.routes";
import { PurchaseRoutes } from "../features/business/purchase/purchase.routes";
import { SaleRoutes } from "../features/business/sale/sale.routes";
import { ReturnRoutes } from "../features/business/return/return.routes";

import { UserRoutes } from "../features/auth/user/user.routes";
import { RoleRoutes } from "../features/auth/role/role.routes";
import { ResourceRoutes } from "../features/auth/resource/resource.routes";

export class Routes {

  public clientRoutes: ClientRoutes = new ClientRoutes();
  public productTypeRoutes: ProductTypeRoutes = new ProductTypeRoutes();
  public productRoutes: ProductRoutes = new ProductRoutes();
  public branchRoutes: BranchRoutes = new BranchRoutes();
  public supplierRoutes: SupplierRoutes = new SupplierRoutes();
  public inventoryRoutes: InventoryRoutes = new InventoryRoutes();
  public paymentRoutes: PaymentRoutes = new PaymentRoutes();
  public purchaseRoutes: PurchaseRoutes = new PurchaseRoutes();
  public saleRoutes: SaleRoutes = new SaleRoutes();
  public returnRoutes: ReturnRoutes = new ReturnRoutes();

  public userRoutes: UserRoutes = new UserRoutes();
  public roleRoutes: RoleRoutes = new RoleRoutes();
  public resourceRoutes: ResourceRoutes = new ResourceRoutes();
}
