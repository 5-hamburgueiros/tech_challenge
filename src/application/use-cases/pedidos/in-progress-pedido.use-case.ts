import { DefaultException } from '@/common/exceptions/default.exception';
import { IPedidoRepository } from '@/domain/repository';
import { IInProgressPedidoUseCase } from '@/domain/use-cases/pedidos/in-progress-pedido.use-case';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class InProgressPedidoUseCase implements IInProgressPedidoUseCase {
  constructor(
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
  ) {}
  async execute(): Promise<IInProgressPedidoUseCase.Result> {
    try {
      return await this.pedidoRepository.inProgress();
    } catch (error) {
      if (error instanceof DefaultException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }
}
