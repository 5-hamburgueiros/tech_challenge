import { StatusPedido } from '@/domain/enum';
import { ClienteNaoLocalizadoException } from '@/domain/exceptions';
import { IPedidoService } from '@/domain/service';
import {
  ClienteModelTypeOrm,
  PedidoModelTypeOrm,
} from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoService implements IPedidoService {
  constructor(
    @InjectRepository(PedidoModelTypeOrm)
    private readonly repository: Repository<PedidoModelTypeOrm>,
  ) {}

  async paginate<PedidoModelTypeOrm>(
    options: IPaginationOptions,
    query: IPedidoService.Query,
  ): Promise<Pagination<PedidoModelTypeOrm>> {
    const queryBuilder = this.repository.createQueryBuilder('pedido');
    queryBuilder.orderBy('pedido.criadoEm', 'ASC');
    if (query.status) {
      queryBuilder
        .andWhere('pedido.status in (:status)', {
          status: query.status,
        })
        .getMany();
    }

    if (query.documento) {
      const cliente = await ClienteModelTypeOrm.findOneBy({
        documento: query.documento,
      });
      if (!cliente) {
        throw new ClienteNaoLocalizadoException('Cliente não localizado');
      }
      queryBuilder
        .andWhere('pedido.clienteid = :clienteId', {
          clienteId: cliente.id,
        })
        .getMany();
    }

    queryBuilder.leftJoinAndSelect('pedido.itens', 'Pedido_Item');
    queryBuilder.leftJoinAndSelect('pedido.combos', 'Pedido_Combo');
    queryBuilder.leftJoinAndSelect('pedido.cliente', 'Cliente');

    return paginate<PedidoModelTypeOrm>(queryBuilder as any, options);
  }

  async inProgress(): Promise<PedidoModelTypeOrm[]> {
    const queryBuilder = this.repository.createQueryBuilder('pedido');

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
