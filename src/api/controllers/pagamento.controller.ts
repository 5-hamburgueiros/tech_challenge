import { IAtualizaPagamento } from '@/domain/use-cases';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pagamentos')
@Controller('/pagamentos')
export class PagamentoController {

  constructor(
    @Inject(IAtualizaPagamento)
    private readonly atualizaPagamento: IAtualizaPagamento,
  ) {}

  @Post()
  async payment(
    @Body() body: any,
  ): Promise<any> {
    
    const externalPaymentId = body?.data?.id;
    if(externalPaymentId){
      this.atualizaPagamento.execute(externalPaymentId);
    }

    return new Promise((res) => res(body));
  }
}
