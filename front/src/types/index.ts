export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface HealthStatus {
  status: string;
  timestamp: string;
  service: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
