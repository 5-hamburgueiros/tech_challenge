import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateIgredienteDto {
  @ApiProperty({
    description: 'Quantidade de calorias do ingrediente',
    example: 120,
  })
  @IsNumber()
  calorias: number;

  @ApiProperty({
    description: 'Preço de custo do ingrediente',
    example: 0.2,
  })
  @IsNumber()
  custo: number;

  @ApiProperty({
    description: 'Valor do ingrediente como extra',
    example: 5,
  })
  @IsNumber()
  valor: number;

  @ApiProperty({
    description: 'Nome do ingrediente',
    example: 'Bacon',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Quantidade (peso?) do ingrediente',
  })
  @IsNumber()
  quantidade: number;
}
