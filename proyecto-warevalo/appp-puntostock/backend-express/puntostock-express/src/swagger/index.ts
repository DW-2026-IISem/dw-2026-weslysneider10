import { Application } from "express";

import swaggerUi from "swagger-ui-express";

import { clientSwagger } from "../features/business/client/client.swagger";
import { productTypeSwagger } from "../features/business/product-type/product-type.swagger";
import { productSwagger } from "../features/business/product/product.swagger";
import { branchSwagger } from "../features/business/branch/branch.swagger";
import { supplierSwagger } from "../features/business/supplier/supplier.swagger";
import { inventorySwagger } from "../features/business/inventory/inventory.swagger";
import { paymentSwagger } from "../features/business/payment/payment.swagger";
import { purchaseSwagger } from "../features/business/purchase/purchase.swagger";
import { saleSwagger } from "../features/business/sale/sale.swagger";
import { returnSwagger } from "../features/business/return/return.swagger";
import { sessionSwagger } from "../features/auth/session/session.swagger";

export type FeatureSwaggerModule = {
  tags: unknown[];
  paths: Record<string, unknown>;
  components?: {
    schemas?: Record<string, unknown>;
  };
};

/**
 * Registry externo: importa la documentación OpenAPI
 * de cada feature.
 */
const featureSwaggerModules: FeatureSwaggerModule[] = [
  clientSwagger,
  productTypeSwagger,
  productSwagger,
  branchSwagger,
  supplierSwagger,
  inventorySwagger,
  paymentSwagger,
  purchaseSwagger,
  saleSwagger,
  returnSwagger,
  sessionSwagger,
];

export function buildOpenApiDocument() {

  const tags: unknown[] = [];
  const paths: Record<string, unknown> = {};
  const schemas: Record<string, unknown> = {};

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
      description:
        "API PuntoStock-express (Express + Sequelize). Los endpoints de Client están documentados como SIN AUTH. Todas las rutas business son SIN AUTH en este lab.",
    },

    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Local",
      },
    ],

    tags,

    paths,

    components: {
      schemas,
    },

  };

}

/**
 * Monta Swagger UI y el JSON OpenAPI.
 */
export function setupSwagger(app: Application): void {

  const document = buildOpenApiDocument();

  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(document)
  );

  app.get("/api/docs.json", (_req, res) => {
    res.json(document);
  });

  console.log(
    "📘 Swagger UI: /api/docs | OpenAPI JSON: /api/docs.json"
  );

}
