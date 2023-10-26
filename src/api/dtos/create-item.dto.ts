import { IdGenerator } from '@/common';
import { CategoriaItem } from '@/domain/enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateItemDto {
  @ApiProperty({
    description: 'Categoria do item',
    example: CategoriaItem.Bebida,
  })
  @IsString()
  @IsEnum(CategoriaItem)
  categoria: CategoriaItem;

  @ApiProperty({
    description: 'Nome do item',
    example: 'Coca cola - Lata 350ml',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Valor do item',
    example: 5,
  })
  @IsNumber()
  valor: number;

  @ApiProperty({
    description: 'Id dos Ingredientes que fazem parte da composição do item',
    required: false,
    example: [IdGenerator.Generate()],
  })
  @IsOptional()
  @IsArray()
  ingredientes: string[];
}
