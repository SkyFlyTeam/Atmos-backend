export const alertaSwagger = {
  "/alerta": {
    post: {
      tags: ["Alerta"],
      summary: "Criar novo alerta",
      description: "Cria um novo registro de alerta no sistema.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["tipo_alerta_pk", "valor_capturado_pk"],
              properties: {
                tipo_alerta_pk: { 
                  type: "integer", 
                  format: "int32",
                  description: "Chave primária do tipo de alerta"
                },
                valor_capturado_pk: { 
                  type: "integer", 
                  format: "int32",
                  description: "Chave primária do valor capturado"
                },
                data: { 
                  type: "string", 
                  format: "date-time",
                  description: "Data e hora do alerta"
                }
              }
            },
            example: {
              tipo_alerta_pk: 1,
              valor_capturado_pk: 2,
              data: "2025-11-05T12:00:00Z"
            }
          }
        }
      },
      responses: {
        "201": {
          description: "Alerta criado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  tipo_alerta_pk: { type: "integer", format: "int32" },
                  valor_capturado_pk: { type: "integer", format: "int32" },
                  data: { type: "string", format: "date-time" }
                }
              },
              example: {
                tipo_alerta_pk: 1,
                valor_capturado_pk: 2,
                data: "2025-11-05T12:00:00Z"
              }
            }
          }
        },
        "400": {
          description: "Erro ao salvar alerta",
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
                error: "Erro ao salvar alerta",
                detalhes: "Descrição do erro"
              }
            }
          }
        }
      }
    },
    get: {
      tags: ["Alerta"],
      summary: "Listar todos os alertas",
      description: "Retorna a lista completa de alertas com suas relações.",
      responses: {
        "200": {
          description: "Lista de alertas",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    tipo_alerta_pk: { type: "integer", format: "int32" },
                    valor_capturado_pk: { type: "integer", format: "int32" },
                    data: { type: "string", format: "date-time" },
                    tipoAlerta: {
                      type: "object",
                      properties: {
                        pk: { type: "integer", format: "int32" },
                        tipo: { type: "string", nullable: true },
                        descricao: { type: "string", nullable: true },
                        publica: { type: "boolean", nullable: true },
                        tipo_alarme: { type: "integer", nullable: true },
                        p1: { type: "number", nullable: true },
                        p2: { type: "number", nullable: true },
                      }
                    },
                    valorCapturado: {
                      type: "object",
                      properties: {
                        pk: { type: "integer", format: "int32" },
                        valor: { type: "number" },
                        data_hora: { type: "string", format: "date-time" }
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
                      tipo_alerta_pk: 1,
                      valor_capturado_pk: 2,
                      data: "2025-11-05T12:00:00Z",
                      tipoAlerta: {
                        pk: 1,
                        tipo: "Temperatura Alta",
                        descricao: "Alerta para temperaturas acima do limite",
                        publica: true,
                        tipo_alarme: 1,
                        p1: 30.0,
                        p2: 40.0
                      },
                      valorCapturado: {
                        pk: 2,
                        valor: 35.5,
                        data_hora: "2025-11-05T11:30:00Z"
                      }
                    }
                  ]
                }
              }
            }
          }
        },
        "404": {
          description: "Nenhum alerta encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string" }
                }
              },
              example: {
                error: "Registros não encontrados"
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
                error: "Erro ao buscar registros",
                detalhes: "Descrição do erro"
              }
            }
          }
        }
      }
    }
  },

  "/alerta/tipo/{tipoAlertaPk}": {
    get: {
      tags: ["Alerta"],
      summary: "Buscar alertas por tipo de alerta",
      description: "Retorna todos os alertas de um tipo específico.",
      parameters: [
        {
          name: "tipoAlertaPk",
          in: "path",
          required: true,
          description: "Chave primária do tipo de alerta",
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
                items: {
                  type: "object",
                  properties: {
                    tipo_alerta_pk: { type: "integer", format: "int32" },
                    valor_capturado_pk: { type: "integer", format: "int32" },
                    data: { type: "string", format: "date-time" },
                    tipoAlerta: {
                      type: "object",
                      properties: {
                        pk: { type: "integer", format: "int32" },
                        tipo: { type: "string" }
                      }
                    },
                    valorCapturado: {
                      type: "object",
                      properties: {
                        pk: { type: "integer", format: "int32" },
                        valor: { type: "number" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "404": {
          description: "Nenhum alerta encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string" }
                }
              },
              example: {
                error: "Registros não encontrados"
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
                error: "Erro ao buscar registros",
                detalhes: "Descrição do erro"
              }
            }
          }
        }
      }
    }
  },

  "/alerta/valor/{valorCapturadoPk}": {
    get: {
      tags: ["Alerta"],
      summary: "Buscar alertas por valor capturado",
      description: "Retorna todos os alertas de um valor capturado específico.",
      parameters: [
        {
          name: "valorCapturadoPk",
          in: "path",
          required: true,
          description: "Chave primária do valor capturado",
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
                items: {
                  type: "object",
                  properties: {
                    tipo_alerta_pk: { type: "integer", format: "int32" },
                    valor_capturado_pk: { type: "integer", format: "int32" },
                    data: { type: "string", format: "date-time" },
                    tipoAlerta: {
                      type: "object",
                      properties: {
                        pk: { type: "integer", format: "int32" },
                        tipo: { type: "string" }
                      }
                    },
                    valorCapturado: {
                      type: "object",
                      properties: {
                        pk: { type: "integer", format: "int32" },
                        valor: { type: "number" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "404": {
          description: "Nenhum alerta encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string" }
                }
              },
              example: {
                error: "Registros não encontrados"
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
                error: "Erro ao buscar registros",
                detalhes: "Descrição do erro"
              }
            }
          }
        }
      }
    }
  },

  "/alerta/{tipoAlertaPk}/{valorCapturadoPk}": {
    put: {
      tags: ["Alerta"],
      summary: "Atualizar um alerta",
      description: "Atualiza um alerta identificado por tipo_alerta_pk e valor_capturado_pk.",
      parameters: [
        {
          name: "tipoAlertaPk",
          in: "path",
          required: true,
          description: "Chave primária do tipo de alerta",
          schema: { type: "integer", format: "int32" }
        },
        {
          name: "valorCapturadoPk",
          in: "path",
          required: true,
          description: "Chave primária do valor capturado",
          schema: { type: "integer", format: "int32" }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                data: { 
                  type: "string", 
                  format: "date-time",
                  description: "Nova data e hora do alerta"
                }
              }
            },
            example: {
              data: "2025-11-06T12:00:00Z"
            }
          }
        }
      },
      responses: {
        "200": {
          description: "Alerta atualizado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  tipo_alerta_pk: { type: "integer", format: "int32" },
                  valor_capturado_pk: { type: "integer", format: "int32" },
                  data: { type: "string", format: "date-time" },
                  tipoAlerta: {
                    type: "object",
                    properties: {
                      pk: { type: "integer", format: "int32" },
                      tipo: { type: "string" }
                    }
                  },
                  valorCapturado: {
                    type: "object",
                    properties: {
                      pk: { type: "integer", format: "int32" },
                      valor: { type: "number" }
                    }
                  }
                }
              }
            }
          }
        },
        "400": {
          description: "Erro ao atualizar registro",
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
                error: "Erro ao atualizar registro",
                detalhes: "Descrição do erro"
              }
            }
          }
        },
        "404": {
          description: "Registro não encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string" }
                }
              },
              example: {
                error: "Registro não encontrado"
              }
            }
          }
        }
      }
    },
    delete: {
      tags: ["Alerta"],
      summary: "Deletar um alerta",
      description: "Deleta um alerta identificado por tipo_alerta_pk e valor_capturado_pk.",
      parameters: [
        {
          name: "tipoAlertaPk",
          in: "path",
          required: true,
          description: "Chave primária do tipo de alerta",
          schema: { type: "integer", format: "int32" }
        },
        {
          name: "valorCapturadoPk",
          in: "path",
          required: true,
          description: "Chave primária do valor capturado",
          schema: { type: "integer", format: "int32" }
        }
      ],
      responses: {
        "204": {
          description: "Alerta deletado com sucesso"
        },
        "400": {
          description: "Erro ao deletar registro",
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
                error: "Erro ao deletar registro",
                detalhes: "Descrição do erro"
              }
            }
          }
        },
        "404": {
          description: "Registro não encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string" }
                }
              },
              example: {
                error: "Registro não encontrado"
              }
            }
          }
        }
      }
    }
  }
} as const;