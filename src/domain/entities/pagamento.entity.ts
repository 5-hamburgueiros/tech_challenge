import { StatusPagamento } from '../enum/status-pagamento.enum';
import { AbstractEntity } from './abstract.entity';
import { PedidoEntity } from './pedido.entity';

export class PagamentoEntity extends AbstractEntity {
  public qrData: string;
  public inStoreOrderId: string;
  public pedido: PedidoEntity;
  public statusPagamento: StatusPagamento;
  public idExterno: string; 

  constructor(params: PagamentoModel.Params) {
    super(params.id, params.criadoEm, params.atualizadoEm);
    this.qrData = params.qrData;
    this.pedido = params.pedido;
    this.statusPagamento = params.statusPagamento ? 
      params.statusPagamento : StatusPagamento.AGUARDANDO_PAGAMENTO;
    this.idExterno = params.idExterno;
  }

  public pagar(): void {
    if (this.statusPagamento !== StatusPagamento.AGUARDANDO_PAGAMENTO) {
      throw new Error('Pedido não pode ser pago!');
    }
    this.statusPagamento = StatusPagamento.PAGO;
  }

  public cancelar(): void {
    if (this.statusPagamento !== StatusPagamento.CANCELADO) {
      throw new Error('Pedido já foi cancelado anteriormente!');
    }
    this.statusPagamento = StatusPagamento.CANCELADO;
  }

  public setIdExterno(idExterno: string){
    this.idExterno = idExterno;
  }
  
}

export namespace PagamentoModel {
  export type Params = {
    id?: string;
    qrData: string;
    inStoreOrderId: string;
    pedido: PedidoEntity;
    idExterno?: string;
    statusPagamento?: StatusPagamento;
    criadoEm?: string;
    atualizadoEm?: string;
  };
}