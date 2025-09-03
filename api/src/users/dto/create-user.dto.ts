import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { HeroCharacter, UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do herói',
    example: 'Peter Parker',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email do herói',
    example: 'peter.parker@heroforce.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do herói (mínimo 6 caracteres)',
    example: 'spider123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Papel do usuário no sistema',
    enum: UserRole,
    default: UserRole.HERO,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    description: 'Personagem heroico escolhido',
    enum: HeroCharacter,
    required: false,
  })
  @IsOptional()
  @IsEnum(HeroCharacter)
  character?: HeroCharacter;
}
