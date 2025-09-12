export const tipoParametroSwagger = {
  "/tipo-parametro": {
    post: {
      summary: "Criar um novo tipo de parâmetro",
      requestBody: {
        description: "Dados do tipo de parâmetro para criar",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                json_id: { type: "string", nullable: true },
                nome: { type: "string", nullable: true },
                tipo: { type: "string", nullable: true },
                offset: { type: "number", nullable: true },
                fator: { type: "number", nullable: true },
                polinomio: { type: "string", nullable: true },
                unidade: { type: "string", nullable: true },
                alarme: { type: "number", nullable: true },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Tipo de parâmetro criado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  json_id: { type: "string", nullable: true },
                  nome: { type: "string", nullable: true },
                  tipo: { type: "string", nullable: true },
                  offset: { type: "number", nullable: true },
                  fator: { type: "number", nullable: true },
                  polinomio: { type: "string", nullable: true },
                  unidade: { type: "string", nullable: true },
                  alarme: { type: "number", nullable: true },
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
      summary: "Listar todos os tipos de parâmetros",
      responses: {
        "200": {
          description: "Lista de tipos de parâmetros",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    pk: { type: "integer" },
                    json_id: { type: "string", nullable: true },
                    nome: { type: "string", nullable: true },
                    tipo: { type: "string", nullable: true },
                    offset: { type: "number", nullable: true },
                    fator: { type: "number", nullable: true },
                    polinomio: { type: "string", nullable: true },
                    unidade: { type: "string", nullable: true },
                    alarme: { type: "number", nullable: true },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Nenhum tipo de parâmetro encontrado",
        },
      },
    },
  },
  "/tipo-parametro/{pk}": {
    get: {
      summary: "Obter um tipo de parâmetro pelo ID",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID do tipo de parâmetro",
        },
      ],
      responses: {
        "200": {
          description: "Tipo de parâmetro encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  json_id: { type: "string", nullable: true },
                  nome: { type: "string", nullable: true },
                  tipo: { type: "string", nullable: true },
                  offset: { type: "number", nullable: true },
                  fator: { type: "number", nullable: true },
                  polinomio: { type: "string", nullable: true },
                  unidade: { type: "string", nullable: true },
                  alarme: { type: "number", nullable: true },
                },
              },
            },
          },
        },
        "404": {
          description: "Tipo de parâmetro não encontrado",
        },
      },
    },
    put: {
      summary: "Atualizar um tipo de parâmetro",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID do tipo de parâmetro",
        },
      ],
      requestBody: {
        description: "Dados do tipo de parâmetro para atualizar",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                json_id: { type: "string", nullable: true },
                nome: { type: "string", nullable: true },
                tipo: { type: "string", nullable: true },
                offset: { type: "number", nullable: true },
                fator: { type: "number", nullable: true },
                polinomio: { type: "string", nullable: true },
                unidade: { type: "string", nullable: true },
                alarme: { type: "number", nullable: true },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Tipo de parâmetro atualizado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  json_id: { type: "string", nullable: true },
                  nome: { type: "string", nullable: true },
                  tipo: { type: "string", nullable: true },
                  offset: { type: "number", nullable: true },
                  fator: { type: "number", nullable: true },
                  polinomio: { type: "string", nullable: true },
                  unidade: { type: "string", nullable: true },
                  alarme: { type: "number", nullable: true },
                },
              },
            },
          },
        },
        "404": {
          description: "Tipo de parâmetro não encontrado",
        },
      },
    },
    delete: {
      summary: "Excluir um tipo de parâmetro",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID do tipo de parâmetro",
        },
      ],
      responses: {
        "204": {
          description: "Tipo de parâmetro deletado com sucesso",
        },
        "404": {
          description: "Tipo de parâmetro não encontrado",
        },
      },
    },
  },
};
