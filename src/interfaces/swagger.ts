import { Express } from "express";
import swaggerUi from "swagger-ui-express";

export function registerSwagger(app: Express): void {
  const openapi = {
    openapi: "3.0.3",
    info: {
      title: "cookiecutter",
      version: "1.0.0",
      description: "API docs",
    },
    servers: [{ url: "/" }],
    paths: {
      "/hello": {
        get: {
          summary: "Hello world opcional com nome",
          parameters: [
            {
              in: "query",
              name: "name",
              required: false,
              schema: { type: "string" },
              description: "Nome opcional para saudação",
            },
          ],
          responses: {
            "200": {
              description: "Mensagem de saudação",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  } as const;

  // UI no root '/'
  app.use("/", swaggerUi.serve, swaggerUi.setup(openapi, { explorer: false }));
  // OpenAPI JSON em '/openapi.json'
  app.get("/openapi.json", (_req, res) => res.json(openapi));
}


