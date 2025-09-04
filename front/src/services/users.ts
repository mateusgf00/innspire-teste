import { apiService } from './api';
import { User } from '../types/auth';

class UsersService {
  async getUsers(): Promise<User[]> {
    return apiService.get<User[]>('/users');
  }

  async getUser(id: string): Promise<User> {
    return apiService.get<User>(`/users/${id}`);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return apiService.patch<User>(`/users/${id}`, data);
  }

  async deleteUser(id: string): Promise<void> {
    return apiService.delete(`/users/${id}`);
  }
}

export const usersService = new UsersService();
