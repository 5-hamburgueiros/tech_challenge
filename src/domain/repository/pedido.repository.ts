import { PedidoEntity } from '../entities';

export interface IPedidoRepository {
  create(
    params: IPedidoRepository.Create.Params,
  ): Promise<IPedidoRepository.Create.Result>;
  findById(
    params: IPedidoRepository.FindById.Params,
  ): Promise<IPedidoRepository.FindById.Result>;
}

export const IPedidoRepository = Symbol('IPedidoRepository');

export namespace IPedidoRepository {
  export namespace Create {
    export type Params = {
      pedido: PedidoEntity;
    };
    export type Result = PedidoEntity;
  }
  export namespace FindById {
    export type Params = {
      id: string;
    };
    export type Result = PedidoEntity;
  }
}
