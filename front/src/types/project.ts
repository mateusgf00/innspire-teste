import { User } from './auth';

export enum ProjectStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;

  agilityGoal: number;
  enchantmentGoal: number;
  efficiencyGoal: number;
  excellenceGoal: number;
  transparencyGoal: number;
  ambitionGoal: number;
  
  agilityProgress: number;
  enchantmentProgress: number;
  efficiencyProgress: number;
  excellenceProgress: number;
  transparencyProgress: number;
  ambitionProgress: number;
  
  startDate?: string;
  endDate?: string;
  responsible: User;
  responsibleId: string;
  createdAt: string;
  updatedAt: string;
  
  completionPercentage: number;
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  status?: ProjectStatus;
  responsibleId: string;
  agilityGoal: number;
  enchantmentGoal: number;
  efficiencyGoal: number;
  excellenceGoal: number;
  transparencyGoal: number;
  ambitionGoal: number;
  startDate?: string;
  endDate?: string;
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {
  agilityProgress?: number;
  enchantmentProgress?: number;
  efficiencyProgress?: number;
  excellenceProgress?: number;
  transparencyProgress?: number;
  ambitionProgress?: number;
}

export interface ProjectStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  averageCompletion: number;
}

export interface ProjectFilters {
  status?: ProjectStatus;
  responsibleId?: string;
  search?: string;
}

export interface HeroForceValue {
  name: string;
  key: keyof Pick<Project, 'agilityGoal' | 'enchantmentGoal' | 'efficiencyGoal' | 'excellenceGoal' | 'transparencyGoal' | 'ambitionGoal'>;
  progressKey: keyof Pick<Project, 'agilityProgress' | 'enchantmentProgress' | 'efficiencyProgress' | 'excellenceProgress' | 'transparencyProgress' | 'ambitionProgress'>;
  color: string;
  description: string;
}

export const HERO_FORCE_VALUES: HeroForceValue[] = [
  {
    name: 'Agilidade',
    key: 'agilityGoal',
    progressKey: 'agilityProgress',
    color: 'agility',
    description: 'Velocidade e adaptabilidade na execução'
  },
  {
    name: 'Encantamento',
    key: 'enchantmentGoal',
    progressKey: 'enchantmentProgress',
    color: 'enchantment',
    description: 'Capacidade de inspirar e encantar'
  },
  {
    name: 'Eficiência',
    key: 'efficiencyGoal',
    progressKey: 'efficiencyProgress',
    color: 'efficiency',
    description: 'Otimização de recursos e processos'
  },
  {
    name: 'Excelência',
    key: 'excellenceGoal',
    progressKey: 'excellenceProgress',
    color: 'excellence',
    description: 'Busca pela perfeição e qualidade'
  },
  {
    name: 'Transparência',
    key: 'transparencyGoal',
    progressKey: 'transparencyProgress',
    color: 'transparency',
    description: 'Clareza e honestidade nas ações'
  },
  {
    name: 'Ambição',
    key: 'ambitionGoal',
    progressKey: 'ambitionProgress',
    color: 'ambition',
    description: 'Determinação para alcançar grandes objetivos'
  },
];
