import request from 'supertest';
import { app } from '../../../app';
import { prisma } from "../../../lib/prisma";

describe('Post Integration Tests (Banco Real)', () => {
  
  let token: string;
  let userId: number;
  let postId: number;
  const emailAutor = `autor_${Date.now()}@test.com`;
  const conteudoPost = `Conteúdo do post ${Date.now()}`;

  beforeAll(async () => {
    // 1. Criar o autor
    const userRes = await request(app)
      .post('/auth/signup')
      .send({
        name: 'Romulo Autor',
        email: emailAutor,
        password: 'password123'
      });
    
    userId = userRes.body.id;

    // 2. Logar
    const loginRes = await request(app)
      .post('/auth/signin')
      .send({
        email: emailAutor,
        password: 'password123'
      });

    token = loginRes.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve criar um novo post com sucesso', async () => {
    const response = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: conteudoPost, // Enviando apenas o campo que existe
        authorId: userId
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.content).toBe(conteudoPost);
    postId = response.body.id;
  });

  it('deve listar todos os posts e encontrar o post recém-criado', async () => {
    const response = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    
    const findPost = response.body.find((p: any) => p.id === postId);
    expect(findPost).toBeDefined();
    expect(findPost?.content).toBe(conteudoPost); // Comparação correta
  });

  it('deve buscar um único post pelo ID', async () => {
    const response = await request(app)
      .get(`/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.content).toBe(conteudoPost);
  });

  it('deve atualizar o conteúdo de um post via PATCH', async () => {
    const novoConteudo = "Conteúdo atualizado pelo teste";
    const response = await request(app)
      .patch(`/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: novoConteudo // Atualizando o campo correto
      });

    expect(response.status).toBe(200);
    expect(response.body.content).toBe(novoConteudo);
  });

  it('deve deletar um post e retornar status 204', async () => {
    const response = await request(app)
      .delete(`/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});