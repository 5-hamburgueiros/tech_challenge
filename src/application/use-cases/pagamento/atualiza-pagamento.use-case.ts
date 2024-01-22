import { PedidoEntity } from '@/domain/entities';
import { PedidoHistoricoEntity } from '@/domain/entities/pedido-historico.entity';
import { StatusPagamento } from '@/domain/enum';
import { ErroIntegracaoMercadoPagoException } from '@/domain/exceptions';
import { IPedidoRepository } from '@/domain/repository';
import { IPedidoHistoricoRepository } from '@/domain/repository/pedido-historico.repository';
import { IAtualizaPagamento, IFindById } from '@/domain/use-cases';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AtualizaPagamentoUseCase implements IAtualizaPagamento {

  constructor(
    private readonly httpService: HttpService,
    @Inject(IFindById)
    private readonly findPedidoByIdUseCase: IFindById,
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
    @Inject(IPedidoHistoricoRepository)
    private readonly pedidoHistoricoRepository: IPedidoHistoricoRepository,
  ) { }

  async execute(idExternoPagamento: string): Promise<StatusPagamento> {
    try {
      const response = await firstValueFrom(this.httpService.get(`https://api.mercadopago.com/v1/payments/${idExternoPagamento}`));

      const statusPagamento = response?.data?.status;
      const idPedido = response?.data?.external_reference;
      if (statusPagamento && idPedido) {

        const pedido = await this.findPedidoByIdUseCase.execute(idPedido)
        if (statusPagamento === 'approved') {
          pedido.pagamento.setStatus(StatusPagamento.PAGO);
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
