import { PedidoEntity } from '@/domain/entities';
import { IPedidoRepository } from '@/domain/repository';
import { PedidoModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeOrmAdapter } from './adapter';

@Injectable()
export class PedidoRepositoryTypeOrm implements IPedidoRepository {
  constructor(
    @InjectRepository(PedidoModelTypeOrm)
    private readonly pedidoRepository: Repository<PedidoModelTypeOrm>,
  ) {}
  async create(params: IPedidoRepository.Create.Params): Promise<PedidoEntity> {
    const adapter = new CreateTypeOrmAdapter();
    const data = adapter.command(params);
    const result = await this.pedidoRepository.save(data);
    return adapter.result(result);
  }
}
