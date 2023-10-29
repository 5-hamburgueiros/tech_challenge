import { PedidoHistoricoEntity } from '../entities/pedido-historico.entity';

export interface IPedidoHistoricoRepository {
  create(
    params: IPedidoHistoricoRepository.Create.Params,
  ): Promise<IPedidoHistoricoRepository.Create.Result>;
}

export const IPedidoHistoricoRepository = Symbol('IPedidoHistoricoRepository');

export namespace IPedidoHistoricoRepository {
  export namespace Create {
    export type Params = {
      historico: PedidoHistoricoEntity;
    };
    export type Result = PedidoHistoricoEntity;
  }
}
