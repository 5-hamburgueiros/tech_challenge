import { IItemRepository } from '@/domain/repository';
import { IFindAllItens } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllItensUseCase implements IFindAllItens {
  constructor(
    @Inject(IItemRepository) private readonly itemRepository: IItemRepository,
  ) {}

  async execute(params: IFindAllItens.Params): Promise<IFindAllItens.Result> {
    return this.itemRepository.findAll(params);
  }
}
