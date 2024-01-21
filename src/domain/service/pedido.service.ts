import { PedidoModelTypeOrm } from '@/infra/database/typerom/model';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { StatusPedido } from '../enum';

export interface IPedidoService {
  paginate<T>(
    options: IPaginationOptions,
    query: IPedidoService.Query,
  ): Promise<Pagination<T>>;

  inProgress(): Promise<PedidoModelTypeOrm[]>;
}

export const IPedidoService = Symbol('IPedidoService');

export namespace IPedidoService {
  export type Query = {
    status: StatusPedido;
    documento?: string;
  };
}
