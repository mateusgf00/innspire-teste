# HeroForce - Sistema de Gestão de Projetos

Sistema para gerenciamento de projetos com React + NestJS.

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- npm



### 1. Configurar Backend
```bash
cd api
npm install

cp .env.example .env

npm run migration:run

npm run start:dev
```
### 2. Configurar Frontend
```bash
cd front
npm install
npm run dev
```

## 🌐 Acessos
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

## 👤 Login Padrão

Por questões de segurança, usuários comuns não podem se auto-promover a administrador. O sistema cria automaticamente um usuário admin na primeira execução:

- **Admin:** admin@heroforce.com / admin123

## 🧪 Testes
```bash
cd api
npm test
```