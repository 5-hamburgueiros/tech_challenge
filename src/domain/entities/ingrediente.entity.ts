import { AbstractEntity } from './abstract.entity';

export class IngredienteEntity extends AbstractEntity {
  public readonly nome: string;
  public readonly quantidade: number;
  public readonly calorias: number;
  public readonly valor: number;
  public readonly custo: number;

  constructor(params: IngredienteModel.Params) {
    super(params.id, params.createdAt, params.updatedAt);
    this.nome = params.nome;
    this.quantidade = params.quantidade;
    this.calorias = params.calorias;
    this.valor = params.valor;
    this.custo = params.custo;
  }

  static FromTypeOrmModel(param: IngredienteModel.Params): IngredienteEntity {
    return new IngredienteEntity({
      id: param.id,
      nome: param.nome,
      quantidade: param.quantidade,
      calorias: param.calorias,
      valor: param.valor,
      custo: param.custo,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });
  }
}

export namespace IngredienteModel {
  export type Params = {
    id: string;
    nome: string;
    quantidade: number;
    calorias: number;
    valor: number;
    custo: number;
    createdAt?: string;
    updatedAt?: string;
  };
}
