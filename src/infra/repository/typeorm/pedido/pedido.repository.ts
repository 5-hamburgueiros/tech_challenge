import { PedidoEntity } from '@/domain/entities';
import { IPedidoRepository } from '@/domain/repository';
import { PedidoModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PedidoRepositoryTypeOrm implements IPedidoRepository {
  constructor(
    @InjectRepository(PedidoModelTypeOrm)
    private readonly pedidoRepository: Repository<PedidoModelTypeOrm>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  async findById(
    params: IPedidoRepository.FindById.Params,
  ): Promise<IPedidoRepository.FindById.Result> {
    const pedido = await this.pedidoRepository.findOne({
      where: {
        id: params.id,
      },
      relations: ['cliente', 'itens', 'combos', 'historicoStatus'],
    });
    return pedido as any;
  }
  create(params: IPedidoRepository.Create.Params): Promise<PedidoEntity> {
    return this.pedidoRepository.save(params.pedido);
  }

  async updatePayment({
    id,
  }: IPedidoRepository.UpdatePayment.Params): Promise<IPedidoRepository.UpdatePayment.Result> {
    return (await this.pedidoRepository.save({
      id,
    })) as any;
  }
}
