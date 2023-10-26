import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Random name',
    example: 'Foo Bar',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Random email',
    example: 'foo@bar.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Random document',
    example: '12345678900',
  })
  @IsString()
  documento: string;
}
