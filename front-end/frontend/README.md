# ProjectMate - Frontend

Aplicação frontend desenvolvida em React para gerenciamento de projetos e tarefas. Interface moderna e responsiva construída com React, Vite e Tailwind CSS.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Scripts Disponíveis](#scripts-disponíveis)

## 🎯 Sobre o Projeto

ProjectMate é uma aplicação web para gerenciamento de projetos e tarefas. O frontend oferece uma interface intuitiva onde os usuários podem:

- Autenticar-se no sistema
- Visualizar dashboard com estatísticas
- Criar, editar e excluir projetos
- Gerenciar tarefas associadas aos projetos
- Visualizar detalhes de projetos e tarefas

## 🛠 Tecnologias

- **React 19.1.1** - Biblioteca JavaScript para construção de interfaces
- **React Router DOM 7.9.4** - Roteamento para aplicações React
- **Vite 7.1.7** - Build tool e dev server
- **Axios 1.12.2** - Cliente HTTP para requisições à API
- **React Toastify 11.0.5** - Notificações toast
- **React Icons 5.5.0** - Ícones para React
- **Tailwind CSS 4.0.0** - Framework CSS utility-first
- **ESLint** - Linter para JavaScript/React

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Backend Laravel** rodando na porta 8000 (ou configurar URL customizada)

## 🚀 Instalação

1. Clone o repositório (ou navegue até a pasta do frontend):
```bash
cd front-end/frontend
```

2. Instale as dependências:
```bash
npm install
```

## ⚙️ Configuração

### Variáveis de Ambiente

O projeto está configurado para se comunicar com o backend em `http://localhost:8000/api`. Para alterar essa configuração, edite o arquivo:

```
src/axios.js
```

Exemplo:
```javascript
const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
```

## ▶️ Executando o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (porta padrão do Vite).

### Build para Produção

```bash
npm run build
```

O build será gerado na pasta `dist/`.

### Preview do Build

```bash
npm run preview
```

### Lint do Código

```bash
npm run lint
```

## 📁 Estrutura do Projeto

```
frontend/
├── public/                 # Arquivos estáticos públicos
├── src/
│   ├── assets/            # Imagens e outros assets
│   ├── components/        # Componentes reutilizáveis
│   │   ├── dashboardLayout/  # Layout do dashboard
│   │   ├── navbar/           # Barra de navegação
│   │   └── protectedRoute/   # Componente de rota protegida
│   ├── context/           # Context API (AuthContext)
│   ├── pages/             # Páginas da aplicação
│   │   ├── dashboard/     # Dashboard principal
│   │   ├── login/         # Página de login
│   │   ├── register/      # Página de registro
│   │   ├── projects/      # Listagem de projetos
│   │   ├── addProjects/   # Adicionar projeto
│   │   ├── editProjects/  # Editar projeto
│   │   ├── projectDetails/ # Detalhes do projeto
│   │   ├── tasks/         # Listagem de tarefas
│   │   ├── addTask/       # Adicionar tarefa
│   │   ├── editTask/      # Editar tarefa
│   │   └── taskDetails/   # Detalhes da tarefa
│   ├── services/          # Serviços de API (authServices)
│   ├── styles/            # Estilos globais
│   ├── App.jsx            # Componente raiz
│   ├── main.jsx           # Ponto de entrada
│   ├── axios.js           # Configuração do Axios
│   └── index.css          # Estilos CSS globais
├── index.html             # HTML principal
├── vite.config.js         # Configuração do Vite
├── package.json           # Dependências do projeto
└── README.md              # Este arquivo
```

## ✨ Funcionalidades

### Autenticação
- ✅ Login de usuário
- ✅ Registro de novo usuário
- ✅ Logout
- ✅ Rotas protegidas com autenticação

### Dashboard
- ✅ Visualização de estatísticas (total de projetos e tarefas)
- ✅ Interface responsiva

### Gerenciamento de Projetos
- ✅ Listagem de projetos do usuário
- ✅ Criação de novos projetos
- ✅ Edição de projetos existentes
- ✅ Exclusão de projetos
- ✅ Visualização de detalhes do projeto (com tarefas associadas)

### Gerenciamento de Tarefas
- ✅ Listagem de tarefas do usuário
- ✅ Criação de novas tarefas
- ✅ Edição de tarefas existentes
- ✅ Exclusão de tarefas
- ✅ Alteração de status (pending, in_progress, completed)
- ✅ Associação de tarefas a projetos

### UX/UI
- ✅ Interface moderna e responsiva
- ✅ Notificações toast para feedback ao usuário
- ✅ Loading states
- ✅ Tratamento de erros

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Cria um build de produção |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Executa o ESLint para verificar erros de código |

## 🔐 Autenticação

A aplicação usa **Laravel Sanctum** para autenticação via tokens. O token é armazenado no contexto de autenticação e enviado automaticamente em todas as requisições protegidas através do header `Authorization: Bearer {token}`.

## 🌐 API Endpoints Utilizados

A aplicação consome os seguintes endpoints do backend:

- `POST /api/login` - Autenticação
- `POST /api/register` - Registro de usuário
- `POST /api/logout` - Logout
- `GET /api/dashboard-stats` - Estatísticas do dashboard
- `GET /api/projects` - Listar projetos
- `POST /api/projects` - Criar projeto
- `GET /api/projects/{id}` - Detalhes do projeto
- `PUT /api/projects/{id}` - Atualizar projeto
- `DELETE /api/projects/{id}` - Excluir projeto
- `GET /api/tasks` - Listar tarefas
- `POST /api/tasks` - Criar tarefa
- `GET /api/tasks/{id}` - Detalhes da tarefa
- `PUT /api/tasks/{id}` - Atualizar tarefa
- `DELETE /api/tasks/{id}` - Excluir tarefa

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona bem em:
- 📱 Dispositivos móveis
- 💻 Tablets
- 🖥️ Desktops

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Ryan da Costa Araujo

---

**Nota**: Certifique-se de que o backend Laravel está rodando antes de iniciar o frontend.
