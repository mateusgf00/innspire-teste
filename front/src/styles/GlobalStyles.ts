import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    line-height: 1.5;
    font-weight: 400;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.primary};
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      opacity: 0.8;
    }
  }

  button {
    border-radius: ${({ theme }) => theme.borderRadius.small};
    border: 1px solid transparent;
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: 500;
    font-family: inherit;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text.white};
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
    
    &:focus,
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 600;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.xxxlarge};
    line-height: 1.1;
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xlarge};
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.6;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.text.light};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.text.secondary};
  }
`;
