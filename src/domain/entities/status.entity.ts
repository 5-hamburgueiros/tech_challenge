import { StatusPedido } from '../enum';
import { AbstractEntity } from './abstract.entity';

export class StatusEntity extends AbstractEntity {
  public nome: StatusPedido;

  constructor(params: StatusModel.Params) {
    super(params.id, params.criadoEm, params.atualizadoEm);
    this.nome = params.nome;
  }

  static FromTypeOrmModel(param: StatusModel.Params): StatusEntity {
    return new StatusEntity({
      id: param.id,
      nome: param.nome,
      criadoEm: param.criadoEm,
      atualizadoEm: param.atualizadoEm,
    });
  }
}

export namespace StatusModel {
  export type Params = {
    id: string;
    nome: StatusPedido;
    criadoEm?: string;
    atualizadoEm?: string;
  };
}
