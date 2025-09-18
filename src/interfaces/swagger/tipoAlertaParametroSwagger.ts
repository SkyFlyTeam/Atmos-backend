export const tipoAlertaParametroSwagger = {
  "/tipo-alerta-parametro": {
    post: {
      summary: "Criar um novo relacionamento entre tipo de alerta e parâmetro",
      requestBody: {
        description: "Dados do relacionamento para criar",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                Tipo_parametro_p: { type: "integer", description: "ID do tipo de parâmetro" },
                Tipo_Alerta_pk: { type: "integer", description: "ID do tipo de alerta" },
              },
              required: ["Tipo_parametro_p", "Tipo_Alerta_pk"],
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Relacionamento criado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  Tipo_parametro_p: { type: "integer" },
                  Tipo_Alerta_pk: { type: "integer" },
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
      summary: "Listar todos os relacionamentos entre tipos de alertas e parâmetros",
      responses: {
        "200": {
          description: "Lista de relacionamentos",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    Tipo_parametro_p: { type: "integer" },
                    Tipo_Alerta_pk: { type: "integer" },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Nenhum relacionamento encontrado",
        },
      },
    },
  },
  "/tipo-alerta-parametro/tipo-alerta/{tipoAlertaPk}": {
    get: {
      summary: "Listar parâmetros relacionados a um tipo de alerta",
      parameters: [
        {
          in: "path",
          name: "tipoAlertaPk",
          required: true,
          schema: { type: "integer" },
          description: "ID do tipo de alerta",
        },
      ],
      responses: {
        "200": {
          description: "Lista de parâmetros relacionados ao tipo de alerta",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    Tipo_parametro_p: { type: "integer" },
                    Tipo_Alerta_pk: { type: "integer" },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Nenhum parâmetro relacionado encontrado",
        },
      },
    },
  },
  "/tipo-alerta-parametro/tipo-parametro/{tipoParametroPk}": {
    get: {
      summary: "Listar tipos de alertas relacionados a um tipo de parâmetro",
      parameters: [
        {
          in: "path",
          name: "tipoParametroPk",
          required: true,
          schema: { type: "integer" },
          description: "ID do tipo de parâmetro",
        },
      ],
      responses: {
        "200": {
          description: "Lista de tipos de alertas relacionados ao parâmetro",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    Tipo_parametro_p: { type: "integer" },
                    Tipo_Alerta_pk: { type: "integer" },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Nenhum tipo de alerta relacionado encontrado",
        },
      },
    },
  },
  "/tipo-alerta-parametro/{tipoAlertaPk}/{tipoParametroPk}": {
    put: {
      summary: "Atualizar um relacionamento entre tipo de alerta e parâmetro",
      parameters: [
        {
          in: "path",
          name: "tipoAlertaPk",
          required: true,
          schema: { type: "integer" },
          description: "ID do tipo de alerta",
        },
        {
          in: "path",
          name: "tipoParametroPk",
          required: true,
          schema: { type: "integer" },
          description: "ID do tipo de parâmetro",
        },
      ],
      requestBody: {
        description: "Dados do relacionamento para atualizar",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                Tipo_parametro_p: { type: "integer", description: "ID do tipo de parâmetro" },
                Tipo_Alerta_pk: { type: "integer", description: "ID do tipo de alerta" },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Relacionamento atualizado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  Tipo_parametro_p: { type: "integer" },
                  Tipo_Alerta_pk: { type: "integer" },
                },
              },
            },
          },
        },
        "404": {
          description: "Relacionamento não encontrado",
        },
      },
    },
    delete: {
      summary: "Excluir um relacionamento entre tipo de alerta e parâmetro",
      parameters: [
        {
          in: "path",
          name: "tipoAlertaPk",
          required: true,
          schema: { type: "integer" },
          description: "ID do tipo de alerta",
        },
        {
          in: "path",
          name: "tipoParametroPk",
          required: true,
          schema: { type: "integer" },
          description: "ID do tipo de parâmetro",
        },
      ],
      responses: {
        "204": {
          description: "Relacionamento deletado com sucesso",
        },
        "404": {
          description: "Relacionamento não encontrado",
        },
      },
    },
  },
};

