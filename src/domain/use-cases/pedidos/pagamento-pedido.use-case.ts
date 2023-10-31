import { PedidoEntity } from '@/domain/entities';

export interface IPagamentoPedido {
  execute(id: string): Promise<IPagamentoPedido.Result>;
}

export const IPagamentoPedido = Symbol('IPagamentoPedido');

export namespace IPagamentoPedido {
  export type Result = PedidoEntity;
}
