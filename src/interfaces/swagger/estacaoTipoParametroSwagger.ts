export const estacaoTipoParametroSwagger = {
  "/estacao-tipo-parametro": {
    post: {
      summary: "Criar uma ou mais relações estação-tipo parâmetro",
      description: "Aceita estacao_est_pk e tipo_parametro_pk como valores únicos ou arrays. Cria todas as combinações possíveis entre os valores fornecidos.",
      requestBody: {
        description: "Dados da(s) relação(ões) estação-tipo parâmetro para criar",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                estacao_est_pk: { 
                  oneOf: [
                    { type: "integer", description: "ID da estação" },
                    { 
                      type: "array", 
                      items: { type: "integer" },
                      description: "Array de IDs das estações" 
                    }
                  ]
                },
                tipo_parametro_pk: { 
                  oneOf: [
                    { type: "integer", description: "ID do tipo de parâmetro" },
                    { 
                      type: "array", 
                      items: { type: "integer" },
                      description: "Array de IDs dos tipos de parâmetros" 
                    }
                  ]
                },
              },
              required: ["estacao_est_pk", "tipo_parametro_pk"],
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Relação(ões) criada(s) com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", description: "Mensagem de sucesso" },
                  relacoes: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        pk: { type: "integer" },
                        estacao_est_pk: { type: "integer" },
                        tipo_parametro_pk: { type: "integer" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Erro de validação",
        },
        "404": {
          description: "Estação ou tipo de parâmetro não encontrado",
        },
        "409": {
          description: "Uma ou mais relações já existem",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string" },
                  relacoesExistentes: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        estacao_est_pk: { type: "integer" },
                        tipo_parametro_pk: { type: "integer" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    get: {
      summary: "Listar todas as relações estação-tipo parâmetro",
      responses: {
        "200": {
          description: "Lista de relações estação-tipo parâmetro",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    pk: { type: "integer" },
                    estacao_est_pk: { type: "integer" },
                    tipo_parametro_pk: { type: "integer" },
                    estacao: {
                      type: "object",
                      properties: {
                        pk: { type: "integer" },
                        uuid: { type: "string" },
                        nome: { type: "string" },
                        descricao: { type: "string" },
                        status: { type: "boolean" },
                      },
                    },
                    tipoParametro: {
                      type: "object",
                      properties: {
                        pk: { type: "integer" },
                        nome: { type: "string" },
                        tipo: { type: "string" },
                        unidade: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Nenhuma relação encontrada",
        },
      },
    },
  },
  "/estacao-tipo-parametro/{pk}": {
    get: {
      summary: "Obter uma relação estação-tipo parâmetro pelo ID",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID da relação",
        },
      ],
      responses: {
        "200": {
          description: "Relação encontrada",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  estacao_est_pk: { type: "integer" },
                  tipo_parametro_pk: { type: "integer" },
                  estacao: {
                    type: "object",
                    properties: {
                      pk: { type: "integer" },
                      uuid: { type: "string" },
                      nome: { type: "string" },
                      descricao: { type: "string" },
                      status: { type: "boolean" },
                    },
                  },
                  tipoParametro: {
                    type: "object",
                    properties: {
                      pk: { type: "integer" },
                      nome: { type: "string" },
                      tipo: { type: "string" },
                      unidade: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Relação não encontrada",
        },
      },
    },
    put: {
      summary: "Atualizar uma relação estação-tipo parâmetro",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID da relação",
        },
      ],
      requestBody: {
        description: "Dados da relação para atualizar",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                estacao_est_pk: { type: "integer", description: "ID da estação" },
                tipo_parametro_pk: { type: "integer", description: "ID do tipo de parâmetro" },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Relação atualizada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  estacao_est_pk: { type: "integer" },
                  tipo_parametro_pk: { type: "integer" },
                  estacao: {
                    type: "object",
                    properties: {
                      pk: { type: "integer" },
                      uuid: { type: "string" },
                      nome: { type: "string" },
                      descricao: { type: "string" },
                      status: { type: "boolean" },
                    },
                  },
                  tipoParametro: {
                    type: "object",
                    properties: {
                      pk: { type: "integer" },
                      nome: { type: "string" },
                      tipo: { type: "string" },
                      unidade: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Relação, estação ou tipo de parâmetro não encontrado",
        },
        "409": {
          description: "Nova relação já existe",
        },
      },
    },
    delete: {
      summary: "Excluir uma relação estação-tipo parâmetro",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID da relação",
        },
      ],
      responses: {
        "204": {
          description: "Relação deletada com sucesso",
        },
        "404": {
          description: "Relação não encontrada",
        },
      },
    },
  },
  "/estacao-tipo-parametro/estacao/{estacao_pk}": {
    get: {
      summary: "Listar todas as relações de uma estação específica",
      parameters: [
        {
          in: "path",
          name: "estacao_pk",
          required: true,
          schema: { type: "integer" },
          description: "ID da estação",
        },
      ],
      responses: {
        "200": {
          description: "Lista de relações da estação",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    pk: { type: "integer" },
                    estacao_est_pk: { type: "integer" },
                    tipo_parametro_pk: { type: "integer" },
                    tipoParametro: {
                      type: "object",
                      properties: {
                        pk: { type: "integer" },
                        nome: { type: "string" },
                        tipo: { type: "string" },
                        unidade: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Nenhuma relação encontrada para esta estação",
        },
      },
    },
  },
  "/estacao-tipo-parametro/tipo-parametro/{tipo_parametro_pk}": {
    get: {
      summary: "Listar todas as relações de um tipo de parâmetro específico",
      parameters: [
        {
          in: "path",
          name: "tipo_parametro_pk",
          required: true,
          schema: { type: "integer" },
          description: "ID do tipo de parâmetro",
        },
      ],
      responses: {
        "200": {
          description: "Lista de relações do tipo de parâmetro",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    pk: { type: "integer" },
                    estacao_est_pk: { type: "integer" },
                    tipo_parametro_pk: { type: "integer" },
                    estacao: {
                      type: "object",
                      properties: {
                        pk: { type: "integer" },
                        uuid: { type: "string" },
                        nome: { type: "string" },
                        descricao: { type: "string" },
                        status: { type: "boolean" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Nenhuma relação encontrada para este tipo de parâmetro",
        },
      },
    },
  },
  "/estacao-tipo-parametro/estacao/{estacao_pk}/tipo-parametro/{tipo_parametro_pk}": {
    delete: {
      summary: "Excluir uma relação específica entre estação e tipo de parâmetro",
      parameters: [
        {
          in: "path",
          name: "estacao_pk",
          required: true,
          schema: { type: "integer" },
          description: "ID da estação",
        },
        {
          in: "path",
          name: "tipo_parametro_pk",
          required: true,
          schema: { type: "integer" },
          description: "ID do tipo de parâmetro",
        },
      ],
      responses: {
        "204": {
          description: "Relação deletada com sucesso",
        },
        "404": {
          description: "Relação não encontrada",
        },
      },
    },
  },
};
