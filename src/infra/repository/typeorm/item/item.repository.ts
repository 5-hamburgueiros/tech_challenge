import { IngredienteEntity, ItemEntity } from '@/domain/entities';
import { IItemRepository } from '@/domain/repository';
import { ItemModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ItemRepositoryTypeOrm implements IItemRepository {
  constructor(
    @InjectRepository(ItemModelTypeOrm)
    private readonly itemRepository: Repository<ItemModelTypeOrm>,
  ) {}
  async findAll(
    params: IItemRepository.FindAll.Params,
  ): Promise<IItemRepository.FindAll.Result> {
    const { nome, categoria } = params;
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
    const result = await this.itemRepository.find({
      where,
      relations: ['ingredientes'],
    });
    return result.map((item) =>
      ItemEntity.FromTypeOrmModel({
        categoria: item.categoria,
        id: item.id,
        nome: item.nome,
        valor: item.valor,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        ingredientes: item.ingredientes.map(IngredienteEntity.FromTypeOrmModel),
      }),
    );
  }

  async create(params: IItemRepository.Create.Params): Promise<ItemEntity> {
    return this.itemRepository.save(params.item);
  }
}
