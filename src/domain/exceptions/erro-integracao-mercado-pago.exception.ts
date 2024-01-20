import { DefaultException } from '@/common/exceptions/default.exception';
import { HttpStatus } from '@nestjs/common';

export class ErroIntegracaoMercadoPagoException extends DefaultException {
  constructor(message: string) {
    super('ERRO_INTEGRACAO_MERCADO_PAGO', message, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
