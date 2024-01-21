import { PagamentoEntity, PedidoEntity } from '../../entities';

export interface ICriaPagamento {
  execute(params: ICriaPagamento.Params): Promise<PagamentoEntity>;
}

export const ICriaPagamento = Symbol('ICriaPagamento');

export namespace ICriaPagamento {
  export type Params = {
    pedido: PedidoEntity;
  };
}
