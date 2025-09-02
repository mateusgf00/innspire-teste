export const theme = {
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    background: '#f8fafc',
    surface: '#ffffff',
    text: {
      primary: '#333333',
      secondary: '#666666',
      light: '#999999',
      white: '#ffffff',
    },
    gradient: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      light: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    },
    shadow: {
      light: '0 4px 20px rgba(0, 0, 0, 0.1)',
      medium: '0 8px 30px rgba(0, 0, 0, 0.15)',
    },
  },
  fonts: {
    primary: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  fontSizes: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.2rem',
    xlarge: '1.5rem',
    xxlarge: '2rem',
    xxxlarge: '3rem',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem',
  },
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '15px',
    xlarge: '20px',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
};

export type Theme = typeof theme;
