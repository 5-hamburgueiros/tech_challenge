import { PedidoEntity } from '../entities';

export interface IPedidoRepository {
  create(
    params: IPedidoRepository.Create.Params,
  ): Promise<IPedidoRepository.Create.Result>;
}

export const IPedidoRepository = Symbol('IPedidoRepository');

export namespace IPedidoRepository {
  export namespace Create {
    export type Params = {
      pedido: PedidoEntity;
    };
    export type Result = PedidoEntity;
  }
}
