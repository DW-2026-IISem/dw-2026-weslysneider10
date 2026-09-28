/**
 * Documentación OpenAPI del feature Branch.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Leyenda: endpoints documentados como SIN AUTH (sin middleware JWT).
 */
export const branchSwagger = {
  tags: [
    {
      name: "Branches",
      description: "CRUD de sucursales — **SIN AUTH** (sin middleware JWT)",
    },
  ],
  paths: {
    "/api/sucursales": {
      get: {
        tags: ["Branches"],
        summary: "Listar sucursales activas",
        description: "SIN AUTH — retorna sucursales con status=active",
        security: [],
        responses: {
          "200": {
            description: "Lista de sucursales",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    branches: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Branch" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Branches"],
        summary: "Crear sucursal",
        description: "SIN AUTH",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BranchCreate" },
            },
          },
        },
        responses: {
          "201": {
            description: "Sucursal creada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    branch: { $ref: "#/components/schemas/Branch" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/sucursales/{id}": {
      get: {
        tags: ["Branches"],
        summary: "Obtener sucursal por id",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": {
            description: "Sucursal encontrada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    branch: { $ref: "#/components/schemas/Branch" },
                  },
                },
              },
            },
          },
          "404": { description: "No encontrado" },
        },
      },
      put: {
        tags: ["Branches"],
        summary: "Actualizar sucursal (PUT — reemplazo)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BranchUpdate" },
            },
          },
        },
        responses: {
          "200": { description: "Actualizado" },
          "404": { description: "No encontrado" },
        },
      },
      patch: {
        tags: ["Branches"],
        summary: "Actualizar sucursal (PATCH — parcial)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BranchPatch" },
            },
          },
        },
        responses: {
          "200": { description: "Actualizado" },
          "404": { description: "No encontrado" },
        },
      },
      delete: {
        tags: ["Branches"],
        summary: "Eliminar sucursal (físico)",
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
    "/api/sucursales/{id}/deactivate": {
      patch: {
        tags: ["Branches"],
        summary: "Eliminar sucursal (lógico)",
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
      Branch: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Sucursal Norte" },
          description: { type: "string", example: "Sede principal zona norte", nullable: true },
          status: { type: "string", enum: ["active", "inactive"], example: "active" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      BranchCreate: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          status: { type: "string", enum: ["active", "inactive"], default: "active" },
        },
      },
      BranchUpdate: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          status: { type: "string", enum: ["active", "inactive"] },
        },
      },
      BranchPatch: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          status: { type: "string", enum: ["active", "inactive"] },
        },
      },
    },
  },
};
