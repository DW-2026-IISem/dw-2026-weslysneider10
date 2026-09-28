/**
 * Documentación OpenAPI del feature Supplier.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Leyenda: endpoints documentados como SIN AUTH (sin middleware JWT).
 */
export const supplierSwagger = {
  tags: [
    {
      name: "Suppliers",
      description: "CRUD de proveedores — **SIN AUTH** (sin middleware JWT)",
    },
  ],
  paths: {
    "/api/proveedores": {
      get: {
        tags: ["Suppliers"],
        summary: "Listar proveedores activos",
        description: "SIN AUTH — retorna proveedores con isActive=true",
        security: [],
        responses: {
          "200": {
            description: "Lista de proveedores",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    suppliers: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Supplier" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Suppliers"],
        summary: "Crear proveedor",
        description: "SIN AUTH",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SupplierCreate" },
            },
          },
        },
        responses: {
          "201": {
            description: "Proveedor creado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    supplier: { $ref: "#/components/schemas/Supplier" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/proveedores/{id}": {
      get: {
        tags: ["Suppliers"],
        summary: "Obtener proveedor por id",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": {
            description: "Proveedor encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    supplier: { $ref: "#/components/schemas/Supplier" },
                  },
                },
              },
            },
          },
          "404": { description: "No encontrado" },
        },
      },
      put: {
        tags: ["Suppliers"],
        summary: "Actualizar proveedor (PUT — reemplazo)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SupplierUpdate" },
            },
          },
        },
        responses: {
          "200": { description: "Actualizado" },
          "404": { description: "No encontrado" },
        },
      },
      patch: {
        tags: ["Suppliers"],
        summary: "Actualizar proveedor (PATCH — parcial)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SupplierPatch" },
            },
          },
        },
        responses: {
          "200": { description: "Actualizado" },
          "404": { description: "No encontrado" },
        },
      },
      delete: {
        tags: ["Suppliers"],
        summary: "Eliminar proveedor (físico)",
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
    "/api/proveedores/{id}/deactivate": {
      patch: {
        tags: ["Suppliers"],
        summary: "Eliminar proveedor (lógico)",
        description: "SIN AUTH — isActive = false",
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
      Supplier: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nit: { type: "string", example: "900123456-7" },
          razonSocial: { type: "string", example: "Distribuidora La Guajira SAS" },
          contacto: { type: "string", example: "Carlos Ramírez", nullable: true },
          telefono: { type: "string", example: "3005551234", nullable: true },
          email: { type: "string", example: "contacto@distriguajira.com", nullable: true },
          isActive: { type: "boolean", example: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      SupplierCreate: {
        type: "object",
        required: ["nit", "razonSocial"],
        properties: {
          nit: { type: "string" },
          razonSocial: { type: "string" },
          contacto: { type: "string" },
          telefono: { type: "string" },
          email: { type: "string" },
          isActive: { type: "boolean", default: true },
        },
      },
      SupplierUpdate: {
        type: "object",
        required: ["nit", "razonSocial"],
        properties: {
          nit: { type: "string" },
          razonSocial: { type: "string" },
          contacto: { type: "string" },
          telefono: { type: "string" },
          email: { type: "string" },
          isActive: { type: "boolean" },
        },
      },
      SupplierPatch: {
        type: "object",
        properties: {
          nit: { type: "string" },
          razonSocial: { type: "string" },
          contacto: { type: "string" },
          telefono: { type: "string" },
          email: { type: "string" },
          isActive: { type: "boolean" },
        },
      },
    },
  },
};
