import { PedidoController } from '@/api/controllers/pedido.controller';
import { PedidoService } from '@/api/services';
import {
  CreatePedidoUseCase,
  FindPedidoByIdUseCase,
  PagamentoPedidoUseCase,
} from '@/application/use-cases';
import { CriaPagamentoUseCase } from '@/application/use-cases/pagamento/cria-pagamento.use-case';
import { UpdateStatusPedidoUseCase } from '@/application/use-cases/pedidos/update-status-pedido.use-case';
import {
  IClienteRepository,
  IComboRepository,
  IItemRepository,
  IPedidoRepository,
} from '@/domain/repository';
import { IPedidoHistoricoRepository } from '@/domain/repository/pedido-historico.repository';
import { IPedidoService } from '@/domain/service';
import { ICreatePedido, IFindById, IPagamentoPedido } from '@/domain/use-cases';
import { ICriaPagamento } from '@/domain/use-cases/pagamento/cria-pagamento.use-case';
import { IUpdateStatusPedidoUseCase } from '@/domain/use-cases/pedidos/update-status-pedido.use-case';
import {
  ClienteModelTypeOrm,
  ComboModelTypeOrm,
  ItemModelTypeOrm,
  PagamentoModelTypeOrm,
  PedidoHistoricoModelTypeOrm,
  PedidoModelTypeOrm,
  StatusModelTypeOrm,
} from '@/infra/database/typerom/model';
import {
  ClienteRepositoryTypeOrm,
  ItemRepositoryTypeOrm,
  PedidoRepositoryTypeOrm,
} from '@/infra/repository/typeorm';
import { ComboRepositoryTypeOrm } from '@/infra/repository/typeorm/combo';
import { PedidoHistoricoRepositoryTypeOrm } from '@/infra/repository/typeorm/pedido-historico';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PedidoController],
  imports: [
    TypeOrmModule.forFeature([
      PedidoModelTypeOrm,
      ItemModelTypeOrm,
      ClienteModelTypeOrm,
      ComboModelTypeOrm,
      StatusModelTypeOrm,
      PedidoHistoricoModelTypeOrm,
      PagamentoModelTypeOrm,
    ]),
    HttpModule,
  ],
  providers: [
    {
      provide: ICreatePedido,
      useClass: CreatePedidoUseCase,
    },
    {
      provide: IFindById,
      useClass: FindPedidoByIdUseCase,
    },
    {
      provide: IItemRepository,
      useClass: ItemRepositoryTypeOrm,
    },
    {
      provide: IClienteRepository,
      useClass: ClienteRepositoryTypeOrm,
    },
    {
      provide: IComboRepository,
      useClass: ComboRepositoryTypeOrm,
    },
    {
      provide: IPedidoRepository,
      useClass: PedidoRepositoryTypeOrm,
    },
    {
      provide: IPagamentoPedido,
      useClass: PagamentoPedidoUseCase,
    },
    {
      provide: IPedidoHistoricoRepository,
      useClass: PedidoHistoricoRepositoryTypeOrm,
    },
    {
      provide: IUpdateStatusPedidoUseCase,
      useClass: UpdateStatusPedidoUseCase,
    },
    {
      provide: IPedidoService,
      useClass: PedidoService,
    },
    {
      provide: ICriaPagamento,
      useClass: CriaPagamentoUseCase,
    },
  ],
})
export class PedidoModule {}
