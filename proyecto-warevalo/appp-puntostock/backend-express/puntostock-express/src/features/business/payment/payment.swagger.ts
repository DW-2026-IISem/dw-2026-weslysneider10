export const paymentSwagger = {
  tags: [
    {
      name: "Payments",
      description: "Gestión de pagos de ventas",
    },
  ],

  paths: {
    "/api/payments": {
      get: {
        tags: ["Payments"],
        summary: "Obtener todos los pagos",
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

    "/api/payments/{id}": {
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
        summary: "Cancelar un pago",
      },
    },
  },
};
