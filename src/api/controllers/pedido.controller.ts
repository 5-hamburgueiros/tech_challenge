import { PedidoEntity } from '@/domain/entities';
import { ICreatePedido, IFindById } from '@/domain/use-cases';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreatePedidoDto } from '../dtos';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidoController {
  constructor(
    @Inject(ICreatePedido)
    private readonly createPedidoUseCase: ICreatePedido,
    @Inject(IFindById)
    private readonly findPedidoByIdUseCase: IFindById,
  ) {}

  @Post()
  async create(
    @Body() createPedidoDto: CreatePedidoDto,
  ): Promise<PedidoEntity> {
    return this.createPedidoUseCase.execute(createPedidoDto);
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<PedidoEntity> {
    return this.findPedidoByIdUseCase.execute({ id });
  }
}
