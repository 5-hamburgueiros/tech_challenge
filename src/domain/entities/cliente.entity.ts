import { AbstractEntity } from './abstract.entity';

export class ClienteEntity extends AbstractEntity {
  public nome: string;
  public email: string;
  public documento: string;

  constructor(params: ClienteModel.Params) {
    super(params.id, params.createdAt, params.updatedAt);
    this.nome = params.nome;
    this.email = params.email;
    this.documento = params.documento;
  }

  static FromTypeOrmModel(param: ClienteModel.Params): ClienteEntity {
    return new ClienteEntity({
      id: param.id,
      nome: param.nome,
      email: param.email,
      documento: param.documento,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });
  }
}

export namespace ClienteModel {
  export type Params = {
    id: string;
    nome: string;
    email: string;
    documento: string;
    createdAt?: string;
    updatedAt?: string;
  };
}
