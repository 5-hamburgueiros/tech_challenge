import { ItemEntity } from '@/domain/entities';
import { CategoriaItem } from '@/domain/enum';

export interface ICreateItem {
  execute(params: ICreateItem.Params): Promise<ICreateItem.Result>;
}

export const ICreateItem = Symbol('ICreateItem');

export namespace ICreateItem {
  export type Params = {
    nome: string;
    valor: number;
    categoria: CategoriaItem;
    ingredientes?: Array<string>;
  };

  export type Result = ItemEntity;
}
