import { PedidoEntity } from '@/domain/entities';
import { ICreatePedido, IFindById, IPagamentoPedido } from '@/domain/use-cases';
import { IUpdateStatusPedidoUseCase } from '@/domain/use-cases/pedidos/update-status-pedido.use-case';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreatePedidoDto } from '../dtos';
import { UpdateStatusDto } from '../dtos/pagamento-pedido';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidoController {
  constructor(
    @Inject(ICreatePedido)
    private readonly createPedidoUseCase: ICreatePedido,
    @Inject(IFindById)
    private readonly findPedidoByIdUseCase: IFindById,
    @Inject(IPagamentoPedido)
    private readonly pagamentoPedido: IPagamentoPedido,
    @Inject(IUpdateStatusPedidoUseCase)
    private readonly updateStatusPedidoUseCase: IUpdateStatusPedidoUseCase,
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

  @ApiParam({ name: 'id' })
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<PedidoEntity> {
    return this.updateStatusPedidoUseCase.execute({ id, ...updateStatusDto });
  }
}