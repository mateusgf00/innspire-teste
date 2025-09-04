import { apiService } from './api';
import { 
  Project, 
  CreateProjectRequest, 
  UpdateProjectRequest, 
  ProjectStats, 
  ProjectStatus 
} from '../../src/types/project';

class ProjectsService {
  async getProjects(status?: ProjectStatus, responsibleId?: string): Promise<Project[]> {
    const params: any = {};
    if (status) params.status = status;
    if (responsibleId) params.responsibleId = responsibleId;
    
    return apiService.get<Project[]>('/projects', params);
  }

  async getProject(id: string): Promise<Project> {
    return apiService.get<Project>(`/projects/${id}`);
  }

  async createProject(data: CreateProjectRequest): Promise<Project> {
    return apiService.post<Project>('/projects', data);
  }

  async updateProject(id: string, data: UpdateProjectRequest): Promise<Project> {
    return apiService.patch<Project>(`/projects/${id}`, data);
  }

  async updateProjectProgress(id: string, progressData: Partial<UpdateProjectRequest>): Promise<Project> {
    return apiService.patch<Project>(`/projects/${id}/progress`, progressData);
  }

  async deleteProject(id: string): Promise<void> {
    return apiService.delete(`/projects/${id}`);
  }

  async getProjectStats(): Promise<ProjectStats> {
    return apiService.get<ProjectStats>('/projects/stats');
  }
}

export const projectsService = new ProjectsService();
