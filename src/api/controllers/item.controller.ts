import { CategoriaItem } from '@/domain/enum';
import { ICreateItem, IFindAllItens } from '@/domain/use-cases';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from '../dtos';

@ApiTags('Itens')
@Controller('itens')
export class ItemController {
  constructor(
    @Inject(ICreateItem)
    private readonly createItem: ICreateItem,
    @Inject(IFindAllItens) private readonly findAll: IFindAllItens,
  ) {}

  @Post()
  async create(@Body() dto: CreateItemDto) {
    return this.createItem.execute({
      categoria: dto.categoria,
      nome: dto.nome,
      valor: dto.valor,
      ingredientes: dto.ingredientes,
    });
  }

  @ApiQuery({
    name: 'nome',
    required: false,
  })
  @ApiQuery({
    name: 'categoria',
    enum: CategoriaItem,
    required: false,
  })
  @Get()
  async list(
    @Query('nome') nome: string,
    @Query('categoria') categoria: CategoriaItem,
  ) {
    return this.findAll.execute({
      categoria,
      nome,
    });
  }
}
