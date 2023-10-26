import { StatusPedido } from '../enum';
import { AbstractEntity } from './abstract.entity';
import { ClienteEntity } from './cliente.entity';
import { ComboEntity } from './combo.entity';
import { ItemEntity } from './item.entity';

export class PedidoEntity extends AbstractEntity {
  public numero: number;
  public valor: number;
  public status: StatusPedido;
  public cliente?: ClienteEntity;
  public combos?: ComboEntity[];
  public itens?: ItemEntity[];

  constructor(params: PedidoModel.Params) {
    super(params.id, params.criadoEm, params.atualizadoEm);
    this.numero = params.numero;
    this.valor = params.valor;
    this.status = params.status;
  }

  public addCliente(cliente: ClienteEntity): void {
    this.cliente = cliente;
  }

  public addCombos(combos: ComboEntity[]): void {
    this.combos = combos;
  }

  public addItem(itens: ItemEntity[]): void {
    this.itens = itens;
  }

  public pagar(): void {
    if (this.status !== StatusPedido.EM_ANDAMENTO) {
      throw new Error('Pedido não está em andamento');
    }
    this.status = StatusPedido.AGUARDANDO_PAGAMENTO;
    // TODO: lançar evento de pedido aguardando pagamento
  }

  public adicionaPagamento(): void {
    if (this.status !== StatusPedido.AGUARDANDO_PAGAMENTO) {
      throw new Error('Pedido não está aguardando pagamento');
    }
    this.status = StatusPedido.PAGO;
    // TODO: adicionar entidade de pagamento
    // TODO: lançar evento de pedido pago
  }

  public emPreparacao(): void {
    if (this.status !== StatusPedido.PAGO) {
      throw new Error('Pedido não está pago');
    }
    this.status = StatusPedido.EM_PREPARACAO;
    // TODO: lançar evento de pedido em preparação
  }

  public pronto(): void {
    if (this.status !== StatusPedido.EM_PREPARACAO) {
      throw new Error('Pedido não está em preparação');
    }
    this.status = StatusPedido.PRONTO;
    // TODO: Lançar evento de pedido pronto
  }

  public cancelar(): void {
    this.status = StatusPedido.CANCELADO;
  }

  static FromTypeOrmModel(param: PedidoModel.Params): PedidoEntity {
    return new PedidoEntity({
      id: param.id,
      numero: param.numero,
      valor: param.valor,
      status: param.status,
      criadoEm: param.criadoEm,
      atualizadoEm: param.atualizadoEm,
    });
  }
}

export namespace PedidoModel {
  export type Params = {
    id: string;
    numero: number;
    valor: number;
    status: StatusPedido;
    criadoEm?: string;
    atualizadoEm?: string;
  };
}
