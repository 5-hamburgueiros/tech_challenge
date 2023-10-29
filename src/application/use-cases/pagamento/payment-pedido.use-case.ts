import { StatusPedido } from '@/domain/enum';
import { PedidoNaoLocalizadoException } from '@/domain/exceptions';
import { IPedidoRepository } from '@/domain/repository';
import { IPagamentoPedido } from '@/domain/use-cases';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class PaymentPedidoUseCase implements IPagamentoPedido {
  constructor(
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
  ) {}
  async execute(
    id: string,
    params: IPagamentoPedido.Params,
  ): Promise<IPagamentoPedido.Result> {
    try {
      const result = await this.pedidoRepository.findById({ id });
      if (!result) {
        throw new PedidoNaoLocalizadoException('Pedido não localizado');
      }

      params.status = StatusPedido.PAGO;

      const data = await this.pedidoRepository.updatePayment({ id, params });

      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
