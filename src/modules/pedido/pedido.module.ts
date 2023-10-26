import { PedidoController } from '@/api/controllers/pedido.controller';
import {
  CreatePedidoUseCase,
  FindPedidoByIdUseCase,
} from '@/application/use-cases';
import {
  IClienteRepository,
  IComboRepository,
  IItemRepository,
  IPedidoRepository,
} from '@/domain/repository';
import { ICreatePedido, IFindById } from '@/domain/use-cases';
import {
  ClienteModelTypeOrm,
  ComboModelTypeOrm,
  ItemModelTypeOrm,
  PedidoModelTypeOrm,
  StatusModelTypeOrm,
} from '@/infra/database/typerom/model';
import {
  ClienteRepositoryTypeOrm,
  ItemRepositoryTypeOrm,
  PedidoRepositoryTypeOrm,
} from '@/infra/repository/typeorm';
import { ComboRepositoryTypeOrm } from '@/infra/repository/typeorm/combo';
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
    ]),
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
  ],
})
export class PedidoModule {}
