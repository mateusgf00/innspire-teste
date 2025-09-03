import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { HeroCharacter } from '../../users/entities/user.entity';

export class RegisterDto {
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
    description: 'Personagem heroico escolhido',
    enum: HeroCharacter,
    required: false,
  })
  @IsOptional()
  @IsEnum(HeroCharacter)
  character?: HeroCharacter;
}
