import { IngredienteEntity } from '../../entities';

export interface ICreateIngrediente {
  execute(params: ICreateIngrediente.Params): Promise<IngredienteEntity>;
}

export const ICreateIngrediente = Symbol('ICreateIngrediente');

export namespace ICreateIngrediente {
  export type Params = {
    nome: string;
    quantidade: number;
    calorias: number;
    valor: number;
    custo: number;
  };
}
