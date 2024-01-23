import { PedidoEntity } from '@/domain/entities';
import { IAtualizaPagamento, IPagamentoPedido } from '@/domain/use-cases';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FakeCheckoutDto } from '../dtos/fake-checkout.dto';

@ApiTags('Pagamentos')
@Controller('/pagamentos')
export class PagamentoController {

  constructor(
    @Inject(IAtualizaPagamento)
    private readonly atualizaPagamento: IAtualizaPagamento,
    @Inject(IPagamentoPedido)
    private readonly pagamentoPedido: IPagamentoPedido,
  ) { }

  @Post()
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
  async fake(
    @Body() body: FakeCheckoutDto,
  ): Promise<any> {
    const idPedido = body?.id;
    if (idPedido) {
      return this.pagamentoPedido.execute(idPedido);
    }
  }
}
