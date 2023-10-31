import { PedidoEntity } from '@/domain/entities';
import { PedidoHistoricoEntity } from '@/domain/entities/pedido-historico.entity';
import { PedidoNaoLocalizadoException } from '@/domain/exceptions';
import { IPedidoRepository } from '@/domain/repository';
import { IPedidoHistoricoRepository } from '@/domain/repository/pedido-historico.repository';
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
    @Inject(IPedidoHistoricoRepository)
    private readonly pedidoHistoricoRepository: IPedidoHistoricoRepository,
  ) {}
  async execute(id: string): Promise<IPagamentoPedido.Result> {
    try {
      const result = await this.pedidoRepository.findById({ id });
      if (!result) {
        throw new PedidoNaoLocalizadoException('Pedido não localizado');
      }

      const pedido = new PedidoEntity(result);

      pedido.adicionaPagamento();

      const data = await this.pedidoRepository.create({ pedido });

      const historico = new PedidoHistoricoEntity({
        id: undefined,
        pedido: data.id,
        status: data.status,
      });

      await this.pedidoHistoricoRepository.create({
        historico,
      });

      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
