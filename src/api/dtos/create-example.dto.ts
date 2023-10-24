import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateExampleDto {
  @ApiProperty({
    description: 'Random name',
    example: 'Foo Bar',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Random email',
    example: 'foo@bar.com',
  })
  @IsEmail()
  email: string;
}
