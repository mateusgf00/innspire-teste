import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsInt,
  Min,
  Max,
  IsDateString,
} from 'class-validator';
import { ProjectStatus } from '../entities/project.entity';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Nome do projeto heroico',
    example: 'Operação Salvamento da Cidade',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descrição detalhada do projeto',
    example: 'Projeto para salvar a cidade de Nova York de uma invasão alienígena',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Status inicial do projeto',
    enum: ProjectStatus,
    default: ProjectStatus.PENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiProperty({
    description: 'ID do herói responsável pelo projeto',
    example: 'uuid-do-heroi',
  })
  @IsNotEmpty()
  @IsUUID()
  responsibleId: string;

  @ApiProperty({
    description: 'Meta de Agilidade (0-100%)',
    example: 85,
    minimum: 0,
    maximum: 100,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  agilityGoal: number;

  @ApiProperty({
    description: 'Meta de Encantamento (0-100%)',
    example: 90,
    minimum: 0,
    maximum: 100,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  enchantmentGoal: number;

  @ApiProperty({
    description: 'Meta de Eficiência (0-100%)',
    example: 75,
    minimum: 0,
    maximum: 100,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  efficiencyGoal: number;

  @ApiProperty({
    description: 'Meta de Excelência (0-100%)',
    example: 95,
    minimum: 0,
    maximum: 100,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  excellenceGoal: number;

  @ApiProperty({
    description: 'Meta de Transparência (0-100%)',
    example: 80,
    minimum: 0,
    maximum: 100,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  transparencyGoal: number;

  @ApiProperty({
    description: 'Meta de Ambição (0-100%)',
    example: 100,
    minimum: 0,
    maximum: 100,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  ambitionGoal: number;

  @ApiProperty({
    description: 'Data de início do projeto',
    example: '2024-01-15',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    description: 'Data de fim prevista do projeto',
    example: '2024-06-15',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
