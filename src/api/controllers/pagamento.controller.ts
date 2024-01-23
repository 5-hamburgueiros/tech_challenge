import { AtualizaPagamentoUseCase } from '@/application/use-cases';
import { PedidoEntity } from '@/domain/entities';
import { IPagamentoPedido } from '@/domain/use-cases';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FakeCheckoutDto } from '../dtos/fake-checkout.dto';

@ApiTags('Pagamentos')
@Controller('/pagamentos')
export class PagamentoController {

  constructor(
    @Inject(AtualizaPagamentoUseCase)
    private readonly atualizaPagamento: AtualizaPagamentoUseCase,
    @Inject(IPagamentoPedido)
    private readonly pagamentoPedido: IPagamentoPedido,
  ) { }

  @Post()
  @ApiOperation({
    summary: 'Responsável por escutar os eventos do Mercado Pago'
  })
  async pagamento(
    @Body() body: any,
  ): Promise<any> {
    const action = body?.action;
    const externalPaymentId = body?.data?.id;
    if (action === 'payment.created' && externalPaymentId) {
      return this.atualizaPagamento.execute(externalPaymentId);
    }
  }

  @Post('fake')
  @ApiResponse({ type: PedidoEntity })
  @ApiOperation({
    summary: 'Executa fake checkout no pedido',
  },)
  async fake(
    @Body() body: FakeCheckoutDto,
  ): Promise<any> {
    const idPedido = body?.id;
    if (idPedido) {
      return this.pagamentoPedido.execute(idPedido);
    }
  }
}
