import { ClientRoutes } from "../features/business/client/client.routes";
import { ProductTypeRoutes } from "../features/business/product-type/product-type.routes";
import { ProductRoutes } from "../features/business/product/product.routes";
import { BranchRoutes } from "../features/business/branch/branch.routes";
import { SupplierRoutes } from "../features/business/supplier/supplier.routes";
import { InventoryRoutes } from "../features/business/inventory/inventory.routes";
import { PurchaseRoutes } from "../features/business/purchase/purchase.routes";

export class Routes {

  public clientRoutes: ClientRoutes = new ClientRoutes();
  public productTypeRoutes: ProductTypeRoutes = new ProductTypeRoutes();
  public productRoutes: ProductRoutes = new ProductRoutes();
  public branchRoutes: BranchRoutes = new BranchRoutes();
  public supplierRoutes: SupplierRoutes = new SupplierRoutes();
  public inventoryRoutes: InventoryRoutes = new InventoryRoutes();
  public purchaseRoutes: PurchaseRoutes = new PurchaseRoutes();
}
