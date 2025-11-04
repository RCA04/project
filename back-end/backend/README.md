# ProjectMate - Backend API

API REST desenvolvida em Laravel para gerenciamento de projetos e tarefas. Backend robusto com autenticação via Laravel Sanctum, validação de dados e estrutura organizada seguindo as melhores práticas do Laravel.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Autenticação](#autenticação)
- [Banco de Dados](#banco-de-dados)
- [Scripts Disponíveis](#scripts-disponíveis)

## 🎯 Sobre o Projeto

ProjectMate Backend é uma API REST completa que fornece endpoints para:

- Autenticação de usuários (registro, login, logout)
- Gerenciamento de projetos (CRUD completo)
- Gerenciamento de tarefas (CRUD completo)
- Estatísticas do dashboard
- Relacionamentos entre projetos e tarefas
- Autenticação via tokens (Laravel Sanctum)

## 🛠 Tecnologias

- **Laravel 12.0** - Framework PHP moderno
- **PHP 8.2+** - Linguagem de programação
- **Laravel Sanctum 4.2** - Autenticação via tokens
- **MySQL/PostgreSQL** - Banco de dados relacional
- **Composer** - Gerenciador de dependências PHP
- **Vite** - Build tool para assets frontend (Laravel)

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **PHP 8.2 ou superior**
- **Composer** (gerenciador de dependências PHP)
- **MySQL 5.7+** ou **PostgreSQL 10+** ou **SQLite**
- **Node.js** e **npm** (para assets frontend, opcional)
- **Git** (opcional)

## 🚀 Instalação

1. Clone o repositório (ou navegue até a pasta do backend):
```bash
cd back-end/backend
```

2. Instale as dependências do PHP:
```bash
composer install
```

3. Instale as dependências do Node.js (para assets frontend):
```bash
npm install
```

## ⚙️ Configuração

### 1. Arquivo de Ambiente

Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

### 2. Gerar Chave da Aplicação

```bash
php artisan key:generate
```

### 3. Configurar Banco de Dados

Edite o arquivo `.env` e configure suas credenciais de banco de dados:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=projectmate
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

### 4. Executar Migrations

```bash
php artisan migrate
```

### 5. Configurar CORS

O arquivo `config/cors.php` já está configurado para aceitar requisições do frontend em `http://localhost:5173`. Se necessário, ajuste as origens permitidas:

```php
'allowed_origins' => [
    'http://localhost:5173',
],
```

### 6. Limpar Cache (Recomendado)

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

## ▶️ Executando o Projeto

### Modo Desenvolvimento

Inicie o servidor de desenvolvimento:
```bash
php artisan serve
```

O servidor estará disponível em `http://localhost:8000`.

### Com Assets Frontend

Se precisar compilar assets frontend junto:
```bash
composer run dev
```

Este comando executa:
- Servidor Laravel (`php artisan serve`)
- Queue worker
- Logs (Pail)
- Vite dev server

## 📁 Estrutura do Projeto

```
backend/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── API/
│   │           ├── AuthController.php      # Autenticação
│   │           ├── DashboardController.php # Estatísticas
│   │           ├── ProjectController.php   # CRUD de projetos
│   │           └── TaskController.php      # CRUD de tarefas
│   ├── Models/
│   │   ├── User.php                        # Model de usuário
│   │   ├── Project.php                     # Model de projeto
│   │   └── Task.php                        # Model de tarefa
│   └── Providers/
├── bootstrap/
├── config/
│   └── cors.php                            # Configuração CORS
├── database/
│   ├── migrations/                         # Migrations do banco
│   │   ├── create_users_table.php
│   │   ├── create_projects_table.php
│   │   ├── create_tasks_table.php
│   │   └── add_user_id_to_projects_and_tasks_table.php
│   └── seeders/
├── routes/
│   └── api.php                             # Rotas da API
├── storage/
├── composer.json                           # Dependências PHP
├── package.json                            # Dependências Node
└── README.md                               # Este arquivo
```

## 🌐 API Endpoints

### Autenticação

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/register` | Registrar novo usuário | ❌ |
| POST | `/api/login` | Login de usuário | ❌ |
| POST | `/api/logout` | Logout de usuário | ✅ |
| GET | `/api/user` | Obter usuário autenticado | ✅ |

### Projetos

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/projects` | Listar projetos do usuário | ✅ |
| POST | `/api/projects` | Criar novo projeto | ✅ |
| GET | `/api/projects/{id}` | Detalhes do projeto | ✅ |
| PUT | `/api/projects/{id}` | Atualizar projeto | ✅ |
| DELETE | `/api/projects/{id}` | Excluir projeto | ✅ |

### Tarefas

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/tasks` | Listar tarefas do usuário | ✅ |
| POST | `/api/tasks` | Criar nova tarefa | ✅ |
| GET | `/api/tasks/{id}` | Detalhes da tarefa | ✅ |
| PUT | `/api/tasks/{id}` | Atualizar tarefa | ✅ |
| DELETE | `/api/tasks/{id}` | Excluir tarefa | ✅ |

### Dashboard

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/dashboard-stats` | Estatísticas do dashboard | ✅ |

## 🔐 Autenticação

A API utiliza **Laravel Sanctum** para autenticação via tokens. 

### Fluxo de Autenticação

1. **Registro/Login**: O usuário recebe um token de acesso
2. **Requisições Protegidas**: Enviar o token no header:
   ```
   Authorization: Bearer {token}
   ```
3. **Logout**: O token é revogado

### Exemplo de Requisição Autenticada

```javascript
axios.get('/api/projects', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

## 💾 Banco de Dados

### Estrutura das Tabelas

#### Users
- `id` (PK)
- `name`
- `email` (unique)
- `password` (hashed)
- `created_at`, `updated_at`

#### Projects
- `id` (PK)
- `name`
- `description` (nullable)
- `due_date` (nullable)
- `user_id` (FK -> users)
- `created_at`, `updated_at`

#### Tasks
- `id` (PK)
- `project_id` (FK -> projects)
- `title`
- `description` (nullable)
- `status` (enum: pending, in_progress, completed)
- `due_date` (nullable)
- `user_id` (FK -> users)
- `created_at`, `updated_at`

### Relacionamentos

- **User** hasMany **Projects**
- **User** hasMany **Tasks**
- **Project** belongsTo **User**
- **Project** hasMany **Tasks**
- **Task** belongsTo **User**
- **Task** belongsTo **Project**

### Executar Migrations

```bash
php artisan migrate
```

### Rollback Migrations

```bash
php artisan migrate:rollback
```

## 📝 Validação de Dados

### Projetos

- `name`: obrigatório, string, máximo 255 caracteres
- `description`: opcional, string
- `due_date`: opcional, formato data válido

### Tarefas

- `project_id`: obrigatório, deve existir na tabela projects
- `title`: obrigatório, string, máximo 255 caracteres
- `description`: opcional, string
- `status`: opcional, valores permitidos: `pending`, `in_progress`, `completed`
- `due_date`: opcional, formato data válido

### Autenticação

- `name`: obrigatório, string, máximo 255 caracteres
- `email`: obrigatório, email válido, único
- `password`: obrigatório, mínimo 8 caracteres

## 🛡️ Middleware e Segurança

- **Autenticação**: Rotas protegidas usam `auth:sanctum`
- **CORS**: Configurado para permitir requisições do frontend
- **Validação**: Todos os inputs são validados antes de processamento
- **Sanitização**: Laravel sanitiza automaticamente os dados

## 📝 Scripts Disponíveis

### Composer Scripts

| Script | Descrição |
|--------|-----------|
| `composer install` | Instalar dependências |
| `composer update` | Atualizar dependências |
| `composer run dev` | Iniciar servidor + assets + queue |
| `composer run test` | Executar testes |

### Artisan Commands

| Comando | Descrição |
|---------|-----------|
| `php artisan serve` | Iniciar servidor de desenvolvimento |
| `php artisan migrate` | Executar migrations |
| `php artisan migrate:rollback` | Reverter última migration |
| `php artisan migrate:fresh` | Recriar banco (cuidado: apaga dados) |
| `php artisan config:clear` | Limpar cache de configuração |
| `php artisan cache:clear` | Limpar cache geral |
| `php artisan route:clear` | Limpar cache de rotas |
| `php artisan route:list` | Listar todas as rotas |

## 🧪 Testes

Executar testes:
```bash
php artisan test
```

ou

```bash
composer run test
```

## 🐛 Troubleshooting

### Erro de Conexão com Banco de Dados

Verifique as credenciais no arquivo `.env` e certifique-se de que o banco de dados existe:
```bash
php artisan config:clear
```

### Erro de CORS

Verifique o arquivo `config/cors.php` e certifique-se de que a origem do frontend está permitida.

### Token Inválido

Limpe o cache e recrie o token:
```bash
php artisan config:clear
php artisan cache:clear
```

### Erro 500

Verifique os logs em `storage/logs/laravel.log` para mais detalhes do erro.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Ryan da Costa Araujo

---

**Nota**: Sempre certifique-se de que o arquivo `.env` está configurado corretamente antes de iniciar o servidor.
