import { PedidoEntity } from '@/domain/entities';
import { StatusPedido } from '@/domain/enum';

export interface IPagamentoPedido {
  execute(
    id: string,
    params: IPagamentoPedido.Params,
  ): Promise<IPagamentoPedido.Result>;
}

export const IPagamentoPedido = Symbol('IPagamentoPedido');

export namespace IPagamentoPedido {
  export type Params = {
    status: StatusPedido;
  };

  export type Result = PedidoEntity;
}
