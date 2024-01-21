import { IPagamentoPedido } from '@/domain/use-cases';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pagamentos')
@Controller('/pagamentos')
export class PagamentoController {

  constructor(
    @Inject(IPagamentoPedido)
    private readonly pagamentoPedido: IPagamentoPedido,
  ) {}

  @Post()
  async payment(
    @Body() body: any,
  ): Promise<any> {
    
    const externalPaymentId = body?.data?.id;
    if(externalPaymentId){
      this.pagamentoPedido.execute(externalPaymentId);
    }

    return new Promise((res) => res(body));
  }
}
