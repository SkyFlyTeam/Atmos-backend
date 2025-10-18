export const dashboardSwagger = {
  "/dashboard/parametros-graficos": {
    post: {
      tags: ["Dashboard"],
      summary: "Buscar valores capturados por parâmetros",
      description: "Retorna séries temporais por parâmetro para as estações filtradas por cidade/estações e intervalo de datas.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                cidade: { type: "number", description: "Pk da cidade para filtrar as estações" },
                estacoes: {
                  type: "array",
                  description: "Lista de PKs de estações (Estacao.pk) para filtrar",
                  items: { type: "integer" }
                },
                parametros: {
                  type: "array",
                  description: "Lista de PKs de parâmetros (TipoParametro.pk) para filtrar",
                  items: { type: "integer" }
                },
                dataInicio: { type: "string", format: "date-time", description: "Data/hora inicial (ISO 8601)" },
                dataFim: { type: "string", format: "date-time", description: "Data/hora final (ISO 8601)" }
              },
              required: ["dataInicio", "dataFim"]
            },
            examples: {
              exemplo: {
                summary: "Exemplo de requisição",
                value: {
                  cidade: 1,
                  estacoes: [1, 2],
                  parametros: [1, 2],
                  dataInicio: "2025-10-01T00:00:00.000Z",
                  dataFim: "2025-10-18T23:59:59.000Z"
                }
              }
            }
          }
        }
      },
      responses: {
        "200": {
          description: "Lista de séries por parâmetro",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    tipo_parametro: { type: "string", description: "Nome do parâmetro com unidade" },
                    estacoes: {
                      type: "array",
                      description: "Nomes das estações incluídas na série",
                      items: { type: "string" }
                    },
                    dados: {
                      type: "array",
                      description: "Pontos da série temporal",
                      items: {
                        type: "object",
                        properties: {
                          datetime: { type: "string", description: "Data/hora formatada" }
                        },
                        additionalProperties: {
                          type: "number",
                          description: "Valor da estação; a chave é o nome da estação"
                        }
                      }
                    }
                  }
                }
              },
              examples: {
                exemplo: {
                  summary: "Exemplo de resposta",
                  value: [
                    {
                      tipo_parametro: "Temperatura (°C)",
                      estacoes: ["Estação Central", "Estação Norte"],
                      dados: [
                        { datetime: "01/10/2025 10:00", "Estação Central": 23.4, "Estação Norte": 22.1 },
                        { datetime: "01/10/2025 11:00", "Estação Central": 24.1, "Estação Norte": 23.5 }
                      ]
                    }
                  ]
                }
              }
            }
          }
        },
        "404": {
          description: "Cidade não encontrada",
          content: {
            "application/json": {
              schema: { type: "object", properties: { error: { type: "string" } } },
              example: { error: "Cidade não encontrada" }
            }
          }
        },
        "500": {
          description: "Erro interno",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { error: { type: "string" }, detalhes: { type: "string" } }
              },
              example: {
                error: "Erro ao buscar registros capturados por parâmetros",
                detalhes: "Descrição do erro"
              }
            }
          }
        }
      }
    }
  },
  "/dashboard/parametros-card": {
    post: {
      tags: ["Dashboard"],
      summary: "Buscar últimos valores capturados por parâmetros",
      description: "Retorna os valores mais recentes de cada parâmetro com indicação de aumento ou diminuição em relação ao valor anterior.",
      requestBody: {
        required: false,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                cidade: { type: "number", description: "Pk da cidade para filtrar as estações" },
                estacoes: {
                  type: "array",
                  description: "Lista de PKs de estações (Estacao.pk) para filtrar",
                  items: { type: "integer" }
                },
                parametros: {
                  type: "array",
                  description: "Lista de PKs de parâmetros (TipoParametro.pk) para filtrar",
                  items: { type: "integer" }
                }
              }
            },
            examples: {
              exemplo: {
                summary: "Exemplo de requisição",
                value: { cidade: 1, estacoes: [1, 2], parametros: [1, 2] }
              }
            }
          }
        }
      },
      responses: {
        "200": {
          description: "Lista de cards com últimos valores por parâmetro",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    tipo_parametro: { type: "string", description: "Nome do tipo de parâmetro" },
                    valor_atual: { type: "number", nullable: true, description: "Valor mais recente capturado" },
                    aumento: { type: "boolean", nullable: true, description: "true se aumentou, false se diminuiu, null se não há comparação" }
                  }
                }
              },
              examples: {
                exemplo: {
                  summary: "Exemplo de resposta",
                  value: [
                    { tipo_parametro: "Temperatura", valor_atual: 24.5, aumento: true },
                    { tipo_parametro: "Umidade", valor_atual: 65.2, aumento: false },
                    { tipo_parametro: "Pressão", valor_atual: 1013.5, aumento: null }
                  ]
                }
              }
            }
          }
        },
        "404": {
          description: "Cidade não encontrada",
          content: {
            "application/json": {
              schema: { type: "object", properties: { error: { type: "string" } } },
              example: { error: "Cidade não encontrada" }
            }
          }
        },
        "500": {
          description: "Erro interno",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { error: { type: "string" }, detalhes: { type: "string" } }
              },
              example: {
                error: "Erro ao buscar últimos registros capturados por parâmetros",
                detalhes: "Descrição do erro"
              }
            }
          }
        }
      }
    }
  }
};