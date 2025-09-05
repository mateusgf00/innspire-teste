import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project, ProjectStatus } from './entities/project.entity';
import { UsersService } from '../users/users.service';
import { CreateProjectDto } from './dto/create-project.dto';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repository: jest.Mocked<Repository<Project>>;
  let usersService: jest.Mocked<UsersService>;

  const mockProject: Project = {
    id: '1',
    name: 'Save the City',
    description: 'A heroic mission',
    status: ProjectStatus.IN_PROGRESS,
    responsibleId: '1',
    responsible: null,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    agilityGoal: 80,
    enchantmentGoal: 70,
    efficiencyGoal: 90,
    excellenceGoal: 85,
    transparencyGoal: 75,
    ambitionGoal: 95,
    agilityProgress: 40,
    enchantmentProgress: 35,
    efficiencyProgress: 45,
    excellenceProgress: 42,
    transparencyProgress: 37,
    ambitionProgress: 47,
    get completionPercentage() { return 50; },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      createQueryBuilder: jest.fn(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn(),
      })),
    };

    const mockUsersService = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockRepo,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    repository = module.get(getRepositoryToken(Project));
    usersService = module.get(UsersService);
  });

  describe('create', () => {
    it('deve criar um novo projeto com sucesso', async () => {
      const createProjectDto: CreateProjectDto = {
        name: 'New Mission',
        description: 'A new heroic mission',
        status: ProjectStatus.PENDING,
        responsibleId: '1',
        agilityGoal: 80,
        enchantmentGoal: 70,
        efficiencyGoal: 90,
        excellenceGoal: 85,
        transparencyGoal: 75,
        ambitionGoal: 95,
      };

      usersService.findOne.mockResolvedValue({} as any);
      repository.create.mockReturnValue(mockProject);
      repository.save.mockResolvedValue(mockProject);

      const result = await service.create(createProjectDto);

      expect(usersService.findOne).toHaveBeenCalledWith(createProjectDto.responsibleId);
      expect(repository.create).toHaveBeenCalledWith(createProjectDto);
      expect(result).toEqual(mockProject);
    });

    it('deve lançar BadRequestException se a data de início for posterior à data de fim', async () => {
      const invalidDto: CreateProjectDto = {
        name: 'Invalid Project',
        description: 'Invalid dates',
        status: ProjectStatus.PENDING,
        responsibleId: '1',
        startDate: '2024-12-31',
        endDate: '2024-01-01',
        agilityGoal: 50,
        enchantmentGoal: 50,
        efficiencyGoal: 50,
        excellenceGoal: 50,
        transparencyGoal: 50,
        ambitionGoal: 50,
      };

      usersService.findOne.mockResolvedValue({} as any);

      await expect(service.create(invalidDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('deve retornar um projeto por ID', async () => {
      repository.findOne.mockResolvedValue(mockProject);

      const result = await service.findOne('1');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['responsible'],
      });
      expect(result).toEqual(mockProject);
    });

    it('deve lançar NotFoundException se o projeto não for encontrado', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });
});