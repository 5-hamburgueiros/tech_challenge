import { PedidoEntity } from "@/domain/entities";
import { ConfigService } from "@nestjs/config";

export class CreatePagamentoMercadoPagoDto {

  external_reference: string;
  items: CreatePagamentoMercadoPagoItensDto[];
  total_amount: number;
  title: string;
  description: string;
  notification_url: string;

  constructor(pedido: PedidoEntity) {
    this.external_reference = pedido.id;
    this.items = this.pegarItens(pedido);
    //this.total_amount = this.calcularValorTotal(pedido);
    this.total_amount = this.calcularValorTotal(pedido);

    const configService = new ConfigService();
    this.title = configService.get('MERCADO_PAGO_TITULO_COMPRA');
    this.description = configService.get('MERCADO_PAGO_DESCRICAO_COMPRA');
    this.notification_url = configService.get('MERCADO_PAGO_NOTIFICATION_URL');
  }

  private pegarItens(pedido: PedidoEntity): CreatePagamentoMercadoPagoItensDto[] {
    return pedido.itens.map(item => ({
      sku_number: item.id,
      category: item.categoria,
      title: item.nome,
      description: item.nome,
      unit_price: item.valor,
      quantity: 1,
      unit_measure: 'unit',
      total_amount: item.valor
    }));
  }

  private calcularValorTotal(pedido: PedidoEntity): number {
    return Number(pedido.itens.reduce((acumulador, atual) => (acumulador + atual.valor), 0.0).toFixed(2));
  }
}

interface CreatePagamentoMercadoPagoItensDto {
  sku_number: string,
  category: string,
  title: string,
  description: string,
  unit_price: number,
  quantity: number,
  unit_measure: string,
  total_amount: number
}

