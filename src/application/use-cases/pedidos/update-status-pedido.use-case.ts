import { PedidoEntity } from '@/domain/entities';
import { StatusPedido } from '@/domain/enum';
import { PedidoNaoLocalizadoException } from '@/domain/exceptions';
import { IPedidoRepository } from '@/domain/repository';
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

      this.handleStatus(pedido);

      return await this.pedidoRepository.create({ pedido });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private handleStatus(pedido: PedidoEntity): void {
    switch (pedido.status) {
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
        throw new Error();
        break;
      case StatusPedido.RECEBIDO:
        throw new Error();
        break;
      default:
        throw new Error();
    }
  }
}
