# 🚀 Node.js Auth & User Management API

Uma API RESTful completa e performática para gerenciamento de usuários, apresentando fluxos de autenticação, persistência de dados, processamento de filas e upload de arquivos.

## 🛠️ Tecnologias Utilizadas

-- Runtime: Node.js com TypeScript
-- Framework: Express.js
-- ORM: Prisma
-- Banco de Dados: MySQL
-- Autenticação: JSON Web Token (JWT) & BcryptJS
-- Upload de Arquivos: Multer
-- Serviço de E-mail: Nodemailer & Mailtrap
-- Mensageria/Fila: Redis & Bull (ou similar para Queue Jobs)

## ✨ Funcionalidades

-- Autenticação: Registro de usuários e Login com geração de Token JWT.
-- Segurança: Hash de senhas para armazenamento seguro.
-- CRUD de Usuários: Listagem geral, busca por ID, atualizar e remoção de perfis.
-- Upload: Suporte para armazenamento de arquivos via Multer.
-- E-mails de Boas-vindas: Integração com Mailtrap para testes de envio.
-- Background Jobs: Processamento assíncrono de e-mails utilizando Redis para garantir que a API não sofra gargalos de performance.

## 🏗️ Arquitetura de Filas (Redis)

O sistema utiliza uma arquitetura baseada em Jobs para o envio de e-mails. Quando um usuário é criado, um novo trabalho é adicionado à fila no Redis, permitindo que a resposta da requisição seja imediata enquanto o e-mail é processado em segundo plano.

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

-- Node.js
-- MySQL
-- Redis

## 🚀 Como Executar o Projeto

1. **Clone o repositório:**

```Bash
git clone https://github.com/vuvufelix/dev-samuray-api.git
```

2. **Instale as dependências:**

```Bash
npm install
```

3. **Configure as variáveis de ambiente (.env):**
Crie um arquivo .env na raiz do projeto seguindo o modelo:

```Snippet de código
DATABASE_URL=""mysql://user:password@localhost:3306/dbname"
DATABASE_USER="user"
DATABASE_PASSWORD="password"
DATABASE_NAME="dbname"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
```

4. **Rode as Migrations do Prisma:**

```Bash
npx prisma migrate dev
```

5. **Inicie o servidor:**

```Bash
npm run dev
```

## 🛣️ Endpoints da API

| Método | Endpoint | Descrição | Autenticação|
| :--- | :--- | :--- | :--- |
| POST | /user | Cadastro de novo usuário | Não |
| POST | /session | Autenticação e retorno do Token | Não |
| GET | /user | Listagem de todos os usuários | Sim |
| GET | /user/:id | Busca usuário por ID | Sim |
| PUT | /user/:id | Atualiza um usuário | sim |
| DELETE | /user/:id | Remove um usuário | Sim |
| POST | /file | Upload de arquivos | Sim |

Feito com 💻 por Vuvu Félix Miguel João