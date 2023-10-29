import { PedidoHistoricoEntity } from '@/domain/entities/pedido-historico.entity';
import { IPedidoHistoricoRepository } from '@/domain/repository/pedido-historico.repository';
import { PedidoHistoricoModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoHistoricoRepositoryTypeOrm
  implements IPedidoHistoricoRepository
{
  constructor(
    @InjectRepository(PedidoHistoricoModelTypeOrm)
    private readonly pedidoHistoricoRepository: Repository<PedidoHistoricoModelTypeOrm>,
  ) {}
  create(
    params: IPedidoHistoricoRepository.Create.Params,
  ): Promise<PedidoHistoricoEntity> {
    return this.pedidoHistoricoRepository.save(params.historico);
  }
}
