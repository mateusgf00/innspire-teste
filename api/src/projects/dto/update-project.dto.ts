import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, Min, Max } from 'class-validator';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({
    description: 'Progresso de Agilidade (0-100%)',
    example: 45,
    minimum: 0,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  agilityProgress?: number;

  @ApiProperty({
    description: 'Progresso de Encantamento (0-100%)',
    example: 60,
    minimum: 0,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  enchantmentProgress?: number;

  @ApiProperty({
    description: 'Progresso de Eficiência (0-100%)',
    example: 30,
    minimum: 0,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  efficiencyProgress?: number;

  @ApiProperty({
    description: 'Progresso de Excelência (0-100%)',
    example: 70,
    minimum: 0,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  excellenceProgress?: number;

  @ApiProperty({
    description: 'Progresso de Transparência (0-100%)',
    example: 55,
    minimum: 0,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  transparencyProgress?: number;

  @ApiProperty({
    description: 'Progresso de Ambição (0-100%)',
    example: 85,
    minimum: 0,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  ambitionProgress?: number;
}
