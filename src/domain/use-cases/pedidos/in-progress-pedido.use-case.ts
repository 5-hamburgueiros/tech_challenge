import { PedidoModelTypeOrm } from '@/infra/database/typerom/model';

export interface IInProgressPedidoUseCase {
  execute(): Promise<IInProgressPedidoUseCase.Result>;
}

export const IInProgressPedidoUseCase = Symbol('IInProgressPedidoUseCase');

export namespace IInProgressPedidoUseCase {
  export type Result = PedidoModelTypeOrm[];
}
