import { IngredienteEntity } from '../entities';

export interface IIngredienteRepository {
  create(
    params: IIngredienteRepository.Create.Params,
  ): Promise<IIngredienteRepository.Create.Result>;
  findAll(
    params: IIngredienteRepository.FindAll.Params,
  ): Promise<IIngredienteRepository.FindAll.Result>;
}

export const IIngredienteRepository = Symbol('IIngredienteRepository');

export namespace IIngredienteRepository {
  export namespace Create {
    export type Params = {
      ingrediente: IngredienteEntity;
    };
    export type Result = IngredienteEntity;
  }

  export namespace FindAll {
    export type Params = {
      nome?: string;
      ids?: Array<string>;
    };

    export type Result = Array<IngredienteEntity>;
  }
}
