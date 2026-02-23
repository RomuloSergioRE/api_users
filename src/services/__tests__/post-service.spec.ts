import { PostService } from '../postService';

describe('PostService Unit Tests', () => {
  // Criamos os dois mocks
  const postRepoMock = {
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  };

  const userRepoMock = {
    findById: jest.fn(),
  };

  // Injetamos ambos no Service
  const postService = new PostService(postRepoMock as any, userRepoMock as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerPost', () => {
    it('deve criar um post quando o autor existe', async () => {
      // ARRANGE: O autor existe no banco fake
      userRepoMock.findById.mockResolvedValue({ id: 1, name: 'Romulo' });
      postRepoMock.create.mockResolvedValue({ id: 10, content: 'Meu Post', authorId: 1 });

      // ACT
      const result = await postService.registerPost({
        content: 'Conteúdo legal',
        authorId: 1
      });

      // ASSERT
      expect(result).toHaveProperty('id');
      expect(postRepoMock.create).toHaveBeenCalled();
    });

    it('deve lançar erro se o autor do post não for encontrado', async () => {
      // ARRANGE: O autor NÃO existe
      userRepoMock.findById.mockResolvedValue(null);

      // ACT & ASSERT
      await expect(postService.registerPost({ authorId: 99, title: '...' } as any))
        .rejects.toThrow('Autor não encontrado.');
      
      // Garante que o post NEM tentou ser criado se o autor não existe
      expect(postRepoMock.create).not.toHaveBeenCalled();
    });
  });

  describe('Listagem e Busca', () => {
    it('deve retornar um post pelo ID', async () => {
      postRepoMock.findById.mockResolvedValue({ id: 10, content: 'Post XPTO' });

      const post = await postService.getPostById(10);

      expect(post.content).toBe('Post XPTO');
    });

    it('deve retornar lista de todos os posts', async () => {
      postRepoMock.findAll.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const posts = await postService.listPosts();

      expect(posts).toHaveLength(2);
    });
  });
});