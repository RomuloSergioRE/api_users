# 🚀 API Restful - Gestão de Usuários e Posts

Esta é uma API desenvolvida para estudo e aplicação de conceitos modernos de back-end, focada em segurança, escalabilidade e boas práticas de arquitetura. O projeto foi desenvolvido em ambiente **Zorin OS (Linux)** utilizando as melhores ferramentas do ecossistema Node.js.

---

## 🛠 Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)** com **[Express](https://expressjs.com/)** (Framework Web)
- **[TypeScript](https://www.typescriptlang.org/)** (Tipagem Estática e robustez)
- **[Prisma ORM](https://www.prisma.io/)** (Abstração e integração com Banco de Dados)
- **[PostgreSQL](https://www.postgresql.org/)** (Banco de Dados Relacional)
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)** (Criptografia de Senhas com Salt)
- **[JWT (JSON Web Token)](https://jwt.io/)** (Autenticação e Sessões Seguras)
- **[Dotenv](https://github.com/motdotla/dotenv)** (Segurança de Variáveis de Ambiente)

---

## 🔑 Funcionalidades e Segurança

### 1. Autenticação e Autorização
- **Sign Up:** Cadastro de usuários com verificação de e-mail único e hash de senha via Bcrypt.
- **Sign In:** Autenticação validada que gera um token JWT para acesso às rotas protegidas.
- **Middleware de Segurança:** Validação de token no cabeçalho das requisições para controle de acesso e proteção de dados.

### 2. Gestão de Dados (CRUD)
- **Usuários:** Criação, listagem, atualização e exclusão com proteção de privacidade (senhas nunca são retornadas nas respostas).
- **Posts:** Sistema de postagens vinculado diretamente ao ID do usuário autenticado através de chaves estrangeiras.

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório:**
   git clone https://github.com/seu-usuario/seu-repositorio.git

2. **Instale as dependências:**
   npm install

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo .env na raiz do projeto e adicione suas credenciais:
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
   JWT_SECRET="sua_chave_secreta_aqui"

4. **Prepare o Banco de Dados:**
   npx prisma migrate dev

5. **Inicie o servidor de desenvolvimento:**
   npm run dev

---

## 📈 Próximos Passos (Roadmap)

Atividades planejadas para as próximas etapas do projeto:

- [ ] **🧪 Testes Unitários:** Implementação de cobertura de testes com Vitest ou Jest para garantir a confiabilidade.
- [ ] **🐳 Dockerização:** Containerização completa da aplicação e banco de dados utilizando Docker Compose.
- [ ] **📄 Documentação Swagger:** Criação de interface interativa para testes e documentação dos endpoints.

---
