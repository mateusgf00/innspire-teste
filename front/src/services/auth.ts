import { apiService } from './api';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../types/auth';

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials);
    
    localStorage.setItem('heroforce_token', response.access_token);
    localStorage.setItem('heroforce_user', JSON.stringify(response.user));
    
    return response;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/register', userData);

    localStorage.setItem('heroforce_token', response.access_token);
    localStorage.setItem('heroforce_user', JSON.stringify(response.user));
    
    return response;
  }

  async getProfile(): Promise<User> {
    return apiService.get<User>('/auth/profile');
  }

  logout(): void {
    localStorage.removeItem('heroforce_token');
    localStorage.removeItem('heroforce_user');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('heroforce_user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('heroforce_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
