# HeroForce Frontend

Frontend da aplicação HeroForce desenvolvido com React, TypeScript e Vite.

## 🚀 Tecnologias

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e dev server ultra-rápido
- **React Router** - Roteamento para aplicações React
- **Styled Components** - CSS-in-JS para estilização
- **Axios** - Cliente HTTP para requisições à API

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- HeroForce API rodando na porta 3000

## 🔧 Instalação

1. Clone o repositório e navegue até a pasta do frontend:
```bash
cd heroforce-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Ajuste as configurações no arquivo `.env`:
```env
VITE_API_URL=http://localhost:3000
VITE_NODE_ENV=development
```

## 🏃‍♂️ Executando

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Linting
npm run lint
```

A aplicação estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
src/
├── components/      # Componentes reutilizáveis
├── pages/          # Páginas da aplicação
├── hooks/          # Custom hooks
├── utils/          # Utilitários e helpers
├── types/          # Definições de tipos TypeScript
│   ├── index.ts    # Tipos gerais
│   └── styled.d.ts # Tipos do styled-components
├── styles/         # Configurações de estilo
│   ├── theme.ts    # Tema global
│   └── GlobalStyles.ts # Estilos globais
├── App.tsx         # Componente principal
└── main.tsx        # Ponto de entrada
```

## 🎯 Funcionalidades

- ✅ Roteamento com React Router
- ✅ Integração com API backend
- ✅ Tipagem completa com TypeScript
- ✅ Design responsivo
- ✅ Estilização com Styled Components e tema global
- ✅ Verificação de status da API
- ✅ Interceptadores para autenticação
- ✅ Custom hooks para consumo de API
- ✅ Sistema de tema consistente
- ✅ Componentes estilizados reutilizáveis

## 🔗 Endpoints Disponíveis

- `/` - Página inicial com status da API
- `/about` - Informações sobre o projeto

## 🛠 Desenvolvimento

### Adicionando novas páginas:
1. Crie o componente em `src/pages/`
2. Adicione a rota em `src/App.tsx`
3. Adicione o link de navegação no `Header`

### Consumindo a API:
```typescript
import { useApi } from '@/hooks/useApi';

const MyComponent = () => {
  const { data, loading, error } = useApi('/api/endpoint');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{JSON.stringify(data)}</div>;
};
```

### Usando Styled Components:
```typescript
import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.white};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const MyComponent = () => {
  return <StyledButton>Click me!</StyledButton>;
};
```

### Acessando o tema:
```typescript
import { useTheme } from 'styled-components';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <div style={{ color: theme.colors.primary }}>
      Themed component
    </div>
  );
};
```

## 📦 Build

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
