import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AutenticacaoSignUpDto {
  @ApiProperty({
    description: 'CPF do cliente',
    example: '96740529507',
  })
  @IsString()
  cpf: string;
}
