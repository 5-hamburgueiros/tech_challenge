import { ICreateCombo, IFindAllCombos } from '@/domain/use-cases';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateComboDto } from '../dtos';

@ApiTags('Combo')
@Controller('combo')
export class ComboController {
  constructor(
    @Inject(ICreateCombo)
    private readonly createCombo: ICreateCombo,
    @Inject(IFindAllCombos) private readonly findAll: IFindAllCombos,
  ) {}

  @Post()
  async create(@Body() dto: CreateComboDto) {
    return this.createCombo.execute({
      ativo: true,
      nome: dto.nome,
      valor: dto.valor,
      itens: dto.itens,
    });
  }

  @ApiQuery({
    name: 'nome',
    required: false,
  })
  @Get()
  async list(@Query('nome') nome: string) {
    return this.findAll.execute({
      nome,
    });
  }
}
