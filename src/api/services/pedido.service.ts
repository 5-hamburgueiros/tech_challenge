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
}
