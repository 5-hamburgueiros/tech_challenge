import { ItemEntity } from '../entities';
import { CategoriaItem } from '../enum';

export interface IItemRepository {
  create(
    params: IItemRepository.Create.Params,
  ): Promise<IItemRepository.Create.Result>;
  findAll(
    params: IItemRepository.FindAll.Params,
  ): Promise<IItemRepository.FindAll.Result>;
}

export const IItemRepository = Symbol('IItemRepository');

export namespace IItemRepository {
  export namespace Create {
    export type Params = {
      item: ItemEntity;
    };
    export type Result = ItemEntity;
  }

  export namespace FindAll {
    export type Params = {
      nome?: string;
      categoria?: CategoriaItem;
      ids?: string[];
    };

    export type Result = Array<ItemEntity>;
  }
}
