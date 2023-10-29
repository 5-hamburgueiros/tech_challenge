import {
  PedidoModelTypeOrm,
  StatusModelTypeOrm,
} from '@/infra/database/typerom/model';
import { AbstractEntity } from './abstract.entity';

export class PedidoHistoricoEntity extends AbstractEntity {
  pedido: PedidoModelTypeOrm;
  status: StatusModelTypeOrm;

  constructor(params: PedidoHistoricoModel.Params) {
    super(params.id, params.criadoEm, params.atualizadoEm);
    this.pedido = params.pedido;
    this.status = params.status;
  }

  static FromTypeOrmModel(
    param: PedidoHistoricoModel.Params,
  ): PedidoHistoricoEntity {
    return new PedidoHistoricoEntity({
      id: param.id,
      pedido: param.pedido,
      status: param.status,
      criadoEm: param.criadoEm,
      atualizadoEm: param.atualizadoEm,
    });
  }
}

export namespace PedidoHistoricoModel {
  export type Params = {
    id: string;
    pedido: PedidoModelTypeOrm;
    status: StatusModelTypeOrm;
    criadoEm?: string;
    atualizadoEm?: string;
  };
}
