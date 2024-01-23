import { IPedidoRepository } from '@/domain/repository';
import { IInProgressPedidoUseCase } from '@/domain/use-cases/pedidos/in-progress-pedido.use-case';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class InProgressPedidoUseCase implements IInProgressPedidoUseCase {
  constructor(
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
  ) {}
  async execute(): Promise<IInProgressPedidoUseCase.Result> {
    return await this.pedidoRepository.inProgress();
  }
}
