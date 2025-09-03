import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { ProjectStatus } from './entities/project.entity';

@ApiTags('projects')
@Controller('projects')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo projeto (apenas admins)' })
  @ApiResponse({ status: 201, description: 'Projeto criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Herói responsável não encontrado' })
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar projetos com filtros opcionais' })
  @ApiResponse({ status: 200, description: 'Lista de projetos retornada com sucesso' })
  @ApiQuery({ name: 'status', enum: ProjectStatus, required: false, description: 'Filtrar por status' })
  @ApiQuery({ name: 'responsibleId', type: 'string', required: false, description: 'Filtrar por herói responsável' })
  findAll(
    @Query('status') status?: ProjectStatus,
    @Query('responsibleId') responsibleId?: string,
  ) {
    return this.projectsService.findAll(status, responsibleId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Obter estatísticas gerais dos projetos' })
  @ApiResponse({ status: 200, description: 'Estatísticas retornadas com sucesso' })
  getStats() {
    return this.projectsService.getProjectStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar projeto por ID' })
  @ApiResponse({ status: 200, description: 'Projeto encontrado' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar projeto (apenas admins)' })
  @ApiResponse({ status: 200, description: 'Projeto atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado' })
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Patch(':id/progress')
  @ApiOperation({ summary: 'Atualizar progresso do projeto' })
  @ApiResponse({ status: 200, description: 'Progresso atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado' })
  updateProgress(@Param('id') id: string, @Body() progressData: UpdateProjectDto) {
    return this.projectsService.updateProgress(id, progressData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar projeto (apenas admins)' })
  @ApiResponse({ status: 200, description: 'Projeto deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado' })
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
