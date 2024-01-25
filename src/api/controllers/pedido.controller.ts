import { PedidoEntity } from '@/domain/entities';
import { StatusPedido } from '@/domain/enum';
import { IPedidoService } from '@/domain/service';
import { ICreatePedido, IFindById } from '@/domain/use-cases';
import { IUpdateStatusPedidoUseCase } from '@/domain/use-cases/pedidos/update-status-pedido.use-case';
import { PedidoModelTypeOrm } from '@/infra/database/typerom/model';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
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
    @Inject(IUpdateStatusPedidoUseCase)
    private readonly updateStatusPedidoUseCase: IUpdateStatusPedidoUseCase,
    @Inject(IPedidoService)
    private readonly pedidoService: IPedidoService,
  ) {}

  @ApiOperation({
    summary:
      "Para clientes que realizarem pedidos de forma anônima, não deverá passar o campo 'cliente' na requisição",
  })
  @Post()
  async create(
    @Body() createPedidoDto: CreatePedidoDto,
  ): Promise<PedidoEntity> {
    return this.createPedidoUseCase.execute(createPedidoDto);
  }

  @ApiQuery({
    name: 'documento',
    required: false,
  })
  @ApiQuery({
    name: 'status',
    enum: StatusPedido,
    type: 'array',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @Get()
  async list(
    @Query('documento') documento: string,
    @Query(
      'status',
      new ParseArrayPipe({ optional: true, items: String, separator: ',' }),
    )
    status: Array<StatusPedido>,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<PedidoModelTypeOrm>> {
    return this.pedidoService.paginate(
      {
        page,
        limit,
        route: 'http://localhost:3333/itens',
      },
      {
        status,
        documento,
      },
    );
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<PedidoEntity> {
    return this.findPedidoByIdUseCase.execute({ id });
  }
  @ApiOperation({
    summary: 'Atualiza o status do pedido (simulação de preparo)',
  })
  @ApiParam({ name: 'id' })
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<PedidoEntity> {
    return this.updateStatusPedidoUseCase.execute({ id, ...updateStatusDto });
  }
}
