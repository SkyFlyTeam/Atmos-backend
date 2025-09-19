export const tipoAlertaSwagger = {
  "/tipo-alerta": {
    post: {
      summary: "Criar um novo tipo de alerta",
      requestBody: {
        description: "Dados do tipo de alerta para criar",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                tipo: { type: "string", nullable: true },
                descricao: { type: "string", nullable: true },
                publica: { type: "boolean", nullable: true },
                tipo_alarme: { type: "integer", nullable: true },
                p1: { type: "number", nullable: true },
                p2: { type: "number", nullable: true },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Tipo de alerta criado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  tipo: { type: "string", nullable: true },
                  descricao: { type: "string", nullable: true },
                  publica: { type: "boolean", nullable: true },
                  tipo_alarme: { type: "integer", nullable: true },
                  p1: { type: "number", nullable: true },
                  p2: { type: "number", nullable: true },
                },
              },
            },
          },
        },
        "400": {
          description: "Erro de validação",
        },
      },
    },
    get: {
      summary: "Listar todos os tipos de alertas",
      responses: {
        "200": {
          description: "Lista de tipos de alertas",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    pk: { type: "integer" },
                    tipo: { type: "string", nullable: true },
                    descricao: { type: "string", nullable: true },
                    publica: { type: "boolean", nullable: true },
                    tipo_alarme: { type: "integer", nullable: true },
                    p1: { type: "number", nullable: true },
                    p2: { type: "number", nullable: true },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Nenhum tipo de alerta encontrado",
        },
      },
    },
  },
  "/tipo-alerta/{pk}": {
    get: {
      summary: "Obter um tipo de alerta pelo ID",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID do tipo de alerta",
        },
      ],
      responses: {
        "200": {
          description: "Tipo de alerta encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  tipo: { type: "string", nullable: true },
                  descricao: { type: "string", nullable: true },
                  publica: { type: "boolean", nullable: true },
                  tipo_alarme: { type: "integer", nullable: true },
                  p1: { type: "number", nullable: true },
                  p2: { type: "number", nullable: true },
                },
              },
            },
          },
        },
        "404": {
          description: "Tipo de alerta não encontrado",
        },
      },
    },
    put: {
      summary: "Atualizar um tipo de alerta",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID do tipo de alerta",
        },
      ],
      requestBody: {
        description: "Dados do tipo de alerta para atualizar",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                tipo: { type: "string", nullable: true },
                descricao: { type: "string", nullable: true },
                publica: { type: "boolean", nullable: true },
                tipo_alarme: { type: "integer", nullable: true },
                p1: { type: "number", nullable: true },
                p2: { type: "number", nullable: true },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Tipo de alerta atualizado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  tipo: { type: "string", nullable: true },
                  descricao: { type: "string", nullable: true },
                  publica: { type: "boolean", nullable: true },
                  tipo_alarme: { type: "integer", nullable: true },
                  p1: { type: "number", nullable: true },
                  p2: { type: "number", nullable: true },
                },
              },
            },
          },
        },
        "404": {
          description: "Tipo de alerta não encontrado",
        },
      },
    },
    delete: {
      summary: "Excluir um tipo de alerta",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID do tipo de alerta",
        },
      ],
      responses: {
        "204": {
          description: "Tipo de alerta deletado com sucesso",
        },
        "404": {
          description: "Tipo de alerta não encontrado",
        },
      },
    },
  },
};

