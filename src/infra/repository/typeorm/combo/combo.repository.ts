import { ComboEntity } from '@/domain/entities';
import { IComboRepository } from '@/domain/repository';
import { ComboModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateTypeOrmAdapter, FindAllCombosTypeOrmAdapter } from './adapter';

@Injectable()
export class ComboRepositoryTypeOrm implements IComboRepository {
  constructor(
    @InjectRepository(ComboModelTypeOrm)
    private readonly comboRepository: Repository<ComboModelTypeOrm>,
  ) {}
  async findAll(
    params: IComboRepository.FindAll.Params,
  ): Promise<IComboRepository.FindAll.Result> {
    const { nome } = params;
    const adapter = new FindAllCombosTypeOrmAdapter();
    const where = {};
    if (nome) {
      Object.assign(where, {
        nome: ILike(`%${nome}%`),
      });
    }
    const result = await this.comboRepository.find({
      where,
      relations: ['itens', 'itens.ingredientes'],
    });
    return adapter.result(result);
  }

  async create(params: IComboRepository.Create.Params): Promise<ComboEntity> {
    const adapter = new CreateTypeOrmAdapter();
    const data = adapter.command(params);
    const result = await this.comboRepository.save(data);
    return adapter.result(result);
  }
}
