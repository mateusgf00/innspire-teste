import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { HeroCharacter } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'Personagem heroico escolhido',
    enum: HeroCharacter,
    required: false,
  })
  @IsOptional()
  @IsEnum(HeroCharacter)
  character?: HeroCharacter;
}
