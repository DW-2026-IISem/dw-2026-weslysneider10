/**
 * Documentación OpenAPI del feature Purchase.
 * Endpoints SIN AUTH.
 */

export const purchaseSwagger = {

  tags: [
    {
      name: "Purchases",
      description: "Compras y detalles de compra — SIN AUTH",
    },
  ],

  paths: {

    "/api/compras": {

      get: {
        tags: ["Purchases"],
        summary: "Listar compras",
        description: "SIN AUTH",
        security: [],
        responses: {
          200: {
            description: "Lista de compras",
          },
        },
      },

      post: {
        tags: ["Purchases"],
        summary: "Crear compra con detalles",
        description: "SIN AUTH",
        security: [],

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PurchaseCreate",
              },
            },
          },
        },

        responses: {
          201: {
            description: "Compra creada",
          },
          400: {
            description: "Datos inválidos",
          },
          404: {
            description: "Proveedor o producto no encontrado",
          },
        },
      },
    },

    "/api/compras/{id}": {

      get: {
        tags: ["Purchases"],
        summary: "Obtener una compra",
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
          200: {
            description: "Compra encontrada",
          },
          404: {
            description: "Compra no encontrada",
          },
        },
      },

      put: {
        tags: ["Purchases"],
        summary: "Actualizar compra completamente",
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
                $ref: "#/components/schemas/PurchaseUpdate",
              },
            },
          },
        },

        responses: {
          200: {
            description: "Compra actualizada",
          },
        },
      },

      patch: {
        tags: ["Purchases"],
        summary: "Actualizar compra parcialmente",
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
                $ref: "#/components/schemas/PurchasePatch",
              },
            },
          },
        },

        responses: {
          200: {
            description: "Compra actualizada",
          },
        },
      },

      delete: {
        tags: ["Purchases"],
        summary: "Eliminar compra físicamente",
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
          200: {
            description: "Compra eliminada",
          },
        },
      },
    },

    "/api/compras/{id}/detalles": {

      get: {
        tags: ["Purchases"],
        summary: "Obtener detalles de una compra",
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
          200: {
            description: "Detalles encontrados",
          },
        },
      },
    },

    "/api/compras/{id}/receive": {

      patch: {
        tags: ["Purchases"],
        summary: "Recibir compra",
        description: "Registra la recepción y suma cantidades al inventario. SIN AUTH",
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
                $ref: "#/components/schemas/PurchaseReceive",
              },
            },
          },
        },

        responses: {
          200: {
            description: "Compra recibida",
          },
        },
      },
    },

    "/api/compras/{id}/deactivate": {

      patch: {
        tags: ["Purchases"],
        summary: "Cancelar compra",
        description: "Borrado lógico de la compra. SIN AUTH",
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
          200: {
            description: "Compra cancelada",
          },
        },
      },
    },
  },

  components: {

    schemas: {

      PurchaseCreate: {
        type: "object",

        required: [
          "supplierId",
          "details",
        ],

        properties: {

          supplierId: {
            type: "integer",
            example: 1,
          },

          date: {
            type: "string",
            format: "date-time",
          },

          taxes: {
            type: "number",
            example: 19000,
          },

          status: {
            type: "string",
            example: "pending",
          },

          details: {
            type: "array",

            items: {
              $ref: "#/components/schemas/PurchaseDetailCreate",
            },
          },
        },
      },

      PurchaseDetailCreate: {
        type: "object",

        required: [
          "productId",
          "quantity",
          "unitPrice",
        ],

        properties: {

          productId: {
            type: "integer",
            example: 1,
          },

          quantity: {
            type: "integer",
            example: 10,
          },

          unitPrice: {
            type: "number",
            example: 15000,
          },

          observations: {
            type: "string",
            example: "Compra inicial",
          },
        },
      },

      PurchaseUpdate: {
        type: "object",

        required: [
          "supplierId",
          "date",
          "subtotal",
          "taxes",
          "total",
          "status",
        ],

        properties: {

          supplierId: {
            type: "integer",
          },

          date: {
            type: "string",
            format: "date-time",
          },

          subtotal: {
            type: "number",
          },

          taxes: {
            type: "number",
          },

          total: {
            type: "number",
          },

          status: {
            type: "string",
          },
        },
      },

      PurchasePatch: {
        type: "object",

        properties: {

          supplierId: {
            type: "integer",
          },

          date: {
            type: "string",
            format: "date-time",
          },

          subtotal: {
            type: "number",
          },

          taxes: {
            type: "number",
          },

          total: {
            type: "number",
          },

          status: {
            type: "string",
          },
        },
      },

      PurchaseReceive: {
        type: "object",

        required: [
          "branchId",
          "received",
        ],

        properties: {

          branchId: {
            type: "integer",
            example: 1,
          },

          received: {
            type: "array",

            items: {
              type: "object",

              required: [
                "detailId",
                "quantity",
              ],

              properties: {

                detailId: {
                  type: "integer",
                  example: 1,
                },

                quantity: {
                  type: "integer",
                  example: 5,
                },
              },
            },
          },
        },
      },
    },
  },
};
