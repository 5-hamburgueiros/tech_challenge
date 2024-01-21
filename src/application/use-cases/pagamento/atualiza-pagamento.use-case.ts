import { StatusPagamento } from '@/domain/enum';
import { ErroIntegracaoMercadoPagoException } from '@/domain/exceptions';
import { IAtualizaPagamento, IFindById } from '@/domain/use-cases';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CheckPaymentUseCase implements IAtualizaPagamento {
  constructor(
    private readonly httpService: HttpService,
    @Inject(IFindById)
    private readonly findPedidoByIdUseCase: IFindById,
  ) { }
  async execute(idExternoPagamento: string): Promise<StatusPagamento> {
    try {
      const response = await this.httpService.get(`https://api.mercadopago.com/v1/payments/${idExternoPagamento}`);
      if (response && response['status'] === 'approved') {

        const idPedido = response['external_reference'];
        if(idPedido){
          const pedido = await this.findPedidoByIdUseCase.execute(idPedido)
          //TODO: atualizacao do pagamento
        }

        return StatusPagamento.PAGO;
      }
      return StatusPagamento.AGUARDANDO_PAGAMENTO;
    } catch (error: any) {
      throw new ErroIntegracaoMercadoPagoException(error?.message);
    }
  }
}

/*
    const historico = new PedidoHistoricoEntity({
      id: undefined,
      pedido: pedidoCriado.id,
      status: pedidoCriado.status,
    });

    await this.pedidoHistoricoRepository.create({
      historico,
    });
*/