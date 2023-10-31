import { PedidoEntity } from '@/domain/entities';
import { PedidoHistoricoEntity } from '@/domain/entities/pedido-historico.entity';
import { StatusPedido } from '@/domain/enum';
import { PedidoNaoLocalizadoException } from '@/domain/exceptions';
import { IPedidoRepository } from '@/domain/repository';
import { IPedidoHistoricoRepository } from '@/domain/repository/pedido-historico.repository';
import { IUpdateStatusPedidoUseCase } from '@/domain/use-cases/pedidos/update-status-pedido.use-case';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class UpdateStatusPedidoUseCase implements IUpdateStatusPedidoUseCase {
  constructor(
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
    @Inject(IPedidoHistoricoRepository)
    private readonly pedidoHistoricoRepository: IPedidoHistoricoRepository,
  ) {}
  async execute(
    params: IUpdateStatusPedidoUseCase.Params,
  ): Promise<IUpdateStatusPedidoUseCase.Result> {
    try {
      const result = await this.pedidoRepository.findById({ id: params.id });
      if (!result) {
        throw new PedidoNaoLocalizadoException('Pedido não localizado');
      }

      const pedido = new PedidoEntity(result);

      this.handleStatus(pedido, params.status);

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

  private handleStatus(pedido: PedidoEntity, status: StatusPedido): void {
    switch (status) {
      case StatusPedido.EM_PREPARACAO:
        pedido.emPreparacao();
        break;
      case StatusPedido.PRONTO:
        pedido.pronto();
        break;
      case StatusPedido.CANCELADO:
        pedido.cancelar();
        break;
      case StatusPedido.FINALIZADO:
        pedido.finalizar();
        break;
      case StatusPedido.RECEBIDO:
        pedido.recebido();
        break;
      default:
        throw new Error('Status não permitido');
    }
  }
}
