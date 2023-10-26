import { PedidoEntity } from '@/domain/entities';
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
  create(params: IPedidoRepository.Create.Params): Promise<PedidoEntity> {
    return this.pedidoRepository.save(params.pedido);
  }
}
