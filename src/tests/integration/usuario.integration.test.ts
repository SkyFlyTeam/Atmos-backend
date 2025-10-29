import request from "supertest";
import app from "../../app"; // Seu express app
import sequelizeTest from "../../config/databaseTest";
import Usuario from "../../models/Usuario";

describe("Usuario Integration Tests", () => {
    beforeAll(async () => {
        // Conecta e sincroniza o banco de teste
        await sequelizeTest.sync({ force: true });
    });

    afterAll(async () => {
        // Limpa e fecha a conexão
        await sequelizeTest.drop();
        await sequelizeTest.close();
    });

    beforeEach(async () => {
        // Limpa os dados antes de cada teste
        await Usuario.destroy({ where: {}, truncate: true });
    });

    describe("GET /usuario", () => {
        it("deve retornar lista de usuários", async () => {
            // Cria usuários no banco de teste
            await Usuario.create({
                nome: "Teste 1",
                email: "teste1@example.com",
                senha: "senha123",
            });
            await Usuario.create({
                nome: "Teste 2",
                email: "teste2@example.com",
                senha: "senha456",
            });

            const response = await request(app).get("/usuario");

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
            expect(response.body[0]).toHaveProperty("nome", "Teste 1");
        });
    });

    describe("POST /usuario", () => {
        it("deve criar um novo usuário", async () => {
            const novoUsuario = {
                nome: "Novo Usuario",
                email: "novo@example.com",
                senha: "senha789",
            };

            const response = await request(app)
                .post("/usuario")
                .send(novoUsuario);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(
                expect.objectContaining({
                    email: expect.any(String),
                    nome: expect.any(String),
                    pk: expect.any(Number),
                    senha: expect.any(String),
                }),
            );

            // Verifica se foi realmente salvo no banco
            const usuario = await Usuario.findOne({
                where: { email: novoUsuario.email },
            });
            expect(usuario).toBeTruthy();
        });
        it("deve retornar erro ao criar usuário com dados incompletos", async () => {
            const novoUsuario = {
                nome: "Usuario Incompleto",
                senha: "senha789",
            };

            const response = await request(app)
                .post("/usuario")
                .send(novoUsuario);

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe(
                "Nome, email e senha são obrigados!"
            );
        });
    });

    describe("POST /usuario/login", () => {
        it("deve autenticar usuário com credenciais válidas", async () => {
            const usuarioData = {
                nome: "Usuario Login",
                email: "login@example.com",
                senha: "senha123",
            };

            await request(app)
                .post("/usuario")
                .send(usuarioData);

            const response = await request(app)
                .post("/usuario/login")
                .send({
                    email: usuarioData.email,
                    senha: usuarioData.senha,
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("token");
            expect(response.body.token).toEqual(expect.any(String));
            expect(response.body).toHaveProperty("nome", usuarioData.nome);
            expect(response.body).toHaveProperty("email", usuarioData.email);
            expect(response.body).toHaveProperty("id", expect.any(Number));
        });
        it("deve retornar erro devido a senha incorreta", async () => {
            const usuarioData = {
                nome: "Usuario Login",
                email: "login@example.com",
                senha: "senha123",
            };

            await request(app)
                .post("/usuario")
                .send(usuarioData);

            const response = await request(app)
                .post("/usuario/login")
                .send({
                    email: "login@example.com",
                    senha: "senha_incorreta",
                });

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe("Credencial inválida");
        });
        it("deve retornar erro devido a email inexistente", async () => {
            const usuarioData = {
                nome: "Usuario Login",
                email: "login@example.com",
                senha: "senha123",
            };

            await request(app)
                .post("/usuario")
                .send(usuarioData);
                
            const response = await request(app)
                .post("/usuario/login")
                .send({
                    email: "login_inexistente@example.com",
                    senha: "senha123",
                });

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe("Registro não encontrado");
        });
    });
});
