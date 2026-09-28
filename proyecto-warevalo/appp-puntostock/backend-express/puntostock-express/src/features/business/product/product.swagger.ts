/**
 * Documentación OpenAPI del feature Product.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Leyenda: endpoints documentados como SIN AUTH (sin middleware JWT).
 */
export const productSwagger = {
  tags: [
    {
      name: "Products",
      description: "CRUD de productos — **SIN AUTH** (sin middleware JWT)",
    },
  ],
  paths: {
    "/api/productos": {
      get: {
        tags: ["Products"],
        summary: "Listar productos activos",
        description: "SIN AUTH — retorna productos con status=active",
        security: [],
        responses: {
          "200": {
            description: "Lista de productos",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    products: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Product" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Products"],
        summary: "Crear producto",
        description: "SIN AUTH — productTypeId debe existir y estar active",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductCreate" },
            },
          },
        },
        responses: {
          "201": {
            description: "Producto creado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    product: { $ref: "#/components/schemas/Product" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/productos/{id}": {
      get: {
        tags: ["Products"],
        summary: "Obtener producto por id",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": {
            description: "Producto encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    product: { $ref: "#/components/schemas/Product" },
                  },
                },
              },
            },
          },
          "404": { description: "No encontrado" },
        },
      },
      put: {
        tags: ["Products"],
        summary: "Actualizar producto (PUT — reemplazo)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductUpdate" },
            },
          },
        },
        responses: {
          "200": { description: "Actualizado" },
          "404": { description: "No encontrado" },
        },
      },
      patch: {
        tags: ["Products"],
        summary: "Actualizar producto (PATCH — parcial)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductPatch" },
            },
          },
        },
        responses: {
          "200": { description: "Actualizado" },
          "404": { description: "No encontrado" },
        },
      },
      delete: {
        tags: ["Products"],
        summary: "Eliminar producto (físico)",
        description: "SIN AUTH — borra la fila",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": { description: "Eliminado" },
          "404": { description: "No encontrado" },
        },
      },
    },
    "/api/productos/{id}/deactivate": {
      patch: {
        tags: ["Products"],
        summary: "Eliminar producto (lógico)",
        description: "SIN AUTH — status = inactive",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": { description: "Desactivado" },
          "404": { description: "No encontrado" },
        },
      },
    },
  },
  components: {
    schemas: {
      Product: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          sku: { type: "string", example: "COLA-350ML" },
          name: { type: "string", example: "Cola 350ml" },
          description: { type: "string", example: "Bebida gaseosa sabor cola", nullable: true },
          price: { type: "number", example: 2500 },
          productTypeId: { type: "integer", example: 1 },
          status: { type: "string", enum: ["active", "inactive"], example: "active" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      ProductCreate: {
        type: "object",
        required: ["sku", "name", "price", "productTypeId"],
        properties: {
          sku: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          price: { type: "number" },
          productTypeId: { type: "integer" },
          status: { type: "string", enum: ["active", "inactive"], default: "active" },
        },
      },
      ProductUpdate: {
        type: "object",
        required: ["sku", "name", "price", "productTypeId"],
        properties: {
          sku: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          price: { type: "number" },
          productTypeId: { type: "integer" },
          status: { type: "string", enum: ["active", "inactive"] },
        },
      },
      ProductPatch: {
        type: "object",
        properties: {
          sku: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          price: { type: "number" },
          productTypeId: { type: "integer" },
          status: { type: "string", enum: ["active", "inactive"] },
        },
      },
    },
  },
};
