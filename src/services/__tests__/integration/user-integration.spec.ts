import request from 'supertest';
import { app } from '../../../app'; 
import { prisma } from "../../../lib/prisma";

describe('User Integration Tests (Banco Real)', () => {
  
  const emailTeste = `teste_${Date.now()}@gmail.com`;
  const senhaTeste = 'password123';
  let userId: number; // variavel para guardar o ID para buscar/deletar
  let token: string; // Variável para guardar o token JWT

  afterAll(async () => {
    await prisma.$disconnect(); // depois dos testes ele desconecta do banco
  });

  // 1. TESTE DE CADASTRO (SignUp) 
  it('deve cadastrar um usuário no PostgreSQL e retornar 201', async () => {
    const response = await request(app)
      .post('/auth/signup')// Rota atualizada conforme seu routes.ts
      .send({
        name: 'Romulo Teste Real',
        email: emailTeste,
        password: senhaTeste
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    userId = response.body.id; 
  });

  // 2. TESTE DE LOGIN (SignIn) 
  it('deve realizar login e retornar um token JWT', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: emailTeste,
        password: senhaTeste
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token; // Guardamos o token para as próximas chamadas
  });

  // 3. TESTE DE BUSCA POR ID (Protegido por Middleware)
  it('deve buscar o usuário recém-criado pelo ID usando o token', async () => {
    const response = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`); // Enviando o token no header

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(emailTeste);
  });

  // 4. TESTE DE LISTAGEM (Protegido por Middleware)
  it('deve listar todos os usuários usando o token', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    
    // Como você sanitizou o e-mail no controller, vamos procurar pelo ID
    // que salvamos lá no primeiro teste (SignUp)
    const findUser = response.body.find((u: any) => u.id === userId);
    
    expect(findUser).toBeDefined();
    expect(findUser.name).toBe('Romulo Teste Real'); // O nome ainda existe na lista!
  });

  // 5. TESTE DE ERRO (E-mail repetido)
  it('deve retornar erro ao tentar cadastrar o mesmo e-mail', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        name: 'Repetido',
        email: emailTeste,
        password: '123'
      });

    // Como seu service dá erro, o controller deve retornar 400 ou 500 dependendo do seu ErrorHandler
    expect(response.status).not.toBe(201); 
  });
});