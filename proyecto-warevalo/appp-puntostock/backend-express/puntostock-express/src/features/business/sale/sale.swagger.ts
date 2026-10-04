/**
 * Documentación OpenAPI del feature Sale.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Leyenda: endpoints documentados como SIN AUTH (sin middleware JWT).
 */
export const saleSwagger = {
  tags: [
    {
      name: "Sales",
      description: "Ventas con validación y descuento de Inventario — **SIN AUTH** (sin middleware JWT)",
    },
  ],
  paths: {
    "/api/ventas": {
      get: {
        tags: ["Sales"],
        summary: "Listar ventas (filtros opcionales)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "clientId", in: "query", required: false, schema: { type: "integer" } },
          { name: "branchId", in: "query", required: false, schema: { type: "integer" } },
          { name: "estado", in: "query", required: false, schema: { type: "string", enum: ["completed", "cancelled"] } },
        ],
        responses: {
          "200": { description: "Lista de ventas" },
        },
      },
      post: {
        tags: ["Sales"],
        summary: "Registrar venta (valida y descuenta Inventario)",
        description: "SIN AUTH",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SaleCreate" },
            },
          },
        },
        responses: {
          "201": { description: "Venta creada" },
          "400": { description: "Disponibilidad insuficiente" },
          "404": { description: "Cliente, sucursal o producto no encontrado" },
        },
      },
    },
    "/api/ventas/{id}": {
      get: {
        tags: ["Sales"],
        summary: "Obtener venta por id (con detalle)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": { description: "Encontrada" },
          "404": { description: "No encontrada" },
        },
      },
      delete: {
        tags: ["Sales"],
        summary: "Eliminar venta (físico, cabecera + detalle)",
        description: "SIN AUTH — no restaura inventario",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": { description: "Eliminada" },
          "404": { description: "No encontrada" },
        },
      },
    },
    "/api/ventas/{id}/cancel": {
      patch: {
        tags: ["Sales"],
        summary: "Cancelar venta (restaura Inventario)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": { description: "Cancelada" },
          "400": { description: "Ya estaba cancelada" },
          "404": { description: "No encontrada" },
        },
      },
    },
  },
  components: {
    schemas: {
      SaleCreate: {
        type: "object",
        required: ["clientId", "branchId", "items"],
        properties: {
          clientId: { type: "integer" },
          branchId: { type: "integer" },
          impuestos: { type: "number", default: 0 },
          items: {
            type: "array",
            items: {
              type: "object",
              required: ["productId", "cantidad", "valorUnitario"],
              properties: {
                productId: { type: "integer" },
                cantidad: { type: "integer" },
                valorUnitario: { type: "number" },
                observaciones: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};
