import { PagamentoEntity } from '../entities';

export interface IPagamentoRepository {
  create(
    params: IPagamentoRepository.Create.Params,
  ): Promise<IPagamentoRepository.Create.Result>;
  findById(
    params: IPagamentoRepository.FindById.Params,
  ): Promise<IPagamentoRepository.FindById.Result>;
}

export const IPagamentoRepository = Symbol('IPagamentoRepository');

export namespace IPagamentoRepository {
  export namespace Create {
    export type Params = {
      pagamento: PagamentoEntity;
    };
    export type Result = PagamentoEntity;
  }
  export namespace FindById {
    export type Params = {
      id: string;
    };
    export type Result = PagamentoEntity;
  }
}
