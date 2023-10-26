import { ComboEntity } from '@/domain/entities';

export interface ICreateCombo {
  execute(params: ICreateCombo.Params): Promise<ICreateCombo.Result>;
}

export const ICreateCombo = Symbol('ICreateCombo');

export namespace ICreateCombo {
  export type Params = {
    nome: string;
    valor: number;
    ativo: boolean;
    itens?: Array<string>;
  };

  export type Result = ComboEntity;
}
