import { IPagamentoRepository } from '@/domain/repository';
import { PagamentoModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PagamentoRepositoryTypeOrm implements IPagamentoRepository {
  constructor(
    @InjectRepository(PagamentoModelTypeOrm)
    private readonly pagamentoRepository: Repository<PagamentoModelTypeOrm>,
  ) {}

  create(params: IPagamentoRepository.Create.Params): Promise<IPagamentoRepository.Create.Result> {
    return this.pagamentoRepository.save(params.pagamento);
  }

  async findById(
    params: IPagamentoRepository.FindById.Params,
  ): Promise<IPagamentoRepository.FindById.Result> {
    const pedido = await this.pagamentoRepository.findOne({
      where: {
        id: params.id,
      },
      relations: ['pedido'],
    });
    return pedido as any;
  }

}
