import { ClientRoutes } from "../features/business/client/client.routes";
import { ProductTypeRoutes } from "../features/business/product-type/product-type.routes";
import { ProductRoutes } from "../features/business/product/product.routes";
import { BranchRoutes } from "../features/business/branch/branch.routes";

export class Routes {

  public clientRoutes: ClientRoutes = new ClientRoutes();
  public productTypeRoutes: ProductTypeRoutes = new ProductTypeRoutes();
  public productRoutes: ProductRoutes = new ProductRoutes();
  public branchRoutes: BranchRoutes = new BranchRoutes();
}
