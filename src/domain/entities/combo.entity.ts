import { AbstractEntity } from './abstract.entity';
import { ItemEntity } from './item.entity';

export class ComboEntity extends AbstractEntity {
  public nome: string;
  public valor: number;
  public ativo: boolean;
  public itens: Array<ItemEntity>;

  constructor(params: ComoboModel.Params) {
    super(params.id, params.createdAt, params.updatedAt);
    this.nome = params.nome;
    this.valor = params.valor;
    this.ativo = params.ativo;
    this.itens = params.itens;
  }

  static FromTypeOrmModel(param: ComoboModel.Params): ComboEntity {
    return new ComboEntity({
      id: param.id,
      nome: param.nome,
      valor: param.valor,
      ativo: param.ativo,
      itens: param.itens,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });
  }
}

export namespace ComoboModel {
  export type Params = {
    id?: string;
    nome: string;
    valor: number;
    ativo: boolean;
    itens: Array<ItemEntity>;
    createdAt?: string;
    updatedAt?: string;
  };
}
