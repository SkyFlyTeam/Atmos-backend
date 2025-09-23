export const usuarioSwagger = {
  "/usuario": {
    post: {
      summary: "Criar um novo usuário",
      requestBody: {
        description: "Dados do usuário para criar",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nome: { type: "string" },
                email: { type: "string" },
                senha: { type: "string" },
              },
              required: ["nome", "email", "senha"],
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Usuário criado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  nome: { type: "string" },
                  email: { type: "string" },
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
      summary: "Listar todos os usuários",
      responses: {
        "200": {
          description: "Lista de usuários",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    pk: { type: "integer" },
                    nome: { type: "string" },
                    email: { type: "string" },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Nenhum usuário encontrado",
        },
      },
    },
  },
  "/usuario/{pk}": {
    get: {
      summary: "Obter um usuário pelo ID",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID do usuário",
        },
      ],
      responses: {
        "200": {
          description: "Usuário encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  nome: { type: "string" },
                  email: { type: "string" },
                },
              },
            },
          },
        },
        "404": {
          description: "Usuário não encontrado",
        },
      },
    },
    put: {
      summary: "Atualizar um usuário",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID do usuário",
        },
      ],
      requestBody: {
        description: "Dados do usuário para atualizar",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nome: { type: "string" },
                email: { type: "string" },
                senha: { type: "string" },
              },
              required: ["nome", "email", "senha"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Usuário atualizado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  nome: { type: "string" },
                  email: { type: "string" },
                },
              },
            },
          },
        },
        "404": {
          description: "Usuário não encontrado",
        },
      },
    },
    delete: {
      summary: "Excluir um usuário",
      parameters: [
        {
          in: "path",
          name: "pk",
          required: true,
          schema: { type: "integer" },
          description: "ID do usuário",
        },
      ],
      responses: {
        "204": {
          description: "Usuário deletado com sucesso",
        },
        "404": {
          description: "Usuário não encontrado",
        },
      },
    },
  },
  "/usuario/login": {
    post: {
      summary: "Acessar um usuário",
      requestBody: {
        description: "Dados do usuário para ter acesso",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                senha: { type: "string" },
              },
              required: ["email", "senha"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Usuário acessado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pk: { type: "integer" },
                  nome: { type: "string" },
                  email: { type: "string" },
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
  },
};
