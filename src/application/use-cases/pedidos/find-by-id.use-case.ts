import { IPedidoRepository } from '@/domain/repository';
import { IFindById } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindPedidoById implements IFindById {
  constructor(
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
  ) {}
  async execute(params: IFindById.Params): Promise<IFindById.Result> {
    return this.pedidoRepository.findById({ id: params.id });
  }
}
