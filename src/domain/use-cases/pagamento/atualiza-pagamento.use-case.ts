import { StatusPagamento } from '@/domain/enum';

export interface IAtualizaPagamento {
  execute(idExternoPagamento: string): Promise<IAtualizaPagamento.Result>;
}

export const IAtualizaPagamento = Symbol('IAtualizaPagamento');

export namespace IAtualizaPagamento {
  export type Result =  StatusPagamento;
}
