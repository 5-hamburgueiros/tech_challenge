import { StatusPedido } from '@/domain/enum';
import { PedidoModelTypeOrm } from '@/infra/database/typerom/model';

export interface IInProgressPedidoUseCase {
  execute(): Promise<IInProgressPedidoUseCase.Result>;
}

export const IInProgressPedidoUseCase = Symbol('IInProgressPedidoUseCase');

export namespace IInProgressPedidoUseCase {
  export type Params = {
    id: string;
    status: StatusPedido;
  };

  export type Result = PedidoModelTypeOrm[];
}
