import { PedidoEntity } from '@/domain/entities';
import { ICreatePedido } from '@/domain/use-cases';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePedidoDto } from '../dtos';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidoController {
  constructor(
    @Inject(ICreatePedido)
    private readonly createPedidoUseCase: ICreatePedido,
  ) {}

  @Post()
  async create(
    @Body() createPedidoDto: CreatePedidoDto,
  ): Promise<PedidoEntity> {
    return this.createPedidoUseCase.execute(createPedidoDto);
  }
}
