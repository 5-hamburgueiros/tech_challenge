import { IngredienteEntity } from '../../entities';

export interface IFindAllIngredientes {
  execute(
    params: IFindAllIngredientes.Params,
  ): Promise<IFindAllIngredientes.Result>;
}

export const IFindAllIngredientes = Symbol('IFindAllIngredientes');

export namespace IFindAllIngredientes {
  export type Params = {
    nome?: string;
  };
  export type Result = Array<IngredienteEntity>;
}
