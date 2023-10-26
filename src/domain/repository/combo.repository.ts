import { ComboEntity } from '../entities';

export interface IComboRepository {
  create(
    params: IComboRepository.Create.Params,
  ): Promise<IComboRepository.Create.Result>;
  findAll(
    params: IComboRepository.FindAll.Params,
  ): Promise<IComboRepository.FindAll.Result>;
}

export const IComboRepository = Symbol('IComboRepository');

export namespace IComboRepository {
  export namespace Create {
    export type Params = {
      combo: ComboEntity;
    };
    export type Result = ComboEntity;
  }

  export namespace FindAll {
    export type Params = {
      nome?: string;
      ids?: Array<string>;
    };

    export type Result = Array<ComboEntity>;
  }
}
