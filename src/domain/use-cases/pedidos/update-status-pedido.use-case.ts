import { PedidoEntity } from '@/domain/entities';

export interface IUpdateStatusPedidoUseCase {
  execute(
    params: IUpdateStatusPedidoUseCase.Params,
  ): Promise<IUpdateStatusPedidoUseCase.Result>;
}

export const IUpdateStatusPedidoUseCase = Symbol('IUpdateStatusPedidoUseCase');

export namespace IUpdateStatusPedidoUseCase {
  export type Params = {
    id: string;
  };

  export type Result = PedidoEntity;
}
