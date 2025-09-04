import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, User, LoginRequest, RegisterRequest } from '../types/auth';
import { authService } from '../services/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      setUser(response.user);
      toast.success(`Bem-vindo de volta, ${response.user.name}!`);
    } catch (error: any) {
      
      let message = 'Erro ao fazer login. Tente novamente.';
      
      if (error.response?.status === 401) {
        message = 'Email ou senha inválidos. Verifique suas credenciais.';
      } else if (error.response?.status === 400) {
        message = error.response?.data?.message || 'Dados inválidos. Verifique os campos.';
      } else if (error.response?.status >= 500) {
        message = 'Erro interno do servidor. Tente novamente mais tarde.';
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        message = 'Erro de conexão. Verifique sua internet e tente novamente.';
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      setUser(response.user);
      toast.success(`Conta criada com sucesso! Bem-vindo, ${response.user.name}!`);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao criar conta';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
