export const alertaSwagger = {
  "/alerta": {
    post: {
      tags: ["Alerta"],
      summary: "Criar novo alerta",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/AlertaInput" },
            example: {
              tipo_alerta_pk: 1,
              valor_capturado_pk: 2,
              descricao: "Alerta de exemplo"
            }
          }
        }
      },
      responses: {
        "201": {
          description: "Alerta criado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Alerta" }
            }
          }
        },
        "400": { description: "Erro ao salvar alerta" }
      }
    },
    get: {
      tags: ["Alerta"],
      summary: "Listar todos os alertas",
      responses: {
        "200": {
          description: "Lista de alertas",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/AlertaWithRelations" }
              }
            }
          }
        },
        "404": { description: "Registros não encontrados" },
        "500": { description: "Erro ao buscar registros" }
      }
    }
  },

  "/alerta/tipo/{tipoAlertaPk}": {
    get: {
      tags: ["Alerta"],
      summary: "Buscar alertas por tipo de alerta",
      parameters: [
        {
          name: "tipoAlertaPk",
          in: "path",
          required: true,
          schema: { type: "integer", format: "int32" }
        }
      ],
      responses: {
        "200": {
          description: "Alertas encontrados",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/AlertaWithRelations" }
              }
            }
          }
        },
        "404": { description: "Registros não encontrados" },
        "500": { description: "Erro ao buscar registros" }
      }
    }
  },

  "/alerta/valor/{valorCapturadoPk}": {
    get: {
      tags: ["Alerta"],
      summary: "Buscar alertas por valor capturado",
      parameters: [
        {
          name: "valorCapturadoPk",
          in: "path",
          required: true,
          schema: { type: "integer", format: "int32" }
        }
      ],
      responses: {
        "200": {
          description: "Alertas encontrados",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/AlertaWithRelations" }
              }
            }
          }
        },
        "404": { description: "Registros não encontrados" },
        "500": { description: "Erro ao buscar registros" }
      }
    }
  },

  "/alerta/{tipoAlertaPk}/{valorCapturadoPk}": {
    put: {
      tags: ["Alerta"],
      summary: "Atualizar um alerta (identificado por tipo_alerta_pk e valor_capturado_pk)",
      parameters: [
        {
          name: "tipoAlertaPk",
          in: "path",
          required: true,
          schema: { type: "integer", format: "int32" }
        },
        {
          name: "valorCapturadoPk",
          in: "path",
          required: true,
          schema: { type: "integer", format: "int32" }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/AlertaInput" }
          }
        }
      },
      responses: {
        "200": {
          description: "Alerta atualizado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AlertaWithRelations" }
            }
          }
        },
        "400": { description: "Erro ao atualizar registro" },
        "404": { description: "Registro não encontrado" }
      }
    },
    delete: {
      tags: ["Alerta"],
      summary: "Deletar um alerta (identificado por tipo_alerta_pk e valor_capturado_pk)",
      parameters: [
        {
          name: "tipoAlertaPk",
          in: "path",
          required: true,
          schema: { type: "integer", format: "int32" }
        },
        {
          name: "valorCapturadoPk",
          in: "path",
          required: true,
          schema: { type: "integer", format: "int32" }
        }
      ],
      responses: {
        "204": { description: "Deletado com sucesso" },
        "400": { description: "Erro ao deletar registro" },
        "404": { description: "Registro não encontrado" }
      }
    }
  },

  components: {
    schemas: {
      Alerta: {
        type: "object",
        properties: {
          tipo_alerta_pk: { type: "integer", format: "int32" },
          valor_capturado_pk: { type: "integer", format: "int32" },
          descricao: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      AlertaInput: {
        type: "object",
        required: ["tipo_alerta_pk", "valor_capturado_pk"],
        properties: {
          tipo_alerta_pk: { type: "integer", format: "int32" },
          valor_capturado_pk: { type: "integer", format: "int32" },
          descricao: { type: "string" }
        }
      },
      TipoAlerta: {
        type: "object",
        properties: {
          pk: { type: "integer", format: "int32" },
          nome: { type: "string" }
        }
      },
      ValorCapturado: {
        type: "object",
        properties: {
          pk: { type: "integer", format: "int32" },
          valor: { type: "number" },
          data_hora: { type: "string", format: "date-time" }
        }
      },
      AlertaWithRelations: {
        type: "object",
        allOf: [
          { $ref: "#/components/schemas/Alerta" },
          {
            properties: {
              tipoAlerta: { $ref: "#/components/schemas/TipoAlerta" },
              valorCapturado: { $ref: "#/components/schemas/ValorCapturado" }
            }
          }
        ]
      }
    }
  }
} as const