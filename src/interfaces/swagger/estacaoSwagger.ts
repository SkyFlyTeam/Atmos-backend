export const estacaoSwagger = {
  "/estacao": {
    post: {
      summary: "Criar uma nova estação",
      requestBody: {
        description: "Dados da estação para criar",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                uuid: { type: "string" },
                nome: { type: "string" },
                descricao: { type: "string" },
                link: { type: "string", nullable: true },
                status: { type: "boolean" },
                lat: { type: "string", nullable: true },
                long: { type: "string", nullable: true },
                endereco: { type: "string", nullable: true },

                // NOVO: cidade (enviar ao menos o ibgeId para vincular)
                cidadeIbgeId: { type: "integer", nullable: true, description: "ID do município no IBGE" },
                cidadeNome: { type: "string", nullable: true, description: "Nome da cidade (cache/visualização)" },
                cidadeUf: {
                  type: "string",
                  nullable: true,
                  description: "UF da cidade",
                  pattern: "^[A-Z]{2}$"
                },

                // NOVO: imagem base64 (data URL)
                imagemBase64: {
                  type: "string",
                  nullable: true,
                  description: "Imagem em Data URL (ex.: data:image/jpeg;base64,...)"
                },
              },
              required: ["uuid", "nome", "descricao", "status"],
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Estação criada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  uuid: { type: "string" },
                  nome: { type: "string" },
                  descricao: { type: "string" },
                  link: { type: "string", nullable: true },
                  status: { type: "boolean" },
                  lat: { type: "string", nullable: true },
                  long: { type: "string", nullable: true },
                  endereco: { type: "string", nullable: true },

                  // NOVO: cidade retornada (flatten)
                  cidadeIbgeId: { type: "integer", nullable: true },
                  cidadeNome: { type: "string", nullable: true },
                  cidadeUf: { type: "string", nullable: true, pattern: "^[A-Z]{2}$" },

                  // NOVO
                  imagemBase64: { type: "string", nullable: true },
                },
              },
            },
          },
        },
        "400": { description: "Erro de validação" },
      },
    },
    get: {
      summary: "Listar todas as estações",
      responses: {
        "200": {
          description: "Lista de estações",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    pk: { type: "integer" },
                    uuid: { type: "string" },
                    nome: { type: "string" },
                    descricao: { type: "string" },
                    link: { type: "string", nullable: true },
                    status: { type: "boolean" },
                    lat: { type: "string", nullable: true },
                    long: { type: "string", nullable: true },
                    endereco: { type: "string", nullable: true },

                    // NOVO
                    cidadeIbgeId: { type: "integer", nullable: true },
                    cidadeNome: { type: "string", nullable: true },
                    cidadeUf: { type: "string", nullable: true, pattern: "^[A-Z]{2}$" },

                    // NOVO
                    imagemBase64: { type: "string", nullable: true },
                  },
                },
              },
            },
          },
        },
        "404": { description: "Nenhuma estação encontrada" },
      },
    },
  },

  "/estacao/{pk}": {
    get: {
      summary: "Obter uma estação pelo ID",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID da estação",
        },
      ],
      responses: {
        "200": {
          description: "Estação encontrada",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  uuid: { type: "string" },
                  nome: { type: "string" },
                  descricao: { type: "string" },
                  link: { type: "string", nullable: true },
                  status: { type: "boolean" },
                  lat: { type: "string", nullable: true },
                  long: { type: "string", nullable: true },
                  endereco: { type: "string", nullable: true },

                  // NOVO
                  cidadeIbgeId: { type: "integer", nullable: true },
                  cidadeNome: { type: "string", nullable: true },
                  cidadeUf: { type: "string", nullable: true, pattern: "^[A-Z]{2}$" },

                  // NOVO
                  imagemBase64: { type: "string", nullable: true },
                },
              },
            },
          },
        },
        "404": { description: "Estação não encontrada" },
      },
    },

    put: {
      summary: "Atualizar uma estação",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID da estação",
        },
      ],
      requestBody: {
        description: "Dados da estação para atualizar",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                uuid: { type: "string" },
                nome: { type: "string" },
                descricao: { type: "string" },
                link: { type: "string", nullable: true },
                status: { type: "boolean" },
                lat: { type: "string", nullable: true },
                long: { type: "string", nullable: true },
                endereco: { type: "string", nullable: true },

                // NOVO
                cidadeIbgeId: { type: "integer", nullable: true },
                cidadeNome: { type: "string", nullable: true },
                cidadeUf: { type: "string", nullable: true, pattern: "^[A-Z]{2}$" },

                // NOVO
                imagemBase64: {
                  type: "string",
                  nullable: true,
                  description: "Data URL; use null para remover a imagem atual"
                },
              },
              required: ["uuid", "nome", "descricao", "status"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Estação atualizada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  uuid: { type: "string" },
                  nome: { type: "string" },
                  descricao: { type: "string" },
                  link: { type: "string", nullable: true },
                  status: { type: "boolean" },
                  lat: { type: "string", nullable: true },
                  long: { type: "string", nullable: true },
                  endereco: { type: "string", nullable: true },

                  // NOVO
                  cidadeIbgeId: { type: "integer", nullable: true },
                  cidadeNome: { type: "string", nullable: true },
                  cidadeUf: { type: "string", nullable: true, pattern: "^[A-Z]{2}$" },

                  // NOVO
                  imagemBase64: { type: "string", nullable: true },
                },
              },
            },
          },
        },
        "404": { description: "Estação não encontrada" },
      },
    },

    delete: {
      summary: "Excluir uma estação",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID da estação",
        },
      ],
      responses: {
        "204": { description: "Estação deletada com sucesso" },
        "404": { description: "Estação não encontrada" },
      },
    },
  },
};
