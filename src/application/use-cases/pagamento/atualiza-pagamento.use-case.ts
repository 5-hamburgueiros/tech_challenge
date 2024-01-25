import { PagamentoEntity, PedidoEntity } from '@/domain/entities';
import { PedidoHistoricoEntity } from '@/domain/entities/pedido-historico.entity';
import { StatusPagamento } from '@/domain/enum';
import { ErroIntegracaoMercadoPagoException } from '@/domain/exceptions';
import { IPedidoRepository } from '@/domain/repository';
import { IPedidoHistoricoRepository } from '@/domain/repository/pedido-historico.repository';
import { IFindById } from '@/domain/use-cases';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AtualizaPagamentoUseCase {

  private mercadoPagoAccessToken: string;
  private mercadoBaseURL: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(IFindById)
    private readonly findPedidoByIdUseCase: IFindById,
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
    @Inject(IPedidoHistoricoRepository)
    private readonly pedidoHistoricoRepository: IPedidoHistoricoRepository,
    private readonly configService: ConfigService,
  ) {
    this.mercadoPagoAccessToken = this.configService.get('MERCADO_PAGO_ACCESS_TOKEN');
    this.mercadoBaseURL = this.configService.get('MERCADO_PAGO_BASE_URL');
  }

  async execute(idExternoPagamento: string): Promise<StatusPagamento> {
    try {
      const requestConfig = {
        headers: {
          Authorization: `Bearer ${this.mercadoPagoAccessToken}`
        },
      };
      const url = `${this.mercadoBaseURL}/v1/payments/${idExternoPagamento}`;
      const response = await firstValueFrom(this.httpService.get(url, requestConfig));

      const statusPagamento = response?.data?.status;
      const idPedido = response?.data?.external_reference;

      if (statusPagamento && idPedido) {
        const responsePedido = await this.findPedidoByIdUseCase.execute({id: idPedido});
        const pedido = new PedidoEntity({...responsePedido});

        if (statusPagamento === 'approved') {
          const pagamento = new PagamentoEntity(pedido.pagamento);
          pedido.pagamento = pagamento;
          pedido.pagamento.pagar();
          pedido.adicionaPagamento();
        }
        
        const pedidoAtualizado = await this.pedidoRepository.create({ pedido });
        this.adicionaHistorico(pedidoAtualizado);
        return pedidoAtualizado.pagamento.status;
      }
      return StatusPagamento.AGUARDANDO_PAGAMENTO;
    } catch (error: any) {
      throw new ErroIntegracaoMercadoPagoException(error?.message);
    }
  }

  private async adicionaHistorico(pedido: PedidoEntity) {
    const historico = new PedidoHistoricoEntity({
      id: undefined,
      pedido: pedido.id,
      status: pedido.status,
    });
    await this.pedidoHistoricoRepository.create({ historico });
  }

}
