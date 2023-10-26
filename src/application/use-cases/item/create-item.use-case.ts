import { ItemEntity } from '@/domain/entities';
import { IIngredienteRepository, IItemRepository } from '@/domain/repository';
import { ICreateItem } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateItemUseCase implements ICreateItem {
  constructor(
    @Inject(IItemRepository) private readonly itemRepository: IItemRepository,
    @Inject(IIngredienteRepository)
    private readonly ingredienteRepository: IIngredienteRepository,
  ) {}

  async execute(params: ICreateItem.Params): Promise<ItemEntity> {
    if (params.ingredientes?.length) {
      const ingredientes = await this.ingredienteRepository.findAll({
        ids: params.ingredientes,
      });
      return this.itemRepository.create({
        item: new ItemEntity({
          categoria: params.categoria,
          nome: params.nome,
          valor: params.valor,
          ingredientes,
        }),
      });
    }
    return this.itemRepository.create({
      item: new ItemEntity({
        categoria: params.categoria,
        nome: params.nome,
        valor: params.valor,
        ingredientes: [],
      }),
    });
  }
}
