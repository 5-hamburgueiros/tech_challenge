import { PedidoEntity } from '@/domain/entities';
import { StatusPedido } from '@/domain/enum';
import { IPedidoRepository } from '@/domain/repository';
import { PedidoModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoRepositoryTypeOrm implements IPedidoRepository {
  constructor(
    @InjectRepository(PedidoModelTypeOrm)
    private readonly pedidoRepository: Repository<PedidoModelTypeOrm>,
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

  async getNumeroPedido(): Promise<number> {
    const numeroPedido = await this.pedidoRepository.count();
    return numeroPedido + 1;
  }

  async inProgress(): Promise<PedidoModelTypeOrm[]> {
    const queryBuilder = this.pedidoRepository.createQueryBuilder('pedido');

    queryBuilder
      .select(['pedido', 'pedido.status'])
      .addSelect(
        `CASE
          WHEN pedido.status = 'PRONTO' THEN 1
          WHEN pedido.status = 'EM_PREPARACAO' THEN 2
          WHEN pedido.status = 'RECEBIDO' THEN 3
          ELSE 4
      END AS ordemPedido`,
      )
      .orderBy('pedido.criadoEm', 'ASC')
      .orderBy('ordemPedido', 'ASC')
      .andWhere('pedido.status IN (:...status)', {
        status: [
          StatusPedido.PRONTO,
          StatusPedido.EM_PREPARACAO,
          StatusPedido.RECEBIDO,
        ],
      })
      .getMany();

    queryBuilder.leftJoinAndSelect('pedido.itens', 'Pedido_Item');
    queryBuilder.leftJoinAndSelect('pedido.combos', 'Pedido_Combo');
    queryBuilder.leftJoinAndSelect('pedido.cliente', 'Cliente');

    return await queryBuilder.getMany();
  }
}
