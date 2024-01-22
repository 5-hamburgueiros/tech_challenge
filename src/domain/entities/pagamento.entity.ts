import { StatusPagamento } from '../enum/status-pagamento.enum';
import { AbstractEntity } from './abstract.entity';
import { PedidoEntity } from './pedido.entity';

export class PagamentoEntity extends AbstractEntity {
  public qrData: string;
  public idExterno: string; 
  public status: StatusPagamento;
  public pedido: PedidoEntity;

  constructor(params: PagamentoModel.Params) {
    super(params.id, params.criadoEm, params.atualizadoEm);
    this.qrData = params.qrData;
    this.pedido = params.pedido;
    this.status = params.status ? 
      params.status : StatusPagamento.AGUARDANDO_PAGAMENTO;
    this.idExterno = params.idExterno;
  }

  public pagar(): void {
    if (this.status !== StatusPagamento.AGUARDANDO_PAGAMENTO) {
      throw new Error('Pedido não pode ser pago!');
    }
    this.status = StatusPagamento.PAGO;
  }

  public cancelar(): void {
    if (this.status !== StatusPagamento.CANCELADO) {
      throw new Error('Pedido já foi cancelado anteriormente!');
    }
    this.status = StatusPagamento.CANCELADO;
  }

  public setIdExterno(idExterno: string){
    this.idExterno = idExterno;
  }

  public setStatus(status: StatusPagamento){
    this.status = status;
  }
  
}

export namespace PagamentoModel {
  export type Params = {
    id?: string;
    qrData?: string;
    pedido?: PedidoEntity;
    idExterno?: string;
    status?: StatusPagamento;
    criadoEm?: string;
    atualizadoEm?: string;
  };
}