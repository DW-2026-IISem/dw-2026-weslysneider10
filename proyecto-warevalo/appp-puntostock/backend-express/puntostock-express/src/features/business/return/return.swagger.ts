/**
 * Documentación OpenAPI del feature Return.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Leyenda: endpoints documentados como SIN AUTH (sin middleware JWT).
 */
export const returnSwagger = {
  tags: [
    {
      name: "Returns",
      description: "Devoluciones sobre líneas vendidas — **SIN AUTH** (sin middleware JWT)",
    },
  ],
  paths: {
    "/api/devoluciones": {
      get: {
        tags: ["Returns"],
        summary: "Listar devoluciones (filtros opcionales)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "saleDetailId", in: "query", required: false, schema: { type: "integer" } },
          { name: "estado", in: "query", required: false, schema: { type: "string", enum: ["pending", "approved", "rejected"] } },
        ],
        responses: {
          "200": { description: "Lista de devoluciones" },
        },
      },
      post: {
        tags: ["Returns"],
        summary: "Registrar devolución (queda pending)",
        description: "SIN AUTH — valida que no supere lo vendido menos lo ya devuelto",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ReturnCreate" },
            },
          },
        },
        responses: {
          "201": { description: "Devolución registrada" },
          "400": { description: "Cantidad inválida" },
          "404": { description: "SaleDetail no encontrado" },
        },
      },
    },
    "/api/devoluciones/{id}": {
      get: {
        tags: ["Returns"],
        summary: "Obtener devolución por id",
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
        tags: ["Returns"],
        summary: "Eliminar devolución (físico, solo si NO está approved)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": { description: "Eliminada" },
          "400": { description: "Ya estaba aprobada" },
          "404": { description: "No encontrada" },
        },
      },
    },
    "/api/devoluciones/{id}/approve": {
      patch: {
        tags: ["Returns"],
        summary: "Aprobar devolución (restaura Inventario)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": { description: "Aprobada" },
          "400": { description: "No estaba pending" },
          "404": { description: "No encontrada" },
        },
      },
    },
    "/api/devoluciones/{id}/reject": {
      patch: {
        tags: ["Returns"],
        summary: "Rechazar devolución",
        description: "SIN AUTH — no toca Inventario",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": { description: "Rechazada" },
          "400": { description: "No estaba pending" },
          "404": { description: "No encontrada" },
        },
      },
    },
  },
  components: {
    schemas: {
      ReturnCreate: {
        type: "object",
        required: ["saleDetailId", "motivo", "cantidad"],
        properties: {
          saleDetailId: { type: "integer" },
          motivo: { type: "string" },
          cantidad: { type: "integer" },
        },
      },
    },
  },
};
