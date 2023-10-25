import { ComboEntity } from '@/domain/entities';

export interface IFindAllCombos {
  execute(params: IFindAllCombos.Params): Promise<IFindAllCombos.Result>;
}

export const IFindAllCombos = Symbol('IFindAllCombos');

export namespace IFindAllCombos {
  export type Params = {
    nome?: string;
  };

  export type Result = Array<ComboEntity>;
}
