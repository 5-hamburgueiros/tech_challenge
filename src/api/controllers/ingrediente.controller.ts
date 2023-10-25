import { ICreateIngrediente, IFindAllIngredientes } from '@/domain/use-cases';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateIgredienteDto } from '../dtos';

@ApiTags('Ingredientes')
@Controller('ingredientes')
export class IngredienteController {
  constructor(
    @Inject(ICreateIngrediente)
    private readonly createIngrediente: ICreateIngrediente,
    @Inject(IFindAllIngredientes)
    private readonly findAll: IFindAllIngredientes,
  ) {}

  @Post()
  async create(@Body() dto: CreateIgredienteDto) {
    return this.createIngrediente.execute(dto);
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
