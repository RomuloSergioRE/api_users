import { UserService } from '../userService';
import bcrypt from 'bcrypt';

describe('UserService Unit Tests', () => {
  // 1. Criar o Mock do Repositório 
  const userRepositoryMock = {
    create: jest.fn(), //criar uma função espia
    findByEmail: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  };

  // 2. Injetamos o mock no constructor
  const userService = new UserService(userRepositoryMock as any);

  beforeEach(() => {
    jest.clearAllMocks(); // Limpa o histórico de chamadas entre os testes
  });

  // O Fluxo de Cada Teste (O padrão Triple A)
  // estrutura Arrange (Organizar), Act (Agir) e Assert (Afirmar).

  describe('signUp', () => {
    it('deve cadastrar um usuário com sucesso', async () => {

      //ARRANGE: prepara o terreno
      userRepositoryMock.findByEmail.mockResolvedValue(null); // Dizemos: "Finja que não achou ninguém com esse email"
      userRepositoryMock.create.mockResolvedValue({ 
        id: 1, 
        email: 'romulo@test.com' 
      }); // Dizemos: "Quando criar, retorne esse objeto"

      // ACT: Executamos a função real do seu Service
      const result = await userService.signUp({
        name: 'Romulo',
        email: 'romulo@test.com',
        password: '123'
      } as any);

      //ASSERT: Verificamos se aconteceu o que esperávamos
      expect(result).toHaveProperty('id');
      expect(userRepositoryMock.create).toHaveBeenCalled();// se o service tentou salvar no banco
    });

    it('deve lançar erro se o e-mail já existir', async () => {
      userRepositoryMock.findByEmail.mockResolvedValue({ id: 1, email: 'ja_existe@test.com' });

      await expect(userService.signUp({ email: 'ja_existe@test.com' } as any))
        .rejects.toThrow('usuario ja tem um email cadastrado');
    });
  });

  describe('signIn', () => {
    it('deve retornar usuário e token com credenciais válidas', async () => {
      const password = '123';
      const hashedPassword = await bcrypt.hash(password, 10);

      userRepositoryMock.findByEmail.mockResolvedValue({
        id: 1,
        email: 'romulo@test.com',
        password: hashedPassword
      });

      const result = await userService.signIn('romulo@test.com', password);

      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe('romulo@test.com');
    });

    it('deve lançar erro se a senha estiver incorreta', async () => {
      userRepositoryMock.findByEmail.mockResolvedValue({
        id: 1,
        password: await bcrypt.hash('correta', 10)
      });

      await expect(userService.signIn('romulo@test.com', 'errada'))
        .rejects.toThrow('E-mail ou senha incorretos.');
    });
  });

  describe('Busca de Usuários', () => {
    it('deve encontrar um usuário por ID', async () => {
      userRepositoryMock.findById.mockResolvedValue({ id: 1, name: 'Romulo' });

      const user = await userService.getUserById(1);

      expect(user.name).toBe('Romulo');
    });

    it('deve lançar erro se não encontrar usuário por ID', async () => {
      userRepositoryMock.findById.mockResolvedValue(null);

      await expect(userService.getUserById(99))
        .rejects.toThrow('usuario não encontrado');
    });

    it('deve listar todos os usuários', async () => {
      userRepositoryMock.findAll.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const users = await userService.listAllUsers();

      expect(users).toHaveLength(2);
    });
  });

  describe('updateUser e deleteUser', () => {
    it('deve atualizar a senha com hash ao fazer update', async () => {
      userRepositoryMock.findById.mockResolvedValue({ id: 1 });
      userRepositoryMock.update.mockResolvedValue({ id: 1, password: 'novo_hash' });

      await userService.updateUser(1, { password: 'nova_senha' });

      expect(userRepositoryMock.update).toHaveBeenCalled();
      // Verifica se o update foi chamado com a senha criptografada (diferente de 'nova_senha')
      const callArgs = userRepositoryMock.update.mock.calls[0][1];
      expect(callArgs.password).not.toBe('nova_senha');
    });

    it('deve deletar um usuário com sucesso', async () => {
      userRepositoryMock.findById.mockResolvedValue({ id: 1 });
      userRepositoryMock.delete.mockResolvedValue({ id: 1 });

      const result = await userService.deleteUser(1);

      expect(result.id).toBe(1);
      expect(userRepositoryMock.delete).toHaveBeenCalledWith(1);
    });
  });
});