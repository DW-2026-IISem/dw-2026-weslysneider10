/**
 * Documentación OpenAPI del feature Inventory.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Leyenda: endpoints documentados como SIN AUTH (sin middleware JWT).
 */
export const inventorySwagger = {
  tags: [
    {
      name: "Inventories",
      description: "Inventario por sucursal y producto — **SIN AUTH** (sin middleware JWT)",
    },
  ],
  paths: {
    "/api/inventarios": {
      get: {
        tags: ["Inventories"],
        summary: "Listar inventario (filtro opcional branchId/productId)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "branchId", in: "query", required: false, schema: { type: "integer" } },
          { name: "productId", in: "query", required: false, schema: { type: "integer" } },
        ],
        responses: {
          "200": {
            description: "Lista de inventario",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    inventories: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Inventory" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Inventories"],
        summary: "Crear registro de inventario",
        description: "SIN AUTH — branchId+productId deben existir y no estar duplicados",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/InventoryCreate" },
            },
          },
        },
        responses: {
          "201": {
            description: "Registro creado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    inventory: { $ref: "#/components/schemas/Inventory" },
                  },
                },
              },
            },
          },
          "409": { description: "Ya existe inventario para esa sucursal+producto" },
        },
      },
    },
    "/api/inventarios/low-stock": {
      get: {
        tags: ["Inventories"],
        summary: "Alertas de reposición (cantidad <= stock mínimo)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "branchId", in: "query", required: false, schema: { type: "integer" } },
        ],
        responses: {
          "200": {
            description: "Registros con stock bajo",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    inventories: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Inventory" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/inventarios/{id}": {
      get: {
        tags: ["Inventories"],
        summary: "Obtener registro de inventario por id",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": { description: "Encontrado" },
          "404": { description: "No encontrado" },
        },
      },
      put: {
        tags: ["Inventories"],
        summary: "Actualizar cantidad/stock mínimo (PUT)",
        description: "SIN AUTH — no permite cambiar branchId/productId",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/InventoryUpdate" },
            },
          },
        },
        responses: {
          "200": { description: "Actualizado" },
          "404": { description: "No encontrado" },
        },
      },
      patch: {
        tags: ["Inventories"],
        summary: "Actualizar cantidad/stock mínimo (PATCH — parcial)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/InventoryPatch" },
            },
          },
        },
        responses: {
          "200": { description: "Actualizado" },
          "404": { description: "No encontrado" },
        },
      },
      delete: {
        tags: ["Inventories"],
        summary: "Eliminar registro de inventario (físico)",
        description: "SIN AUTH — no hay borrado lógico para Inventory",
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
  },
  components: {
    schemas: {
      Inventory: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          branchId: { type: "integer", example: 1 },
          productId: { type: "integer", example: 1 },
          quantity: { type: "integer", example: 20 },
          minStock: { type: "integer", example: 5 },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      InventoryCreate: {
        type: "object",
        required: ["branchId", "productId"],
        properties: {
          branchId: { type: "integer" },
          productId: { type: "integer" },
          quantity: { type: "integer", default: 0 },
          minStock: { type: "integer", default: 0 },
        },
      },
      InventoryUpdate: {
        type: "object",
        required: ["quantity", "minStock"],
        properties: {
          quantity: { type: "integer" },
          minStock: { type: "integer" },
        },
      },
      InventoryPatch: {
        type: "object",
        properties: {
          quantity: { type: "integer" },
          minStock: { type: "integer" },
        },
      },
    },
  },
};
