import { ClientRoutes } from "../features/business/client/client.routes";
import { ProductTypeRoutes } from "../features/business/product-type/product-type.routes";
export class Routes {

  public clientRoutes: ClientRoutes = new ClientRoutes();
  public productTypeRoutes: ProductTypeRoutes = new ProductTypeRoutes();
}
