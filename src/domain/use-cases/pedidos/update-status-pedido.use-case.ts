import { PedidoEntity } from '@/domain/entities';
import { StatusPedido } from '@/domain/enum';

export interface IUpdateStatusPedidoUseCase {
  execute(
    params: IUpdateStatusPedidoUseCase.Params,
  ): Promise<IUpdateStatusPedidoUseCase.Result>;
}

export const IUpdateStatusPedidoUseCase = Symbol('IUpdateStatusPedidoUseCase');

export namespace IUpdateStatusPedidoUseCase {
  export type Params = {
    id: string;
    status: StatusPedido;
  };

  export type Result = PedidoEntity;
}
