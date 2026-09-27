/**
 * Documentación OpenAPI del feature Client.
 *
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Leyenda: endpoints documentados como SIN AUTH
 * (sin middleware JWT).
 */

export const clientSwagger = {

  tags: [
    {
      name: "Clientes",
      description: "CRUD de clientes — SIN AUTH (sin middleware JWT)",
    },
  ],

  paths: {

    "/api/clientes": {

      get: {
        tags: ["Clientes"],
        summary: "Listar clientes activos",
        description:
          "SIN AUTH — retorna clientes con status=active (sin password)",
        security: [],
        responses: {
          "200": {
            description: "Lista de clientes activos",
          },
        },
      },

      post: {
        tags: ["Clientes"],
        summary: "Crear cliente",
        description: "SIN AUTH — crea un nuevo cliente",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ClientCreate",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Cliente creado",
          },
        },
      },

    },

    "/api/clientes/{id}": {

      get: {
        tags: ["Clientes"],
        summary: "Obtener cliente por ID",
        description: "SIN AUTH — retorna un cliente sin password",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Cliente encontrado",
          },
          "404": {
            description: "Cliente no encontrado",
          },
        },
      },

      put: {
        tags: ["Clientes"],
        summary: "Actualizar cliente completo",
        description: "SIN AUTH",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ClientUpdate",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Cliente actualizado",
          },
        },
      },

      patch: {
        tags: ["Clientes"],
        summary: "Actualizar cliente parcialmente",
        description: "SIN AUTH",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ClientPatch",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Cliente actualizado parcialmente",
          },
        },
      },

      delete: {
        tags: ["Clientes"],
        summary: "Eliminar cliente físicamente",
        description: "SIN AUTH",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Cliente eliminado permanentemente",
          },
        },
      },

    },

    "/api/clientes/{id}/deactivate": {

      patch: {
        tags: ["Clientes"],
        summary: "Desactivar cliente",
        description:
          "SIN AUTH — eliminación lógica mediante status=inactive",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Cliente desactivado",
          },
        },
      },

    },

  },

  components: {

    schemas: {

      Client: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          address: { type: "string" },
          phone: { type: "string" },
          email: {
            type: "string",
            format: "email",
            example: "ana@example.com",
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
            example: "active",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      ClientCreate: {
        type: "object",
        required: ["name", "phone", "email", "password"],
        properties: {
          name: { type: "string" },
          address: { type: "string" },
          phone: { type: "string" },
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
            default: "active",
          },
        },
      },

      ClientUpdate: {
        type: "object",
        required: ["name", "phone", "email"],
        properties: {
          name: { type: "string" },
          address: { type: "string" },
          phone: { type: "string" },
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
          },
        },
      },

      ClientPatch: {
        type: "object",
        properties: {
          name: { type: "string" },
          address: { type: "string" },
          phone: { type: "string" },
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
          },
        },
      },

    },

  },

};
