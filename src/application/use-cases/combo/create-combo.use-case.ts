import { ComboEntity } from '@/domain/entities';
import { IComboRepository, IItemRepository } from '@/domain/repository';
import { ICreateCombo } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateComboUseCase implements ICreateCombo {
  constructor(
    @Inject(IComboRepository)
    private readonly comboRepository: IComboRepository,
    @Inject(IItemRepository)
    private readonly itemRepository: IItemRepository,
  ) {}

  async execute(params: ICreateCombo.Params): Promise<ComboEntity> {
    const itens = await this.itemRepository.findAll({
      ids: params.itens,
    });
    return this.comboRepository.create({
      combo: new ComboEntity({
        ativo: params.ativo,
        nome: params.nome,
        valor: params.valor,
        itens,
      }),
    });
  }
}
