import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateComboDto {
  @ApiProperty({
    description: 'Nome do combo',
    example: 'X-Bacon, Batata-frita e Coca-cola',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Valor do combo',
    example: 29.9,
  })
  @IsNumber()
  valor: number;
  @ApiProperty({
    description: 'Lista de itens que compõem o combo',
    example: ['fake-id-1', 'fake-id-2', 'fake-id-3'],
  })
  @IsArray()
  itens: string[];
}
