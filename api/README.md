# HeroForce API

API desenvolvida com NestJS, TypeORM e PostgreSQL.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- npm ou yarn

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure o banco de dados PostgreSQL e ajuste as variáveis no arquivo `.env`:
```bash
cp .env.example .env
```

3. Ajuste as configurações do banco de dados no arquivo `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=heroforce
```

## Executando a aplicação

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## Estrutura do projeto

```
src/
├── config/          # Configurações (banco de dados, etc)
├── entities/        # Entidades do TypeORM
├── modules/         # Módulos da aplicação
├── common/          # Utilitários compartilhados
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
├── app.module.ts    # Módulo principal
├── app.controller.ts
├── app.service.ts
└── main.ts          # Ponto de entrada
```

## Endpoints disponíveis

- `GET /` - Mensagem de boas-vindas
- `GET /health` - Status da aplicação

## Migrações do banco de dados

```bash
# Gerar migração
npm run migration:generate -- src/migrations/MigrationName

# Executar migrações
npm run migration:run

# Reverter migração
npm run migration:revert
```
