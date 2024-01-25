import { TipoNotificacaoMercadoPago } from '@/domain/enum/tipo-notificacao-mercado-pago.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

export class NotificacaoPagamentoMercadoPagoDTO {
  @ApiProperty({
    description: 'Tipo de notificação',
    required: true,
    example: TipoNotificacaoMercadoPago.PAYMENT_CREATED,
  })
  @IsEnum(TipoNotificacaoMercadoPago)
  action: string;

  @ApiProperty({
    description: 'Versão da API',
    required: true,
    example: 'v1',
  })
  @IsString()
  api_version: string;

  @ApiProperty({
    description: 'Data do evento',
    required: true,
    example: '2024-01-22T22: 59: 46Z',
  })
  @IsString()
  date_created: string;

  @ApiProperty({
    description: 'Id do evento',
    required: true,
    example: 123131,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Live mode',
    required: true,
    example: true,
  })
  @IsBoolean()
  live_mode: boolean;

  @ApiProperty({
    description: 'Tipo do evento',
    required: true,
    example: 'payment',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'ID do usuário',
    required: true,
    example: '123',
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    type: () => DadosNotificacaoPagamentoMercadoPagoDTO
  })
  data;
}

class DadosNotificacaoPagamentoMercadoPagoDTO {
  @ApiProperty({
    description: 'Dados do pagamento',
    required: true,
    example: '12345'
  })
  @IsString()
  id: string;
}
