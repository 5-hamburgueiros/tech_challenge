import { CreatePagamentoMercadoPagoResponseDto } from '@/api/dtos/mercado-pago/create-pagamento-mercado-pago-response.dto';
import { CreatePagamentoMercadoPagoDto } from '@/api/dtos/mercado-pago/create-pagamento-mercado-pago.dto';
import { PagamentoEntity } from '@/domain/entities';
import { ErroIntegracaoMercadoPagoException } from '@/domain/exceptions';
import { IPedidoRepository } from '@/domain/repository';
import { ICriaPagamento } from '@/domain/use-cases/pagamento/cria-pagamento.use-case';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CriaPagamentoUseCase implements ICriaPagamento {

  private mercadoPagoUserId: string;
  private mercadoBaseURL: string;
  private mercadoPagoPOS: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
    private readonly configService: ConfigService
  ) {
    this.mercadoPagoUserId = this.configService.get('MERCADO_PAGO_USER_ID')
    this.mercadoBaseURL = this.configService.get('MERCADO_PAGO_BASE_URL')
    this.mercadoPagoPOS = this.configService.get('MERCADO_PAGO_POS')
  }

  async execute(params: ICriaPagamento.Params): Promise<PagamentoEntity> {
    try {

      const pedido = params.pedido;
      const createPagamentoMercadoPagoDto = new CreatePagamentoMercadoPagoDto(params.pedido);
      const requestConfig = {
        headers: {
          Authorization: `Bearer ${this.configService.get('MERCADO_PAGO_ACCESS_TOKEN')}`
        },

      };
      const body = JSON.parse(JSON.stringify(createPagamentoMercadoPagoDto));

      const url = `${this.mercadoBaseURL}/instore/orders/qr/seller/collectors/${this.mercadoPagoUserId}/pos/${this.mercadoPagoPOS}/qrs`;
      const request = this.httpService.post<CreatePagamentoMercadoPagoResponseDto>(
        url,
        body,
        requestConfig
      );
      const response = await firstValueFrom(request);

      if (response) {
        const pagamento = new PagamentoEntity({
          qrData: response.data.qr_data
        });

        pedido.pagamento = pagamento;
        return (await this.pedidoRepository.create({ pedido })).pagamento;
      } else {
        throw new ErroIntegracaoMercadoPagoException('Erro ao gerar QR Code de pagamento!');
      }
    } catch (erro) {
      console.log(erro)
      throw new ErroIntegracaoMercadoPagoException('Erro ao gerar QR Code de pagamento!');
    }
  }

}
