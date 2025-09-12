export const valorCapturadoSwagger = {
  "/valor-capturado": {
    post: {
      summary: "Criar um novo valor capturado",
      requestBody: {
        description: "Dados do valor capturado para criar",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                unixtime: { type: "string", format: "date-time", description: "Data e hora da captura" },
                Parametros_pk: { type: "integer", description: "ID do parâmetro (EstacaoTipoParametro)" },
                valor: { type: "number", description: "Valor capturado" },
                estacao_id: { type: "integer", description: "ID da estação" },
              },
              required: ["unixtime", "Parametros_pk", "valor", "estacao_id"],
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Valor capturado criado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  unixtime: { type: "string", format: "date-time" },
                  Parametros_pk: { type: "integer" },
                  valor: { type: "number" },
                  estacao_id: { type: "integer" },
                },
              },
            },
          },
        },
        "400": {
          description: "Erro de validação",
        },
        "404": {
          description: "Parâmetro ou estação não encontrado",
        },
      },
    },
    get: {
      summary: "Listar todos os valores capturados",
      responses: {
        "200": {
          description: "Lista de valores capturados",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    pk: { type: "integer" },
                    unixtime: { type: "string", format: "date-time" },
                    Parametros_pk: { type: "integer" },
                    valor: { type: "number" },
                    estacao_id: { type: "integer" },
                    parametro: {
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
                    estacao: {
                      type: "object",
                      properties: {
                        pk: { type: "integer" },
                        uuid: { type: "string" },
                        nome: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Nenhum valor encontrado",
        },
      },
    },
  },
  "/valor-capturado/{pk}": {
    get: {
      summary: "Obter um valor capturado pelo ID",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID do valor capturado",
        },
      ],
      responses: {
        "200": {
          description: "Valor capturado encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  unixtime: { type: "string", format: "date-time" },
                  Parametros_pk: { type: "integer" },
                  valor: { type: "number" },
                  estacao_id: { type: "integer" },
                  parametro: {
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
                  estacao: {
                    type: "object",
                    properties: {
                      pk: { type: "integer" },
                      uuid: { type: "string" },
                      nome: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Valor capturado não encontrado",
        },
      },
    },
    put: {
      summary: "Atualizar um valor capturado",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID do valor capturado",
        },
      ],
      requestBody: {
        description: "Dados do valor para atualizar",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                unixtime: { type: "string", format: "date-time" },
                Parametros_pk: { type: "integer" },
                valor: { type: "number" },
                estacao_id: { type: "integer" },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Valor capturado atualizado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  unixtime: { type: "string", format: "date-time" },
                  Parametros_pk: { type: "integer" },
                  valor: { type: "number" },
                  estacao_id: { type: "integer" },
                  parametro: {
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
                  estacao: {
                    type: "object",
                    properties: {
                      pk: { type: "integer" },
                      uuid: { type: "string" },
                      nome: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Valor capturado, parâmetro ou estação não encontrado",
        },
      },
    },
    delete: {
      summary: "Excluir um valor capturado",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID do valor capturado",
        },
      ],
      responses: {
        "204": {
          description: "Valor capturado deletado com sucesso",
        },
        "404": {
          description: "Valor capturado não encontrado",
        },
      },
    },
  },
  "/valor-capturado/parametro/{parametro_pk}": {
    get: {
      summary: "Listar todos os valores capturados de um parâmetro específico",
      parameters: [
        {
          in: "path",
          name: "parametro_pk",
          required: true,
          schema: { type: "integer" },
          description: "ID do parâmetro",
        },
      ],
      responses: {
        "200": {
          description: "Lista de valores do parâmetro",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    pk: { type: "integer" },
                    unixtime: { type: "string", format: "date-time" },
                    Parametros_pk: { type: "integer" },
                    valor: { type: "number" },
                    estacao_id: { type: "integer" },
                    parametro: {
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
                    estacao: {
                      type: "object",
                      properties: {
                        pk: { type: "integer" },
                        uuid: { type: "string" },
                        nome: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Nenhum valor encontrado para este parâmetro",
        },
      },
    },
  },
  "/valor-capturado/estacao/{estacao_id}": {
    get: {
      summary: "Listar todos os valores capturados de uma estação específica",
      parameters: [
        {
          in: "path",
          name: "estacao_id",
          required: true,
          schema: { type: "integer" },
          description: "ID da estação",
        },
      ],
      responses: {
        "200": {
          description: "Lista de valores da estação",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    pk: { type: "integer" },
                    unixtime: { type: "string", format: "date-time" },
                    Parametros_pk: { type: "integer" },
                    valor: { type: "number" },
                    estacao_id: { type: "integer" },
                    parametro: {
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
                    estacao: {
                      type: "object",
                      properties: {
                        pk: { type: "integer" },
                        uuid: { type: "string" },
                        nome: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Nenhum valor encontrado para esta estação",
        },
      },
    },
  },
  "/valor-capturado/filtros/periodo": {
    get: {
      summary: "Listar valores capturados com filtros de período e outros critérios",
      parameters: [
        {
          in: "query",
          name: "start_date",
          required: false,
          schema: { type: "string", format: "date-time" },
          description: "Data de início do período",
        },
        {
          in: "query",
          name: "end_date",
          required: false,
          schema: { type: "string", format: "date-time" },
          description: "Data de fim do período",
        },
        {
          in: "query",
          name: "estacao_id",
          required: false,
          schema: { type: "integer" },
          description: "ID da estação para filtrar",
        },
        {
          in: "query",
          name: "parametro_pk",
          required: false,
          schema: { type: "integer" },
          description: "ID do parâmetro para filtrar",
        },
      ],
      responses: {
        "200": {
          description: "Lista de valores filtrados",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    pk: { type: "integer" },
                    unixtime: { type: "string", format: "date-time" },
                    Parametros_pk: { type: "integer" },
                    valor: { type: "number" },
                    estacao_id: { type: "integer" },
                    parametro: {
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
                    estacao: {
                      type: "object",
                      properties: {
                        pk: { type: "integer" },
                        uuid: { type: "string" },
                        nome: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Nenhum valor encontrado para os filtros aplicados",
        },
      },
    },
  },
};
