import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private usersService: UsersService,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    await this.usersService.findOne(createProjectDto.responsibleId);

    if (createProjectDto.startDate && createProjectDto.endDate) {
      const startDate = new Date(createProjectDto.startDate);
      const endDate = new Date(createProjectDto.endDate);
      
      if (startDate >= endDate) {
        throw new BadRequestException('Data de início deve ser anterior à data de fim');
      }
    }

    const project = this.projectRepository.create(createProjectDto);
    return await this.projectRepository.save(project);
  }

  async findAll(status?: ProjectStatus, responsibleId?: string): Promise<Project[]> {
    const query = this.projectRepository.createQueryBuilder('project')
      .leftJoinAndSelect('project.responsible', 'responsible');

    if (status) {
      query.andWhere('project.status = :status', { status });
    }

    if (responsibleId) {
      query.andWhere('project.responsibleId = :responsibleId', { responsibleId });
    }

    return await query.getMany();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['responsible'],
    });

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);

    if (updateProjectDto.responsibleId) {
      await this.usersService.findOne(updateProjectDto.responsibleId);
    }

    const startDate = updateProjectDto.startDate ? new Date(updateProjectDto.startDate) : project.startDate;
    const endDate = updateProjectDto.endDate ? new Date(updateProjectDto.endDate) : project.endDate;
    
    if (startDate && endDate && startDate >= endDate) {
      throw new BadRequestException('Data de início deve ser anterior à data de fim');
    }

    await this.projectRepository.update(id, updateProjectDto);
    return await this.findOne(id);
  }

  async updateProgress(id: string, progressData: Partial<UpdateProjectDto>): Promise<Project> {
    const project = await this.findOne(id);
    
    const updateData: Partial<Project> = {};
    
    if (progressData.agilityProgress !== undefined) updateData.agilityProgress = progressData.agilityProgress;
    if (progressData.enchantmentProgress !== undefined) updateData.enchantmentProgress = progressData.enchantmentProgress;
    if (progressData.efficiencyProgress !== undefined) updateData.efficiencyProgress = progressData.efficiencyProgress;
    if (progressData.excellenceProgress !== undefined) updateData.excellenceProgress = progressData.excellenceProgress;
    if (progressData.transparencyProgress !== undefined) updateData.transparencyProgress = progressData.transparencyProgress;
    if (progressData.ambitionProgress !== undefined) updateData.ambitionProgress = progressData.ambitionProgress;

    await this.projectRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }

  async getProjectStats(): Promise<{
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    averageCompletion: number;
  }> {
    const [projects, total] = await this.projectRepository.findAndCount({
      relations: ['responsible'],
    });

    const pending = projects.filter(p => p.status === ProjectStatus.PENDING).length;
    const inProgress = projects.filter(p => p.status === ProjectStatus.IN_PROGRESS).length;
    const completed = projects.filter(p => p.status === ProjectStatus.COMPLETED).length;

    const totalCompletion = projects.reduce((sum, project) => sum + project.completionPercentage, 0);
    const averageCompletion = total > 0 ? Math.round(totalCompletion / total) : 0;

    return {
      total,
      pending,
      inProgress,
      completed,
      averageCompletion,
    };
  }
}
