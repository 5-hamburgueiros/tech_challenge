import { ItemEntity } from '@/domain/entities';
import { IItemRepository } from '@/domain/repository';
import { ItemModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { CreateTypeOrmAdapter, FindAllItensTypeOrmAdapter } from './adapter';

@Injectable()
export class ItemRepositoryTypeOrm implements IItemRepository {
  constructor(
    @InjectRepository(ItemModelTypeOrm)
    private readonly itemRepository: Repository<ItemModelTypeOrm>,
  ) {}
  async findAll(
    params: IItemRepository.FindAll.Params,
  ): Promise<IItemRepository.FindAll.Result> {
    const { nome, categoria, ids } = params;
    const adapter = new FindAllItensTypeOrmAdapter();
    const where = {};
    if (nome) {
      Object.assign(where, {
        nome: ILike(`%${nome}%`),
      });
    }
    if (categoria) {
      Object.assign(where, {
        categoria,
      });
    }
    if (ids) {
      Object.assign(where, {
        id: In(ids),
      });
    }

    const result = await this.itemRepository.find({
      where,
      relations: ['ingredientes'],
    });
    return adapter.result(result);
  }

  async create(params: IItemRepository.Create.Params): Promise<ItemEntity> {
    const adapter = new CreateTypeOrmAdapter();
    const data = adapter.command(params);
    const result = await this.itemRepository.save(data);
    return adapter.result(result);
  }
}
