export const paymentSwagger = {
  tags: [
    {
      name: "Payments",
      description: "Gestión de pagos de ventas",
    },
  ],

  paths: {
    "/api/pagos": {
      get: {
        tags: ["Payments"],
        summary: "Obtener todos los pagos",
        parameters: [
          {
            name: "saleId",
            in: "query",
            required: false,
            schema: { type: "integer" },
            description: "Filtra los pagos de una venta",
          },
        ],
        responses: {
          200: {
            description: "Lista de pagos",
          },
        },
      },

      post: {
        tags: ["Payments"],
        summary: "Crear un pago",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["saleId", "metodo", "monto"],
                properties: {
                  saleId: {
                    type: "integer",
                  },
                  fecha: {
                    type: "string",
                    format: "date-time",
                  },
                  metodo: {
                    type: "string",
                    enum: ["cash", "card", "transfer"],
                  },
                  monto: {
                    type: "number",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Pago creado correctamente",
          },
        },
      },
    },

    "/api/pagos/{id}": {
      get: {
        tags: ["Payments"],
        summary: "Obtener un pago",
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
            description: "Pago encontrado",
          },
        },
      },

      put: {
        tags: ["Payments"],
        summary: "Actualizar un pago",
      },

      patch: {
        tags: ["Payments"],
        summary: "Actualizar parcialmente un pago",
      },

      delete: {
        tags: ["Payments"],
        summary: "Eliminar físicamente un pago",
      },
    },

    "/api/pagos/{id}/cancel": {
      patch: {
        tags: ["Payments"],
        summary: "Cancelar un pago (borrado lógico: estado = cancelled; libera saldo de la venta)",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Pago cancelado" },
          400: { description: "El pago ya estaba cancelado" },
          404: { description: "Pago no encontrado" },
        },
      },
    },
  },
};
