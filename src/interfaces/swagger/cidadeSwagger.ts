export const cidadeSwagger = {
  "/cidade": {
    get: {
      tags: ["Cidade"],
      summary: "Listar todas as cidades",
      description: "Retorna a lista completa de cidades cadastradas no sistema.",
      responses: {
        "200": {
          description: "Lista de cidades",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    pk: {
                      type: "integer",
                      description: "Chave primária da cidade"
                    },
                    ibgeId: {
                      type: "integer",
                      description: "Código IBGE da cidade"
                    },
                    nome: {
                      type: "string",
                      description: "Nome da cidade"
                    },
                    uf: {
                      type: "string",
                      description: "Sigla do estado (UF)"
                    }
                  }
                }
              },
              examples: {
                exemplo: {
                  summary: "Exemplo de resposta",
                  value: [
                    {
                      pk: 1,
                      ibgeId: 3550308,
                      nome: "São Paulo",
                      uf: "SP"
                    },
                    {
                      pk: 2,
                      ibgeId: 3304557,
                      nome: "Rio de Janeiro",
                      uf: "RJ"
                    },
                    {
                      pk: 3,
                      ibgeId: 3106200,
                      nome: "Belo Horizonte",
                      uf: "MG"
                    }
                  ]
                }
              }
            }
          }
        },
        "404": {
          description: "Nenhuma cidade encontrada",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string" }
                }
              },
              example: {
                error: "Registros de cidade não encontrados"
              }
            }
          }
        },
        "500": {
          description: "Erro interno do servidor",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string" },
                  detalhes: { type: "string" }
                }
              },
              example: {
                error: "Erro ao buscar registros de cidade",
                detalhes: "Descrição do erro"
              }
            }
          }
        }
      }
    }
  }
};