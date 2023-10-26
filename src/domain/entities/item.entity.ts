import { CategoriaItem } from '../enum';
import { AbstractEntity } from './abstract.entity';
import { IngredienteEntity } from './ingrediente.entity';

export class ItemEntity extends AbstractEntity {
  public readonly nome: string;
  public readonly valor: number;
  public readonly categoria: CategoriaItem;
  public readonly ingredientes: Array<IngredienteEntity> = [];

  constructor(params: ItemModel.Params) {
    super(params.id, params.createdAt, params.updatedAt);
    this.nome = params.nome;
    this.valor = params.valor;
    this.categoria = params.categoria;
    this.ingredientes = params.ingredientes;
  }

  static FromTypeOrmModel(param: ItemModel.Params): ItemEntity {
    return new ItemEntity({
      id: param.id,
      nome: param.nome,
      valor: param.valor,
      ingredientes: param.ingredientes,
      categoria: param.categoria,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });
  }
}

export namespace ItemModel {
  export type Params = {
    id?: string;
    nome: string;
    valor: number;
    categoria: CategoriaItem;
    ingredientes: Array<IngredienteEntity>;
    createdAt?: string;
    updatedAt?: string;
  };
}
