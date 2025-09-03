import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email do herói',
    example: 'peter.parker@heroforce.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do herói',
    example: 'spider123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
