import { ItemEntity } from '@/domain/entities';
import { CategoriaItem } from '@/domain/enum';

export interface IFindAllItens {
  execute(params: IFindAllItens.Params): Promise<IFindAllItens.Result>;
}

export const IFindAllItens = Symbol('IFindAllItens');

export namespace IFindAllItens {
  export type Params = {
    nome?: string;
    categoria?: CategoriaItem;
  };

  export type Result = Array<ItemEntity>;
}
